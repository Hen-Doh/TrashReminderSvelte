<script lang="ts">
	import favicon from '$lib/assets/Müllicon.jpg';
	import '../app.css';
	import type { Cookies } from '@sveltejs/kit';
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
<a href="/ErinnerungErstellen" >erstellen</a>

<!-- conten of children page goes here-->
{@render children()}
<input type="text">{loggedIn}<input>
<div>
	{pb.authStore.loadFromCookie(cookies.get('pb_auth') || '')}
</div>

<footer>Impressum</footer>