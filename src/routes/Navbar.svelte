<script>
  import { redirect } from '@sveltejs/kit';
  import '../app.css';
  import { goto } from '$app/navigation';
  let {loggedIn} = $props()
  function logIn(){
    console.log("not redirecting")
    goto('/auth/login');
  }
</script>
<div class="navbar bg-base-100 shadow-sm">
  <div class="navbar-start">
    <div class="dropdown">
      <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" /> </svg>
      </div>
      <ul
        tabindex="0"
        class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li><a href="/">Start</a></li>
        <li><a href="/Settings">Settings</a></li>
        <li><a href="/ErinnerungErstellen">Erinnerung Erstellen</a></li>
      </ul>
    </div>
  </div>
  <div class="navbar-center">
    <!--TODO abholungen statt homepage-->
    <a class="btn btn-ghost text-xl" href="/">Home</a>
  </div>

  <div class="navbar-end">
    {#if loggedIn}
      <div class="avatar avatar-placeholder">
        <div class="bg-neutral text-neutral-content w-24 rounded-full">
          <span class="text-3xl">Name</span>
        </div>
      </div>
    {:else}
      <button class="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl" onclick={logIn}>Einloggen</button>
    {/if}
    <div>{loggedIn}</div>
  </div>
</div>