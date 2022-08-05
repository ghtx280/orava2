<script>
  import { slide } from "svelte/transition";

  export let snackStatus, snackText
  $:if (snackStatus) setTimeout(() => snackStatus = false , 2000)

</script>

{#if snackStatus}
  <div
  style:color={snackStatus=='error'?'white':snackStatus=='warn'?'black':'white'}
  style:background={snackStatus=='error'?'#cc3300':snackStatus=='warn'?'#ffcc00':'#444'}
  transition:slide={{duration:100}}
  > {snackText} </div>
{/if}

<style>
  div{
    color: rgb(220, 199, 4);
    text-align: center;
    position: absolute;
    background: #444;
    padding: 10px 0;
    width: calc(100% - 20px);
    margin: 10px;
    border-radius: 5px;
    z-index: 99999;
    top: 50px;
    left: 0;
  }
</style>