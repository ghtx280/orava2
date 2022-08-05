<script>
  import { getDatabase, ref, set, increment} from "firebase/database"
  import { orange } from "../js/orange";
  import Like from "./like.svelte";
  import Img  from "./img.svelte";
  import { Link, navigate } from "svelte-navigator";



  const db = getDatabase();

  export let key, replyLikes, replyText, replyUser, replyLikedUsers={}, userName, curComm, curPost
  let repLike
  let spam = 0

  if(replyLikedUsers[userName]) repLike = true

  function changeLike(){

    let path3 = ref(db, "/posts/"+curPost+'/postComms/'+curComm+'/replies/'+key+'/replyLikedUsers/'+userName)
    let path4 = ref(db, "/posts/"+curPost+'/postComms/'+curComm+'/replies/'+key+'/replyLikes')

    if (spam < 5) {
      if (repLike){
        set(path3, null)
        set(path4, increment(-1))
        repLike = false; replyLikes-- 
      }
      else{
        set(path3, Date.now())
        set(path4, increment(1))
        repLike = true; replyLikes++
      }
      spam++ 
    }else {alert('не спам'); spam = 0}
  }
  
</script>


  <div class="comment" flex="jc-sb g10">
    <div flex="g10">
      <Link to="/u/{replyUser}">
        <Img src={replyUser} size={30}/>
      </Link>
      <div flex="col g5">
        <h6 m>{replyUser}, <span>{orange.time('date(ua) hm', key)}</span></h6>
        <h5 style="user-select:text">{replyText}</h5>
      </div>
    </div>
    {#if userName}
      <div flex="col ai-c g5" on:click={changeLike}>
        <div><Like col={repLike ? 'red' : 'white'}/></div>
        <h5>{replyLikes}</h5>
      </div>
    {:else}
      <div flex="col ai-c g5">
        <div><Like col={'orange'}/></div>
        <h5>{replyLikes}</h5>
      </div>
    {/if}
  </div>


<style>
  .comment{
    margin-bottom: 20px;
  }
  .comment span{
    font-size: 10px;
    color: #888;
  }

</style>