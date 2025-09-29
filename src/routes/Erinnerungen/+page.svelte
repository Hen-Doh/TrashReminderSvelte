<script lang=ts>
    import { error, json } from '@sveltejs/kit';
    import { pb } from '$lib/pb';
    import type { RecordModel } from 'pocketbase';
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
	import Erinnerung from "./Erinnerung.svelte"
    let {data}=$props();
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
                console.debug("ErinnerungenList: ",$state.snapshot(erinnerungenList))
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
    let settings:RecordModel[]|undefined = $state()
    async function getSettings(){
        try{
            let id:string | undefined = pb.authStore.record?.id
            if(id === undefined){throw new Error(" id not available")}
            settings = await pb.collection('Settings').getFullList()
            if(settings===undefined){goto("/Settings")}
            console.debug("fetched settings at /Erinnerung")
        }catch(err){
            console.error("cant fetch settings at /Erinnerung... "+err)
            goto("/Settings")
        }
    }
    let res:{} = $state({})
    async function abfuhrkalenderImportieren(){
        getSettings().then(async ()=>{
            if(settings===undefined){goto("/Settings")}
            //TODO convert spaces to + in streetnames
            let nr =settings[0].Hausnummer
            let str = settings[0].Strasse
            const response = await fetch('/Erinnerungen?str='+str+"&nr="+nr)
            res = await response.json()
        })
        console.info(res)
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
<div>{res}</div>
<button onclick={abfuhrkalenderImportieren} class="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl">Abfuhrkalender importieren</button>
<div>{data.test}</div>
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

    