<script lang=ts>
    import { goto } from '$app/navigation';
    import { pb } from '$lib/pb';
	import { error } from '@sveltejs/kit';
	import type { RecordModel } from 'pocketbase';
	import { onMount } from 'svelte';
    let settings:RecordModel[] = $state([])
    //if(!pb.authStore.isValid){goto("/auth/login")}
    async function getSettings(){
        //nur die Settings des aktuellen users, filter via Pocketbase Regeln
        try{
            settings = await pb.collection('Settings').getFullList()
            return settings
        }catch(err){
            console.log("das will ich lesen...")
            $inspect(settings).with(console.trace)

        }
    }
    async function createDefaultSetting(){
    const data = {
            "Erinnerungs_Vorlauf": 123,
            "Relevante_Typen": [
                "Bio"
            ],
            "Benachrichtigungsart": "Email",
            "user": pb.authStore.record?.id
        };
        try {
            await pb.collection('Settings').create(data);
        } catch (err) {
            console.error("Failed to create record", err,data);
        }
    }
    onMount(()=>{
        getSettings().then(()=>console.log(settings)).then(()=>{
                if(settings.length === 0){
                    createDefaultSetting()
                    getSettings().then(()=>console.log("created Settings"))
                    
                }
            })
    })
</script>

<div>{settings}</div>