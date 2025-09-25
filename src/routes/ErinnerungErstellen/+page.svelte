<script>
        import { json } from '@sveltejs/kit';
    import PocketBase from 'pocketbase';
    import { onMount } from 'svelte';
    
    const pb = new PocketBase('http://127.0.0.1:8090');
    let erinnerungen:Recordmodel[]=$state([])
    async function checkIfUserHasReminder(){
        let erinnerung = await pb.collection("Erinnerungen").getFullList()

        if(erinnerung){

        }
    }
    async function createReminder(){
            // example create data
        const data = {
            "Pickup": "2022-01-01 10:00:00.123Z",
            "Typ": "Bio",
            "Reminder": "2022-01-01 10:00:00.123Z"
        };

        record = await pb.collection('Erinnerung').create(data);
        //console.log(JSON.stringify(record, null, 2)); // Pretty-printed JSON output

    }
    onMount(()=>{

    })
</script>

<button onclick={createReminder}>recordkeeping</button>
<h2>{record}</h2>