<script lang=ts>
    import { goto } from '$app/navigation';
    import { pb } from '$lib/pb';
    import { trashTypes } from '$lib/muelltypen';
	import { error } from '@sveltejs/kit';
	import { ClientResponseError, type RecordModel } from 'pocketbase';
	import { onMount } from 'svelte';
    let loggedIn = $state(pb.authStore.isValid)
    let tempSettings = {
        Strasse:"Hinter dem Mond",
        Hausnummer:1000,
        Relevante_Typen: [
            trashTypes.Bio,
            trashTypes.Papier,
            trashTypes.Plastik,
            trashTypes.Rest,
            trashTypes.Eigene,
            trashTypes.Grünschnitt,
        ],
        Erinnerungs_Vorlauf: 12,
        Benachrichtigungsart: "Email",
        user:pb.authStore.record?.id
    } satisfies {
        Strasse: string;
        Hausnummer:number;
        Relevante_Typen: string[];
        Erinnerungs_Vorlauf: number;
        Benachrichtigungsart: string;
        user:string|undefined;
    };

    
    let settings:RecordModel[] = $state([])
    if(!pb.authStore.isValid){goto("/auth/login")}
    async function getSettings(){
        //nur die Settings des aktuellen user, filter via Pocketbase Regeln
        try{
            settings = await pb.collection('Settings').getFullList()
            return settings
        }catch(err){
            console.log("das will ich lesen...")
            $inspect(settings).with(console.trace)

        }
    }
    async function createSetting(){
        try {
            await pb.collection('Settings').create(tempSettings);
        } catch (err) {
            if (err instanceof ClientResponseError) {
                console.error("PB create error:", err.response); // <-- shows validation details
            } else {
                console.error("Unknown error:", err);
            }
        }
    }
    async function updateSettings() {
        try{
            //TODO besseres überprüfen ob es valide eingaben sind
            let bn = (document.getElementById("Benachrichtigungsart") as HTMLSelectElement)?.value;
            let str = (document.getElementById("Strasse") as HTMLInputElement)?.value;
            let hn = (document.getElementById("Hausnummer") as HTMLInputElement)?.value;
            let tm = (document.getElementById("Zeitvorlauf") as HTMLInputElement)?.value;
            if(str=""){
                //TODO
            }
            if(isNaN(hn))


        }catch (err){
            console.log(err)
        }
        try {
            await pb.collection('Settings').update(settings[0].id,tempSettings);
        } catch (err) {
            if (err instanceof ClientResponseError) {
                console.error("PB create error:", err.response); // <-- shows validation details
            } else {
                console.error("Unknown error:", err);
            }
        }
    }
    onMount(()=>{
        if(!loggedIn){goto("/")}
        getSettings().then(()=>{
                if(settings.length === 0){
                    createSetting()
                }else if(settings.length === 1){
                    let set = settings[0]
                    //TODO might be spreadable
                    tempSettings.Benachrichtigungsart = set.Benachrichtigungsart;
                    tempSettings.Erinnerungs_Vorlauf = set.Erinnerungs_Vorlauf;
                    tempSettings.Relevante_Typen = set.Relevante_Typen;
                    tempSettings.Strasse = set.Strasse;
                    tempSettings.Hausnummer = set.Hausnummer;
                    tempSettings.user = set.user;
                }else{
                    //TODO handle too many settings
                    throw error(400,"more than two settings for this user")
                }
            })
        for(const option of settings){
            console.debug(option)
        }
    })
    
    //----Mülltypen-------
    let trashOptions = Object.values(trashTypes);
    let selectedTrash: string[] = $state(tempSettings.Relevante_Typen);
    function toggleOption(option: string) {
        if (selectedTrash.includes(option)) {
            selectedTrash = selectedTrash.filter(o => o !== option);
            console.info(tempSettings.Relevante_Typen)
        } else {
            selectedTrash = [...selectedTrash, option];
        }
    }
    function removeOption(option: string) {
        selectedTrash = selectedTrash.filter(o => o !== option);
    }
</script>


<div class="max-w-xl mx-auto bg-white rounded-2xl shadow p-6 space-y-4">
    <!--Mülltypen auswahl-->
    <h2 class="text-lg font-semibold text-gray-800">Relevante Müll Typen</h2>
    <!-- Ausgewählte Mülltypen -->
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
    <!--Benachrichtigungsart-->
    <h2 class="text-lg font-semibold text-gray-800">Benachrichtigungsart (gerade gibt es nur eine)</h2>
    <select id="Benachrichtigungsart" class="select">
        <option>{tempSettings.Benachrichtigungsart}</option>
    </select>
    <!--Zeitvorlauf-->
    <h2 class="text-lg font-semibold text-gray-800">Um wie viel Uhr am Vortag möchtest du erinnert werden?</h2>
    <input id="Zeitvorlauf" type="time" class="input" placeholder="1200"/>
    <!--Adressauswahl TODO via Karte falls Zeit bleibt 
    TODO überprüfen ob die Adresse Valide ist
    -->
    <div>
        <h2 class="text-lg font-semibold text-gray-800">Adresse</h2>
        <h3 class="text-base font-semibold text-gray-800">Straße</h3>
        <input id="Strasse" type="text" placeholder={tempSettings.Strasse} class="input" />
        <h3 class="text-base font-semibold text-gray-800">Hausnummer</h3>
        <input id="Hausnummer" type="text" placeholder={tempSettings.Hausnummer.toString()} class="input" />
        <div></div>
    </div>
    <button class="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl" onclick={updateSettings} >Speichern</button>
</div>

