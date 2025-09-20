<script lang="ts">
	import favicon from '$lib/assets/Müllicon.jpg';
	import '../app.css';
	import { pb } from '$lib/pb';
	import Navbar from "./Navbar.svelte"
	let { children } = $props()
	let loggedIn = $state(false)
	const returnUser=()=>{
		if(pb.authStore.isValid){
			loggedIn = true
			return "ID: "+pb.authStore.record?.id
		} else {
			loggedIn = false
			return "Nicht eingeloggt"
		}
	}
</script>

<svelte:head>
	<link rel="icon" href={favicon}/>
	<title>Müllerinnerung</title>
</svelte:head>

<Navbar loggedIn={loggedIn}/>
<a href="/ErinnerungErstellen" >erstellen</a>

<!-- conten of children page goes here-->
{@render children()}
<input type="text">{returnUser()}<input>
<!--TODO div class="testtailwind">
  <button class="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl">Responsive</button>
  <h1 class="text-4xl font-bold text-blue-600">Tailwind CSS Test inside +layout</h1>
</div-->
<footer>Impressum</footer>