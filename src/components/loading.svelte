<script>
  export let reload = true

  let timer
  if(reload) setInterval(() => timer = true, 5000)
</script>

<div class="sto" flex="center">
  <img src="../public/img/load.gif" alt="loading" height="50px" />
  {#if timer}
    <p color=white>Завантаження триває надто довго?</p>
    <p color=orange on:click={()=>location.reload()} pointer>
      перезавантажити
    </p>
  {/if}
</div>