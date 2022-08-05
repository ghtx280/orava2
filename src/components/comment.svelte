<script>
  import { getDatabase, ref, set, increment} from "firebase/database"
  import { orange } from "../js/orange";
  import Like  from "./like.svelte";
  import Reply from "./reply.svelte";
  import Img   from "./img.svelte";

  import { Link } from "svelte-navigator";



  const db = getDatabase();

  export let commUser, commText, commLikedUsers={}, commLikes, key, userName, curPost, reply, replies={}
  let like, repLike, replyOpen
  let spam = 0
  let curComm = key
  

  if(commLikedUsers[userName]) like = true

  function changeLike(a, b){

    let path  = ref(db, "/posts/"+curPost+'/postComms/'+curComm+'/commLikedUsers/'+userName)
    let path2 = ref(db, "/posts/"+curPost+'/postComms/'+curComm+'/commLikes')
    let path3 = ref(db, "/posts/"+curPost+'/postComms/'+curComm+'/replies/'+b+'/replyLikedUsers/'+userName)
    let path4 = ref(db, "/posts/"+curPost+'/postComms/'+curComm+'/replies/'+b+'/replyLikes')

    if (a == 'reply') {
      if (spam < 5) {
        if (repLike){
          set(path3, null)
          set(path4, increment(-1))
          repLike = false; repLikes-- 
        }
        else{
          set(path3, Date.now())
          set(path4, increment(1))
          repLike = true; repLikes++
        }
        spam++ 
      }else {alert('не спам'); spam = 0}
    } else {
      if (spam < 5) {
        if (like){
          set(path,  null)
          set(path2, increment(-1))
          like = false; commLikes-- 
        }
        else{
          set(path,  Date.now())
          set(path2, increment(1))
          like = true; commLikes++
        }
        spam++ 
      }else {alert('не спам'); spam = 0}
    }
    
  }



</script>

<div class="comment" flex="jc-sb g10">
  <div flex="g10">
    <Link to="/u/{commUser}">
      <Img src={commUser} size=30/>
    </Link>
    <div flex="col g5">
      <h6 m>{commUser}, <span>{orange.time('date(ua) hm', key)}</span></h6>
      <h5 style="user-select:text">{commText}</h5>
      <div flex="g10">
        <h6 on:click={e=>reply={commUser,key}} pointer>Відповісти</h6>
        <h6 on:click={e=>replyOpen=!replyOpen} pointer>{replyOpen?'Сховати':'Показати('+Object.keys(replies).length+')'}</h6>
      </div>
    </div>
  </div>
  {#if userName}
    <div flex="col ai-c g5" on:click={()=>changeLike('comm')}>
      <div><Like col={like ? 'red' : 'white'}/></div>
      <h5>{commLikes}</h5>
    </div>
  {:else}
    <div flex="col ai-c g5">
      <div><Like col={'orange'}/></div>
      <h5>{commLikes}</h5>
    </div>
  {/if}
</div>


{#if replyOpen}
  {#each Object.entries(replies) as [key, item] (key)}
    <div class="reply">
      <Reply {...item} {key} {userName} {curComm} {curPost}/>
    </div>
  {:else}
    <div flex="center">
      <h6 m="20">відповідей немає</h6>
    </div>
  {/each}
{/if}


<style>
  .comment{
    margin-bottom: 20px;
  }
  .comment span{
    font-size: 10px;
    color: #888;
  }
  .reply{
    margin-left: 40px;
  }
</style>