<script>
  export let alert
</script>
{#if alert}
  <h1><slot></slot></h1>
  <button on:click={()=> alert = false }>ok</button>
{/if}
