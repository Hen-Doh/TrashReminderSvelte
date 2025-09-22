<script lang=ts>
    import { goto } from '$app/navigation';
    import { pb } from '$lib/pb';
    import { trashTypes } from '$lib/muelltypen';
	import { error } from '@sveltejs/kit';
	import type { RecordModel } from 'pocketbase';
	import { onMount } from 'svelte';
    
    let tempSettings = {
        adresse: "Musterstraße 1",
        müllTypen: [
            trashTypes.Bio,
            trashTypes.Papier,
            trashTypes.Plastik,
            trashTypes.Rest,
            trashTypes.Eigene,
            trashTypes.Grünschnitt,
        ],
        zeitVorlauf: 12,
        benachrichtigungsart: "Email"
    } satisfies {
        adresse: string;
        müllTypen: string[];
        zeitVorlauf: number;
        benachrichtigungsart: string;
    };

    
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
    async function createSetting(){
        const data = {
            "Erinnerungs_Vorlauf": tempSettings.zeitVorlauf,
            "Relevante_Typen": tempSettings.müllTypen,
            "Benachrichtigungsart": tempSettings.benachrichtigungsart,
            "user": pb.authStore.record?.id,
            "adresse": tempSettings.adresse
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
                    createSetting()
                }
            })
    })
</script>
<!--
<Zeitpunkt
<Adresse
<Müllarten
<Benachrichtigungsart

-->
<div>{settings}</div>