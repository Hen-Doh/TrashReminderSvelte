import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
     const formData = new URLSearchParams({
            new: "1",
            catchPhrase: "Weender Landstraße",
            number: "12",
            searchButton: "Anzeigen"
        });

        fetch("https://abfuhr.geb-goettingen.de/preview.php", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: formData.toString()
        });
    return new Response();
};