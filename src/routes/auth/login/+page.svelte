
<script lang=ts>
	import type { AuthProviderInfo } from "pocketbase";
  import { pb } from '$lib/pb';
	import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  let providers:AuthProviderInfo[] = []
  try{
    if(pb.authStore.isValid){goto("/")}
  }catch (err) {
    console.error("Failed to access authStore while logging in", err);
  }
  const loadProviders = async () => {
    try{
      const methods = await pb.collection('user').listAuthMethods();
      providers = methods.oauth2.providers;
    }catch(err){
      console.error("cant even fetch authProviders...  "+err)
    }
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

