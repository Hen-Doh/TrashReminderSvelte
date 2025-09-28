import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { trashTypes } from '$lib/muelltypen';

type event = {
    typ:
}
export const GET: RequestHandler = async () => {
    let a = {
        "test":"returned something"
    }
    const formData = new URLSearchParams({
        nr: "1",
        str: "Weender Landstraße",
        year: "2025"
    });
    try{
        console.log("test debug")
        const response = await fetch("https://abfuhr.geb-goettingen.de/forward.php?str=Ackerr%C3%B6te&nr=1&year=2025", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: formData.toString()
        });
        const result = await response.text()
        console.log(response.ok)
        const lines = result.split("\n").slice(5)
        console.log("lines: "+lines.length)
        console.log(lines[0])
        return json(lines,)
    } catch (err) {
        console.error(err);
        return json({ success: false, error: 'Failed to save file' }, { status: 500 });
    }
};