

<script lang=ts>
  import { pb } from '$lib/pb';
  import { error } from '@sveltejs/kit';
  import type { RecordModel } from 'pocketbase';
    import { trashTypes } from '$lib/muelltypen';
    import { onMount } from 'svelte';

  let {id} = $props()
  let erinnerung:RecordModel
  let buffering = $state(true)
  let tempErinnerung = $state({
    Typ:trashTypes.Bio,
    Rausgebracht:false,
    Pickup:"",
    Reminder:"",
    Liste:""
  })
  async function getErinnerung() {
    console.log("gettinge id in Erinnerung"+id)
    try{
      erinnerung = await pb.collection("Erinnerung").getOne(id)
      buffering=false
      console.log(erinnerung.Typ)
    }catch (err){
      console.error("Coundnt get Erinnerung with id: "+id+"  ",err)
    }
  }
  onMount(()=>{
    getErinnerung().then(()=>{
      try{
        tempErinnerung = {
          Typ:erinnerung.Typ,
          Rausgebracht:erinnerung.Rausgebracht,
          Pickup:erinnerung.Pickup,
          Reminder:erinnerung.Reminder,
          Liste:erinnerung.Liste
        }
      } catch (err){
        console.error(err)
      }
    })
  })
  //TODO debounce? aber das kann auch verwirrend sein
  $effect(() => {
    (async ()=>{
      // whenever tempErinnerung changes, this runs
      console.debug("Updating Erinnerung:", $state.snapshot(tempErinnerung))
      await pb.collection("Erinnerung").update(id, tempErinnerung)
      console.debug("done updating Erinnerung")
    })()
  });

</script>

{#if buffering}
    <span class="loading loading-dots loading-md"></span>
{:else}
  <!--TODO sieht noch nicht gut aus vorallem das Datum-->
  <div class="card w-96 bg-base-100 card-xs shadow-sm">
    <div class="card-body">
      <h2 class="card-title">{tempErinnerung.Typ}</h2>
      <p>Am {tempErinnerung.Pickup} rausbringen</p>
      <div class="justify-end card-actions">
          <input
            type="checkbox" bind:checked={tempErinnerung.Rausgebracht} 
            class="toggle border-indigo-600 bg-indigo-500 checked:border-green-500 checked:bg-orange-400 checked:text-orange-800"
          />
      </div>
    </div>
  </div>
{/if}

