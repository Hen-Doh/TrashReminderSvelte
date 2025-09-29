import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { trashTypes } from '$lib/muelltypen';
const year = "2025"
type event = {
    typ:trashTypes
    date:string
}
function failed(str:string){
    return json({ success: false, error: str }, { status: 500 })
}
function formatEvents(events:string[]){
    let eventList: { typ: trashTypes.Bio | trashTypes.Rest | trashTypes.Plastik | trashTypes.Papier | trashTypes.Grünschnitt; date: string; }[]=[]
    events.forEach(event => {
        console.log("formatEvents start of each loop")
        let arr = event.split("\n")
        let muellart:trashTypes 
        //console.log("arr0"+arr[0])
        //console.log("arr3#"+arr[3].trim()+"#")
        //console.log("arr6#"+arr[6].trim()+"#")
        switch(arr[6].trim()){
            case "SUMMARY:[GEB] Abfuhr des gelben Sacks": muellart = trashTypes.Plastik;
            break;
            case "SUMMARY:[GEB] Abfuhr der Restmülltonne": muellart = trashTypes.Rest
            break;
            case "SUMMARY:[GEB] Abfuhr der Biotonne": muellart = trashTypes.Bio
            break;
            case "SUMMARY:[GEB] Abfuhr der Papiertonne": muellart = trashTypes.Papier
            break;
            case "SUMMARY:[GEB] Baum- und Strauchschnittsammlung": muellart = trashTypes.Grünschnitt
            break;
            default:
                console.log("dis de issue: |",arr[6],"end")
                throw new Error(` "${arr[6]}" wurde nicht als Müllart erkannt`);
        }
        eventList.push({
            typ:muellart,
            date:arr[3]
        })
        //console.log("data: "+muellart+", "+arr[3])
    });
    console.log(eventList)
    return json(eventList,{status: 200})

}
export const GET: RequestHandler = async ({url}) => {
    let adress 
    try{
        adress = {
            nr:url.searchParams.get("nr"),
            str:url.searchParams.get("str")
        }
    } catch (err){
        console.error("failed getting url params")
        return failed("SearchParams waren incorrect oder konnten nicht gelesen werden")
    }
    try{
        console.log("about to fetch Müllabfuhrkalender")
        const response = await fetch("https://abfuhr.geb-goettingen.de/forward.php?str="+adress.str+"&nr="+adress.nr+"&year="+year, {
        //const response = await fetch("https://abfuhr.geb-goettingen.de/forward.php?str=Ackerröte&nr="+adress.nr+"&year="+year, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            //body: formData.toString()
        });
        const result = await response.text()
        console.log(response.ok)
        const events = result.split("BEGIN:VEVENT").slice(5)
        console.log("lines: "+events.length)
        console.log("first event"+events[0])
        console.log("last event"+events[events.length-1])
        return formatEvents(events)
    } catch (err) {
        console.error(err);
        return failed("couldnt get Abfuhrkalender")
    }
};