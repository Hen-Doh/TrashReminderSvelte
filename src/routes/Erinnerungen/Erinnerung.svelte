

<script lang=ts>
  import { pb } from '$lib/pb';
  import { error } from '@sveltejs/kit';
  import type { RecordModel } from 'pocketbase';
    import { trashTypes } from '$lib/muelltypen';

  let {id} = $props()
  let erinnerung:RecordModel
  let tempErinnerung = $state({
    typ:trashTypes.Bio,
    done:false,
    dueDate:""
  })
  async function getErinnerung() {
    console.log("gettinge id in Erinnerung"+id)
    try{
      erinnerung = await pb.collection("Erinnerung").getOne(id)
    }catch (err){
      console.error("Coundnt fetch Erinnerung with id: "+id+"  ",err)
    }
  }
  let bool = $state(false)
$effect(() => {
  (async ()=>{
    tempErinnerung
    bool = true
    // whenever tempErinnerung changes, this runs
    console.debug("Updating Erinnerung:", $state.snapshot(tempErinnerung))
    await pb.collection("Erinnerung").update(id, tempErinnerung)
  })()
});

</script>


<div>tempErinnerung {tempErinnerung.done}</div>
<div>{bool}</div>
<div class="card w-96 bg-base-100 card-xs shadow-sm">
  <div class="card-body">
    <h2 class="card-title">{tempErinnerung.typ}</h2>
    <p>Am {tempErinnerung.dueDate} rausbringen</p>
    <div class="justify-end card-actions">
        <input
        type="checkbox" bind:checked={tempErinnerung.done} class="toggle border-indigo-600 bg-indigo-500 checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800"
        />
    </div>
  </div>
</div>
