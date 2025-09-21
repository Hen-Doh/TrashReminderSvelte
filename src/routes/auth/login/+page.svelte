
<script lang=ts>
	import type { AuthProviderInfo } from "pocketbase";
  import { pb } from '$lib/pb';
	import { onMount } from "svelte";
  let providers:AuthProviderInfo[] = []
  const loadProviders = async () => {
    const methods = await pb.collection('users').listAuthMethods();
    providers = methods.oauth2.providers;
  };
  const loginWith = (provider:AuthProviderInfo) => {
    sessionStorage.setItem('gitlab_verifier', provider.codeVerifier);
    window.location.href = provider.authURL+ 'http://localhost:5173/auth/callback ';
  };
  //Ändern falls es mehr authentifizierungsmethoden geben soll
  onMount(()=>{
  loadProviders().then(()=>loginWith(providers[0]));
  })
</script>

