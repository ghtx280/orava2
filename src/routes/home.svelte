<script>
  import { getDatabase, get, ref, query, limitToLast} from "firebase/database";
  import Post    from "../components/post.svelte";
  import Loading from "../components/loading.svelte";
    
  export let authUser, posts
  // let posts, show, loading, main
  let userName = authUser.displayName
  let num = 50


  // function scrollPost() {
  //   let bottom = Math.floor((this.scrollHeight - this.clientHeight) - this.scrollTop)
  //   if (bottom <= 1 && !loading) {
  //     loading = true
  //     get(query(ref(getDatabase(), 'posts'), limitToLast(num += 50))).then(e => {
  //       posts = e.val()
  //       loading = false
  //     })
  //   }
  // }

  if (!localStorage.dblClickToOpenPost) {
    setTimeout(() => {
      alert('натисни 2 рази на пост щоб відкрити його')
      localStorage.dblClickToOpenPost = true
    }, 3000);	
  }

</script>

<!-- <main on:scroll={scrollPost} bind:this={main}> -->


<main>
  <!-- {#await get(query(ref(getDatabase(), 'posts'), limitToLast(num)))}
    <Loading />
  {:then e} -->
    <h1 m=20 c=red>Головна</h1>
    <div class=wrapper>
      {#each Object.entries(posts).reverse() as [key, item] (key)}
        <Post {...item} {key} {userName}/>
      {/each}
      <!-- {#if loading}
        <Loading reload={0}/>
      {/if} -->
    </div>
  <!-- {/await} -->
</main>
    


<style>
  .wrapper{ padding-top: 0; }
  h1{ align-self: start; } 
</style>
    
    