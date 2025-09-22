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

<Navbar loggedIn={loggedIn}/>

<!-- conten of children page goes here-->
{@render children()}

<footer>Impressum</footer>