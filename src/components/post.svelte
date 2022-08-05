<script>
  import { getDatabase, get, ref, set, increment} from "firebase/database";

  import Video    from "./video.svelte";
  import Like     from "./like.svelte";
  import Comment  from "./comment.svelte";
  import Modal    from "./modal.svelte";
  import Snack    from "./snack.svelte";
  import Img      from "./img.svelte";
  
  import { orange } from "../js/orange";
  import linkifyStr from 'linkify-string'
  import 'linkify-plugin-mention';

  import { Link, navigate, link } from "svelte-navigator";

  const db = getDatabase();

  const options = {
    defaultProtocol: 'https',
    rel: 'nofollow noreferrer noopener',
    formatHref: { mention: (val) => `#/u/${val.substr(1)}`}
  }

  export let postUser, postTopic, postImage, postVideo, postText, postLikedUsers = {}, postLikes,postCountComms, postComms = {}, open, userName, key
  let name, like, text, curComm, isPostEdit, snackStatus, snackText, postDiv, txt
  let curPost = key
  let temaArr = ['Немає','Інше','Ігри','Музика','Арт','Фільми','Серіали','Мультики','Аніме','Школа','Дом.тварини','Кулінарія','Подожорі','Спорт','Політика','Наука','Транспорт','Програмування']
  let spam  = 0
  let reply = false
  let openCommsMenu, openPostMenu
  $: txt = 'Відповідь '+reply.commUser

  get(ref(db, 'users/public/'+postUser+'/userName')).then(e => name = e.val())

  if (postLikedUsers[userName]) like = true


  async function postExists() {
    let test = await get(ref(db, "/posts/"+curPost))
    
    if(test.exists()) return true
    else {alert('цей пост був видалений'); return false }
  }

  async function changeLike(){
    let path  = ref(db, "/posts/"+curPost+'/postLikedUsers/'+userName)
    let path2 = ref(db, "/posts/"+curPost+'/postLikes')
    if (spam < 5) {
      if (like && userName){
        if (await postExists()) {
          set(path,  null)
          set(path2, increment(-1))
        }
        like = false; postLikes--
      }else{
        if (await postExists()) {
          set(path,  Date.now())
          set(path2, increment(1))
        }
        like = true; postLikes++
      }
      spam++ 
    }
    else {alert('не спам'); spam = 0}
      
  }

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
            snackStatus = 'success'
            snackText = 'Коментар додано'
            postComms[curComm] = {
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
      if(confirm('Щоб додати коментар, тобі потрібен аккаунт.\nСтворити або увійти?'))
        navigate('/login')
    }
  }

  function onEdit() {
    isPostEdit = true
    openPostMenu = false
  }

  function updPost() {
    set(ref(db, 'posts/'+curPost+'/postText'), postText)
    isPostEdit = false
  }

  async function deletePost() {
    let del = confirm('Дійсно видалити пост?')
    if(del){
      await set(ref(db, 'posts/'+curPost), null)
      document.querySelector('.post').remove()
      snackStatus = 'success'
      snackText = 'Допис був видалений'
      openPostMenu=false
      if (open) location.reload()
    }
  }

  function copyPostLink() {
    navigator.clipboard.writeText(location.origin+'/p/'+curPost)
    openPostMenu = false
    snackStatus = 'success'
    snackText = 'Посилання скопійовано'
  }

  function sharePost(){
    navigator.share({
      title: 'orava',
      text: 'Перегляньте допис користувача '+ postUser,
      url: location.origin+'/p/'+curPost
    })
    openPostMenu = false
  }

  function addReply() {
    if (userName) {
      if (text) {
        if (localStorage.lcm < Date.now()) {
          curComm = Date.now()
          set(ref(db, 'posts/'+curPost+'/postComms/'+reply.key+'/replies/'+curComm), {
            replyUser: userName,
            replyText: text,
            replyLikes: 0
          }).then(() => {
            snackStatus = 'success'
            snackText = 'Відповідь додано'

            postComms[reply.key] = {
              ...postComms[reply.key], replies: {
                [Date.now()]: {
                  replyUser: userName,
                  replyText: text,
                  replyLikedUsers:{},
                  replyLikes:0
            } } }

            text = ''
            reply = false
            localStorage.lcm = Date.now() + 10000
          })
        } else alert('1 коментар раз у 10 сек')
      } else alert('Коментар не може бути пустим')
    }  else {
      if(confirm('Щоб додати коментар, тобі потрібен аккаунт.\nСтворити або увійти?'))
        navigate('/login')
    }
  }
