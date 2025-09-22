<!--TODOS:
TODO Try Catch stuff z.B. um authstore stuff
TODO beautify
TODO Settings
TODO Erinnerungen
TODO Hono?
TODO Fuktionalitäten richtung Server verschieben(zb default Settings)
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
</script>

<svelte:head>
	<link rel="icon" href={favicon}/>
	<title>Müllerinnerung</title>
</svelte:head>

<Navbar loggedIn={loggedIn}/>
<!-- conten of children page goes here-->
{@render children()}
<footer class="footer sm:footer-horizontal bg-neutral text-neutral-content p-10">
  <div>Impressum</div>
</footer>