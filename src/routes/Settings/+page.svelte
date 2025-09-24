<script lang=ts>
    import { goto } from '$app/navigation';
    import { pb } from '$lib/pb';
    import { trashTypes } from '$lib/muelltypen';
	import { error } from '@sveltejs/kit';
	import type { RecordModel } from 'pocketbase';
	import { onMount } from 'svelte';
    let loggedIn = $state(pb.authStore.isValid)
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
        benachrichtigungsart: "Email",
        user:pb.authStore.record?.id
    } satisfies {
        adresse: string;
        müllTypen: string[];
        zeitVorlauf: number;
        benachrichtigungsart: string;
        user:string|undefined;
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
        if(!loggedIn){goto("/")}
        getSettings().then(()=>{
                if(settings.length === 0){
                    createSetting()
                }
            })
        for(const option of settings){
            console.debug(option)
        }
    })
   
    //----relevante Mülltypen auswählen-------
    let trashOptions = Object.values(trashTypes);
    let selectedTrash: string[] = $state(["Bio"]);
    function toggleOption(option: string) {
        if (selectedTrash.includes(option)) {
            selectedTrash = selectedTrash.filter(o => o !== option);
        } else {
            selectedTrash = [...selectedTrash, option];
        }
    }
    function removeOption(option: string) {
        selectedTrash = selectedTrash.filter(o => o !== option);
    }
    //
</script>
<!--
<Adresse

-->
<!--Mülltypen auswahl-->
<div class="max-w-xl mx-auto bg-white rounded-2xl shadow p-6 space-y-4">
    <h2 class="text-lg font-semibold text-gray-800">Relevante Müll Typen</h2>

    <!-- Ausgewählte Chips -->
    <div class="flex flex-wrap gap-2">
        {#each selectedTrash as option}
            <div class="flex items-center bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm">
                <span>{option}</span>
                <button
                    class="ml-2 text-indigo-500 hover:text-indigo-700"
                    onclick={() => removeOption(option)}
                >
                    ✕
                </button>
            </div>
        {/each}
    </div>

    <!-- Auswahlmöglichkeiten -->
    <div class="flex flex-wrap gap-2">
        {#each trashOptions as option}
            <button
                type="button"
                onclick={() => toggleOption(option)}
                class="px-3 py-1 rounded-full border text-sm 
                       transition 
                       {selectedTrash.includes(option) 
                         ? 'bg-indigo-600 text-white border-indigo-600' 
                         : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'}"
            >
                {option}
            </button>
        {/each}
    </div>
</div>

<!--Benachrichtigungsart TODO mehr benachrichtigungsarten-->
<div class="max-w-xl mx-auto bg-white rounded-2xl shadow p-6 space-y-4">
    <h2 class="text-lg font-semibold text-gray-800">Benachrichtigungsart (gerade gibt es nur eine)</h2>
    <select class="select">
        <option>Email</option>
    </select>
</div>


