<script lang=ts>
    import { error, json } from '@sveltejs/kit';
    import { pb } from '$lib/pb';
    import type { RecordModel } from 'pocketbase';
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
	import Erinnerung from "./Erinnerung.svelte"
    
    //TODO Typing
    let erinnerungenList=$state()
    async function getErinnerungen(){
        try{
            let erinnerungen:RecordModel[] = await pb.collection("Erinnerungen").getFullList()
            console.debug("fetched erinnerungen with length: " + erinnerungen.length)
            if(erinnerungen.length==0){
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
                    console.debug("trying to create Erinnerung collection")
                    await pb.collection("Erinnerungen").create(emptyErinnerungen)
                }catch (err){
                    console.error("failed fetching WGID"+err)
                }
            }else{
                erinnerungenList = erinnerungen[0]["Erinnerungen"]
                console.debug("ErinnerungenList: ",$state.snapshot(erinnerungenList[0]))
            }//TODO deal with multiple Lists
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
    async function getSettings(){
        try{
            settings = await pb.collection('Settings').getFullList()
            console.debug("fetched settings at /Erinnerung")
        }catch(err){
            console.error("cant fetch settings at /Erinnerung... "+err)
            $inspect(settings).with(console.trace)
        }
    }
    function abfuhrkalenderImportieren(){
       

    }
    let ready:boolean = $state(false)
    onMount(()=>{
        if(!pb.authStore.isValid){
            console.debug("invalid authstore in Erinnerungen sending to login")
            goto("/auth/login")
        }
        
        getSettings().then(()=>{
            if(settings.length ==0){
                console.debug("Settings: "+settings)
                goto("/Settings")
            }
         })
        getErinnerungen().then(()=>{ready=true})
        
    })
</script>

<button onclick={abfuhrkalenderImportieren} class="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl">Abfuhrkalender importieren</button>

<div class="max-w-xl mx-auto bg-white rounded-2xl shadow p-6 space-y-4">
    {#if ready}
        {#if erinnerungenList.length===0}
            <button onclick={abfuhrkalenderImportieren} class="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl">Abfuhrkalender importieren</button>
        {/if}
        {#each erinnerungenList as id }
            <Erinnerung id={id}></Erinnerung>
        {/each}
    {:else}
        <span class="loading loading-dots loading-md"></span>
    {/if}
</div>

    