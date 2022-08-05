<script>
  import { slide } from 'svelte/transition';
  import { expoInOut } from 'svelte/easing';
  import Close from "./close.svelte";
  export let show

</script>

{#if show}
  <div modal >
    <div class="closeBlock">
      <Close/>
    </div>
    <div class="menu" transition:slide|local={{duration: 300, easing:expoInOut, intro: true}} flex="jc-c">
      <div class="content" flex="col g20" p=20>
        <slot></slot>
      </div>
    </div>
    <div close on:click={()=>show=0}></div>
  </div>
{/if}




<style>

  .content{width: 100%;}



  /* .openModal{
    

    
  } */
  /* .closeModal{
    animation: closeModal .3s ease-in-out ;
    animation-direction: normal;
  } */

  /* @keyframes openModal {
    from { transform:translateY(100%) }
    to   { transform:translateY(0)    }
  } */
  
  /* @keyframes closeModal {
    from { transform:translateY(0)     }
    to   { transform:translateY(100%)  }
  } */

  /* @keyframes modal {
    from { transform: scale(0) }
    to   { transform: scale(1) }
  } */


  @media screen and (min-width: 900px) {
    .closeBlock,.content{ margin-left: 160px }
    .content{ width: 70vh }
  }

</style>