</script>



<Snack bind:snackStatus {snackText} />

<Modal bind:show={openPostMenu}>
  {#if !open}
    <a href="/p/{curPost}" use:link> <p color="white"> Відкрити </p></a>
  {/if}
  {#if userName == postUser}
    <p color="white" pointer on:click={onEdit}> Редагувати </p>
  {/if}
  <p color="white" pointer on:click={sharePost}> Поділитися  </p>
  <p color="white" pointer on:click={copyPostLink}> Копіювати  </p>
  <a color="red" href="mailto:antkor.yt.s@gmail.com"> Поскаржитися </a>
  {#if userName == postUser}
    <p color="red" pointer on:click={deletePost}> Видалити </p>
  {/if}
</Modal>

<div class="post" flex="col" bind:this={postDiv}>
    <div flex="ai-c jc-sb">
      <div flex="ai-c g10">
        <Link to="/u/{postUser}">
          <Img src={postUser} size={35}/>
        </Link>
        <h3>{ name }, Тема: { temaArr[postTopic] }</h3>
      </div>
      <h1 on:click={()=> openPostMenu = true } pointer class="points" > ••• </h1>
    </div> 
    
    {#if postImage}
      {#if open}
          <img class="postImage" src={postImage} alt="postimg">
      {:else}
        <div on:dblclick={()=>navigate("/p/"+key)}>
          <img class="postImage" style:max-height={'70vw'} src={postImage} alt="postimg">
        </div>
      {/if}
    {/if}
    {#if postVideo}
      {#if open} <Video src={postVideo} full={1}/>
      {:else}
        <div on:dblclick={()=>navigate("/p/"+key)}>
          <Video src={postVideo}/>
        </div>
      {/if}
    {/if}
    {#if isPostEdit}
      <div flex="ai-c">
        <input m type="text" bind:value={postText}>
        <h3 m p="10" pointer on:click={updPost}>OK</h3>
      </div>
    {:else}
      <h5 class="postBody">{@html linkifyStr(postText, options) }</h5>
    {/if}
    <div flex="jc-sb ai-c">
        <div flex="ai-c g20">
          <div flex="ai-c g5">
            {#if userName} <div on:click={changeLike}> <Like col={like?'red':'white'}/> </div>
            {:else} <Like col={'orange'}/> {/if}
            <h5 id="likeCount">{postLikes}</h5>
          </div>
          {#if !open}
            <div flex="ai-c g5" on:click={async ()=> { await postExists() ? openCommsMenu = true : openCommsMenu = false}}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M1.63438 0.020368C0.708978 0.112431 0.129292 0.583173 0.0175117 1.3333C0.00226057 1.4357 -0.0026394 3.37401 0.00130099 7.75556L0.00693595 14.0311L0.0612439 14.2334C0.117308 14.4423 0.234682 14.7073 0.347075 14.8789C0.454241 15.0425 0.751363 15.3261 0.931947 15.4372C1.11649 15.5507 1.42592 15.6678 1.63005 15.7014C1.71661 15.7156 2.65555 15.7233 4.33099 15.7234C6.59453 15.7235 6.9179 15.7196 7.05659 15.6903C7.44879 15.6073 7.64561 15.3978 7.6687 15.0386C7.68983 14.7095 7.53632 14.4357 7.24571 14.284C7.01958 14.166 7.07315 14.1684 4.70273 14.168C2.36739 14.1675 2.27519 14.1639 2.01225 14.0626C1.79885 13.9804 1.65602 13.8079 1.57256 13.5317C1.54218 13.4311 1.53873 12.9362 1.53317 7.90754C1.52764 2.90049 1.53009 2.38158 1.55986 2.26267C1.64848 1.90861 1.83858 1.73378 2.23327 1.64333C2.38703 1.6081 2.79932 1.60612 9.99061 1.60612C16.9734 1.60612 17.599 1.60892 17.7521 1.64088C18.1734 1.72878 18.3352 1.88654 18.4275 2.2994C18.4575 2.43368 18.4601 2.94008 18.4556 7.8817C18.4524 11.3613 18.4433 13.3617 18.4303 13.4425C18.3464 13.9635 18.1608 14.1147 17.5397 14.1677C17.1718 14.1991 10.8068 14.1956 10.6398 14.1639C10.472 14.132 10.316 14.1626 10.1147 14.2666C9.99232 14.3299 9.92013 14.394 9.64353 14.6851C9.46386 14.8742 8.55269 15.8025 7.6187 16.748C6.68471 17.6935 5.88736 18.512 5.84681 18.5667C5.46784 19.0788 5.56331 19.7081 6.05598 19.9454C6.15817 19.9947 6.19689 20.0014 6.36668 19.9998C6.58356 19.9977 6.73995 19.9499 6.95275 19.8206C7.06288 19.7537 7.75425 19.0618 10.4009 16.37L11.0366 15.7235H14.6606C18.6349 15.7235 18.4687 15.7285 18.7931 15.5988C19.1108 15.4718 19.4006 15.2446 19.6087 14.9596C19.7276 14.7967 19.8675 14.4985 19.9259 14.2834C19.9711 14.1171 19.9717 14.0944 19.9857 12.2546C20.0048 9.73155 20.0047 3.36776 19.9855 2.39451C19.9679 1.49852 19.9579 1.43123 19.7919 1.08053C19.5233 0.513311 19.0393 0.137007 18.4398 0.0293451C18.2854 0.00163586 17.267 -0.00183305 10.0339 0.000668769C5.50723 0.00224555 1.72744 0.0111176 1.63438 0.020368ZM18.3052 1.61123C18.2182 1.61518 18.0758 1.61518 17.9888 1.61123C17.9017 1.6073 17.973 1.60406 18.147 1.60406C18.3211 1.60406 18.3923 1.6073 18.3052 1.61123ZM5.55373 6.7279C5.12337 6.80161 4.72268 7.20135 4.63326 7.64621C4.50949 8.26185 4.88809 8.87421 5.48865 9.02974C5.67699 9.07854 5.98303 9.06126 6.16549 8.99154C6.58473 8.83136 6.87725 8.42865 6.91057 7.96579C6.95218 7.38752 6.55665 6.86009 5.98838 6.73614C5.83148 6.70191 5.7179 6.69977 5.55373 6.7279ZM9.75729 6.73566C9.30465 6.84145 8.95945 7.19702 8.86474 7.65504C8.77358 8.0958 8.95488 8.57472 9.31098 8.8338C9.5126 8.9805 9.68708 9.04269 9.92948 9.0543C10.2896 9.07154 10.5608 8.96587 10.8075 8.71218C11.2445 8.2628 11.257 7.55802 10.8362 7.09476C10.7688 7.02059 10.6682 6.92987 10.6127 6.89319C10.3784 6.73835 10.0246 6.67317 9.75729 6.73566ZM13.982 6.73578C13.5672 6.83222 13.2338 7.15466 13.1123 7.57686C13.0285 7.86818 13.0831 8.2486 13.2459 8.50812C13.4674 8.861 13.8201 9.05903 14.227 9.05903C14.5514 9.05903 14.8006 8.95231 15.0355 8.71277C15.396 8.34523 15.4752 7.80328 15.2367 7.33592C15.0036 6.87927 14.4676 6.62288 13.982 6.73578Z" fill="white"/>
              </svg>
              <h5>{postCountComms}</h5>
            </div>
          {/if}
          
        </div>
        <h6 m>{orange.time('date(ua) hm', key)}</h6>
    </div>
</div>  

<Modal bind:show={openCommsMenu}>
    <div class="comms">
      {#each Object.entries(postComms).sort(([a,b],[x,y]) => y.commLikes - b.commLikes) as [key, item] (key)}
        <Comment bind:reply {...item} {key} {userName} {curPost}/>
      {:else}
        <div flex="center">
          <h6 m="20">коментарів немає</h6>
        </div>
      {/each}
    </div>
    <div flex="ai-c g10">
      {#if !reply}
        <input class="comInp" type="text" m=0 placeholder="комментар" bind:value={text}>
        <svg on:click={addComm} width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M13.5962 0.108321C7.29261 0.668068 1.90091 5.30905 0.4239 11.4465C-1.5199 19.5239 3.40642 27.6504 11.4101 29.5694C20.4446 31.7355 29.1388 25.4879 29.9446 16.2509C30.5844 8.91652 25.6171 2.09397 18.4319 0.438155C17.5733 0.240386 15.2453 -0.0362735 14.7769 0.0039341C14.6868 0.0116705 14.1555 0.0586339 13.5962 0.108321ZM15.8249 6.62359C16.3248 6.99418 20.7776 11.4679 21.0391 11.8621C21.386 12.3853 21.2127 13.22 20.6823 13.5797C20.4413 13.7432 20.0848 13.7775 18.2975 13.8092L16.1961 13.8465V18.4238V23.0012L15.8249 23.3716C15.5206 23.6753 15.3711 23.7421 14.9952 23.7421C14.6194 23.7421 14.4698 23.6753 14.1656 23.3716L13.7944 23.0012V18.4238V13.8465L11.693 13.8092C9.90571 13.7775 9.54917 13.7432 9.30813 13.5797C8.77781 13.22 8.60445 12.3853 8.95138 11.8621C9.21283 11.4679 13.6657 6.99418 14.1656 6.62359C14.4553 6.40882 14.7204 6.30792 14.9952 6.30792C15.2701 6.30792 15.5352 6.40882 15.8249 6.62359Z" fill="white"/>
        </svg>  
      {:else}
        <h1 m on:click={()=>{reply=false;text=''}} style='font-size:22px;'>✖</h1>
        <input class="comInp" type="text" m=0 placeholder={txt} bind:value={text}>
        <svg on:click={addReply} width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M13.5962 0.108321C7.29261 0.668068 1.90091 5.30905 0.4239 11.4465C-1.5199 19.5239 3.40642 27.6504 11.4101 29.5694C20.4446 31.7355 29.1388 25.4879 29.9446 16.2509C30.5844 8.91652 25.6171 2.09397 18.4319 0.438155C17.5733 0.240386 15.2453 -0.0362735 14.7769 0.0039341C14.6868 0.0116705 14.1555 0.0586339 13.5962 0.108321ZM15.8249 6.62359C16.3248 6.99418 20.7776 11.4679 21.0391 11.8621C21.386 12.3853 21.2127 13.22 20.6823 13.5797C20.4413 13.7432 20.0848 13.7775 18.2975 13.8092L16.1961 13.8465V18.4238V23.0012L15.8249 23.3716C15.5206 23.6753 15.3711 23.7421 14.9952 23.7421C14.6194 23.7421 14.4698 23.6753 14.1656 23.3716L13.7944 23.0012V18.4238V13.8465L11.693 13.8092C9.90571 13.7775 9.54917 13.7432 9.30813 13.5797C8.77781 13.22 8.60445 12.3853 8.95138 11.8621C9.21283 11.4679 13.6657 6.99418 14.1656 6.62359C14.4553 6.40882 14.7204 6.30792 14.9952 6.30792C15.2701 6.30792 15.5352 6.40882 15.8249 6.62359Z" fill="white"/>
        </svg>  
      {/if}     
    </div>
</Modal>



<style>
    h3,h5{color: #fff; margin: 0;}
   .post{
       border: 1px solid #888;
       margin-bottom: 20px;
       padding: 10px;
       border-radius: 10px;
       gap: 15px;
    }
    .postBody{ 
        white-space: pre-line;
        line-height: 1.5;
        user-select: text;
    }
    .postImage{
        border-radius: 5px;
        width: 100%;
    }
    .comms{
      overflow: scroll;
      height: 40vh;
    }
    .comInp{
      height: 30px;
      border: 0;
      background: #333;
    }

    

    @media screen and (min-width: 900px) {
      .postImage{ height: 360px }
    }
</style>