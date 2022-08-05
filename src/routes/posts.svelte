<script>
  document.title = 'ORAVA • POST'
  import { getDatabase, get, ref, set, increment} from "firebase/database";
  import Post    from "../components/post.svelte";
  import Loading from "../components/loading.svelte";
  import Sadface from "../components/sadface.svelte";
  import Comment from "../components/comment.svelte";
  import Snack   from "../components/snack.svelte";

  const db = getDatabase()

  export let params, authUser;
  let show, post, text, snack, snackText, curComm
  let key = params.id
  let curPost = params.id
  let userName = authUser.displayName

  $:get(ref(db, 'posts/' + key)).then(e => { post  = e.val(); show  = true })

  function addComm(){
    if (userName) {
      if (text) {
        if (localStorage.lcm < Date.now()) {
          curComm = Date.now()
          set(ref(db, 'posts/'+curPost+'/postComms/'+curComm), {
            commUser: userName,
            commText: text,
            commLikes: 0
          }).then(() => {
            set(ref(db, 'posts/'+curPost+'/postCountComms'), increment(1))
            snack = true
            snackText = 'Коментар додано'
            post.postComms[curComm] = {
              commUser: userName,
              commText: text,
              commLikedUsers:{},
              commLikes:0
            }
            text = ''
            localStorage.lcm = Date.now() + 10000
          })
        } else alert('1 коментар раз у 10 сек')
      } else alert('Коментар не може бути пустим')
    }  else {
      let test = confirm('Щоб додати коментар, тобі потрібен аккаунт.\nСтворити або увійти?')
      if(test)location.hash = '/login'
    }
  }
</script>

<main>
  <Snack bind:show={snack} title={snackText} />
  
  {#if show}
    {#if post}
      <div flex="col" class="wrapper">
        <Post {...post} {key} {userName} open={1}/>
        <h3>коментарі</h3>
        <div class="comms">
          {#each Object.entries(post.postComms || {}).sort(([a,b],[x,y]) => y.commLikes - b.commLikes) as [key, item] (key)}
            <Comment {...item} {key} {userName} {curPost}/>
          {:else}
            <div flex="center">
              <h6>коментарів немає</h6>
            </div>
          {/each}
          <div class="inpBar" flex="ai-c g10">
            <input class="comInp" type="text" m=0 placeholder="комментар" bind:value={text}>
            <svg on:click={addComm} width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M13.5962 0.108321C7.29261 0.668068 1.90091 5.30905 0.4239 11.4465C-1.5199 19.5239 3.40642 27.6504 11.4101 29.5694C20.4446 31.7355 29.1388 25.4879 29.9446 16.2509C30.5844 8.91652 25.6171 2.09397 18.4319 0.438155C17.5733 0.240386 15.2453 -0.0362735 14.7769 0.0039341C14.6868 0.0116705 14.1555 0.0586339 13.5962 0.108321ZM15.8249 6.62359C16.3248 6.99418 20.7776 11.4679 21.0391 11.8621C21.386 12.3853 21.2127 13.22 20.6823 13.5797C20.4413 13.7432 20.0848 13.7775 18.2975 13.8092L16.1961 13.8465V18.4238V23.0012L15.8249 23.3716C15.5206 23.6753 15.3711 23.7421 14.9952 23.7421C14.6194 23.7421 14.4698 23.6753 14.1656 23.3716L13.7944 23.0012V18.4238V13.8465L11.693 13.8092C9.90571 13.7775 9.54917 13.7432 9.30813 13.5797C8.77781 13.22 8.60445 12.3853 8.95138 11.8621C9.21283 11.4679 13.6657 6.99418 14.1656 6.62359C14.4553 6.40882 14.7204 6.30792 14.9952 6.30792C15.2701 6.30792 15.5352 6.40882 15.8249 6.62359Z" fill="white"/>
            </svg>          
          </div>
        </div>
      </div>
    {:else}
      <div class="over" flex="center g20">
        <Sadface/>
        <h1 m text>Такий пост не існує або був видалений</h1>
        <a  m href="#/">на головну</a>
      </div>
    {/if}  
  {:else}
    <Loading/>
  {/if}
</main>

<style>
  .comms{
    border: 1px solid #888;
    border-radius: 10px;
    padding: 20px 10px 0 10px;
  }
  h6{
    margin-bottom: 20px;
  }
  .comInp{
    height: 30px;
  }
  .inpBar{
    margin-bottom: 20px;
  }
</style>