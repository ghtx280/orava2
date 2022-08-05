<script>
  import { backOut } from 'svelte/easing';
  import { link, navigate } from "svelte-navigator";

  // function like() {
  //   return { css: t => `transform:scale(${backOut(t)+0.2})` }
  // }

export let col

function goToLogin(){
  if (col == 'orange') 
    if(confirm('Щоб поставити лайк, тобі потрібен аккаунт.\nСтворити або увійти?'))
    navigate('/login')
}

</script>



{#if !(col=='orange')}
  <div>
    <svg width="22" height="19" viewBox="0 0 22 19" fill="none" xmlns="http://www.w3.org/2000/svg" > 
      <path d="M11 19C-10.1988 6.1863 4.64026 -4.49179 10.9999 1.91508C17.3597 -4.49178 32.1988 6.18631 11 19Z"
      fill="white" />
    </svg>
    {#if col=='red'}
      <svg class="likeActive" width="22" height="19" viewBox="0 0 22 19" fill="none" xmlns="http://www.w3.org/2000/svg" > 
        <path d="M11 19C-10.1988 6.1863 4.64026 -4.49179 10.9999 1.91508C17.3597 -4.49178 32.1988 6.18631 11 19Z"
        fill=red />
      </svg>
    {/if}
  </div>
{:else}
  <div>
    <svg on:click="{goToLogin}" width="22" height="19" viewBox="0 0 22 19" fill="none" xmlns="http://www.w3.org/2000/svg" > 
      <path d="M11 19C-10.1988 6.1863 4.64026 -4.49179 10.9999 1.91508C17.3597 -4.49178 32.1988 6.18631 11 19Z"
      fill=orange />
    </svg>
  </div>
{/if}





<style>
  div{
    position: relative;
    width: 22px; height: 19px;
  }
  svg{
    position: absolute;
    top: 0; left: 0;
  }
  .likeActive{
    animation: like .3s cubic-bezier(0,0,0,3) ;
  }

  @keyframes like {
    from { transform: scale(0) }
    to {   transform: scale(1) }
  }
</style>