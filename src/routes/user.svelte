<script>
  import { getDatabase, get, ref, query, equalTo, orderByChild } from "firebase/database";
  import { getAuth, signOut } from "firebase/auth"
  import linkifyStr from 'linkify-string'
  import 'linkify-plugin-mention';
  import Post    from "../components/post.svelte";
  import Loading from "../components/loading.svelte";
  import Sadface from "../components/sadface.svelte";
  import Modal   from "../components/modal.svelte";
  import Snack   from "../components/snack.svelte";
  import Img     from "../components/img.svelte";

  import { Link, link, navigate } from "svelte-navigator";
  

  const db = getDatabase();
  const auth = getAuth()
  
  const options = {
    defaultProtocol: 'https', formatHref: { mention: val => `/u${val}`}, attributes:{
      onclick: "e=>e.preventDefault()" 
      
    }
  } 

  export let params, authUser;
  let userPosts, user, error, userMenu, snackStatus
  let userName = authUser.displayName;
  document.title = 'ORAVA • '+params.name


  $: get(ref(db, "users/public/" + params.name)).then(e => {
    user = e.val();

    if (user) get(query(ref(db, "posts"), orderByChild("postUser"), equalTo(params.name))).then(e =>  userPosts = e.val())
    else error = true
  });

  function copyUserLink() {
    navigator.clipboard.writeText(`${location.origin}/#/u/${params.name}`)
    userMenu = false
    snackStatus = 'success'
  }

  function shareUser(){
    navigator.share({
      title: 'orava',
      text: 'Перегляньте профіль користувача '+params.name,
      url: location.href
    })
    userMenu = false
  }

  // snack = true
</script>

<Snack bind:snackStatus snackText="Посилання скопійовано" />


<main>
<Modal bind:show={userMenu}>
  <a color='white' href="#/edit"><p>Редагувати профіль</p></a>
  <p color="white" pointer on:click={copyUserLink}>Копіювати</p>
  <p color="white" pointer on:click={shareUser}>Поділитися</p>
  <a color='white' href="#/settings"><p>Налаштування</p></a>
  <p color="red" pointer on:click={()=> signOut(auth).then(()=> location.reload())}>Вийти з аккаунту</p>
</Modal>



  {#if user}
    <div class="wrapper">
      <div flex="jc-sb">
        <h1>Профіль</h1>
        {#if params.name == userName}
          <h1 on:click={()=> {userMenu = true} } pointer class="points" > ••• </h1>
        {/if}
      </div>

      <div flex="row ai-c g10" id="prop">
        <Img src={params.name} size=68 />
        <div flex="col jc-sb g5">
          <h3 m=0>{user.userName}</h3>
          <h3 m=0>Вік: {user.userAge || "Невідомо"}</h3>
          <h3 m=0>
            Стать: {
              user.userGen == "male" ? "Чоловік" : 
              user.userGen == "female" ? "Жінка" : 
              "Невідомо"
            }
          </h3>
        </div>
      </div>
      <h4>Про мене:</h4>
      <h3>{@html linkifyStr(user.userBio, options) ||'Тут поки пусто'}</h3>
      <h4>Дописи</h4>
      <div flex="col-rev">
        {#if userPosts}
          {#each Object.entries(userPosts) as [key, post] (key)}
            <Post {...post} {key} {userName}/>
          {/each}
        {:else}
          <div flex="center">
            <h4 class="noposts" text>дописів немає</h4>
          </div>
        {/if}
      </div>
    </div>
  {:else if error}
    <div class="sto" flex="center g20">
      <Sadface/>
      <h1 text="center">
        такого користувача не існує <br /> або він був видалений
      </h1>
      <a style="font-size: 18px;" href="#/">на головну</a>
    </div>
  {:else}
    <Loading/>
  {/if}
</main>


<style>
  #prop { margin-bottom: 20px }

  
</style>
