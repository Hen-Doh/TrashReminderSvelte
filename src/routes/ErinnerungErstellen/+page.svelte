<script lang=ts>
    import { error, json } from '@sveltejs/kit';
    import { pb } from '$lib/pb';
    import type { RecordModel } from 'pocketbase';
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    
    let erinnerungen:RecordModel[]=$state([])
    async function getErinnerungen(){
        try{
            erinnerungen = await pb.collection("Erinnerungen").getFullList()
            console.debug("fetched erinnerungen with length: " + erinnerungen.length)
            if(erinnerungen.length===0){
                try{
                    let id = pb.authStore.record?.id
                    if(id === undefined){
                        throw error(500,("user ID ist undefined"))
                    }
                    let user = await pb.collection("user").getOne(id)
                    console.debug("WGID: "+user.WGID)
                    let emptyErinnerungen = {
                        "Erinnerungen": [],
                        "ErstellerIn": id,
                        "WGID": user.WGID
                    }
                    pb.collection("Erinnerungen").create(emptyErinnerungen)
                }catch (ClientResponseError){
                    console.error("failed fetching WGID"+ClientResponseError)
                }
            }else{
                let erinerungenList = erinnerungen[0]
            }
        }catch(err){
            console.error("failed fetching erinnerungen record "+err)
        }
    }
    async function createReminder(){
            // example create data
        const data = {
            "Pickup": "2022-01-01 10:00:00.123Z",
            "Typ": "Bio",
            "Reminder": "2022-01-01 10:00:00.123Z"
        };

        let record = await pb.collection('Erinnerung').create(data);
        //console.log(JSON.stringify(record, null, 2)); // Pretty-printed JSON output

    }
    let settings:RecordModel[] = $state([])
    onMount(()=>{
        if(!pb.authStore.isValid){goto("/auth/login")}
        async function getSettings(){
        //nur die Settings des aktuellen user, filter via Pocketbase Regeln
            try{
                settings = await pb.collection('Settings').getFullList()
                console.debug("fetched settings")
            }catch(err){
                console.error("cant fetch settings")
                $inspect(settings).with(console.trace)
            }
        }
        if(settings.length ===0){goto("/Settings")}
        getErinnerungen()
    })
</script>
