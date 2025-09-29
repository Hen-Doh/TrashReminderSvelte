<!--TODOS:
TODO actual error page for fatal errors
TODO Name korrekt anzeigen in der Navbar
TODO mehr Try Catch stuff und bessere error meldungen z.B. um authstore stuff
TODO beautify benutzen
TODO Erinnerungen
TODO Hono?
TODO Input validation? oder reicht pb?
TODO Fuktionalitäten richtung Server verschieben(zb default Settings)
TODO Registrierung statt merkwürdige defaults
TODO GAnz englisch oder ganz Deutsch, weniger mixen
TODO 
-->
<script lang="ts">
	import favicon from '$lib/assets/Müllicon.jpg';
	import '../app.css';
	import { pb } from '$lib/pb';
	import Navbar from "./Navbar.svelte"
	let { children } = $props()
	let loggedIn= $state<boolean>(pb.authStore.isValid)
	const returnUser=()=>{
		if(pb.authStore.isValid){
			return "ID: "+pb.authStore.record?.id
		} else {
			return "Nicht eingeloggt"
		}
	}
</script>

<svelte:head>
	<link rel="icon" href={favicon}/>
	<title>Müllerinnerung</title>
</svelte:head>

<div class="min-h-screen flex flex-col">
    <!-- Main content -->
    <main class="flex-grow">
		<!--see /Navbar-->
		<Navbar loggedIn={loggedIn}/>
        {@render children()}
    </main>
    <!-- Footer -->
    <footer class="footer sm:footer-horizontal bg-neutral text-neutral-content p-10">
        <div>Impressum</div>
		<div>{loggedIn}</div>
    </footer>
</div>


<!--
anmeldung/Registrierung
Settings
Email erinnerung
Ansicht mit den kommenden (>= 10) Abholterminen und ihrem jeweiligen Status. 
	Die Termine lassen sich frontendseitig nach Abholart filtern
WG-Feature

-->
