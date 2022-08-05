<script>
  document.title = 'ORAVA • SETTINGS'
  import {EmailAuthProvider, getAuth, signOut, updateEmail, updatePassword, reauthenticateWithCredential  }
  from "firebase/auth"
  import { get, getDatabase, set, ref }
  from "firebase/database";
  import Snack
  from "../components/snack.svelte";
  import Close
  from "../components/close.svelte";
  
  export let authUser 
  let changePass, changeEmail, email, pass, inpCurPass, inpNewPass, snackStatus, snackText, lastUpdPass
  let userName = authUser.displayName

  const db = getDatabase()

 let getData =()=> get(ref(db, 'users/private/'+userName)).then(e=>{
    const data = e.val()
    email = data.userEmail
    pass  = data.userPass
    lastUpdPass = data.lastChangePass||0
    console.log(lastUpdPass);
  })
  getData()

  function newEmail(){
    const credential = EmailAuthProvider.credential( authUser.email, pass )
    reauthenticateWithCredential(authUser, credential).then(() => {
      updateEmail(authUser, email).then(()=>{
        snackStatus = 'success'
        snackText   = 'Пошту змінено'
        set(ref(db, 'users/private/'+userName+'/userEmail'), email)
      }).catch(()=>{
        snackStatus = 'error'
        snackText   = 'Виникли проблеми. спробуй пізнише'
      })
    }).catch(() => {
      snackStatus = 'error'
      snackText   = 'Неправильний пароль'
    })
  }


  async function newPass(){
    await getData()
    if ((lastUpdPass + 3600000) < Date.now()) {
      const credential = EmailAuthProvider.credential( authUser.email, inpCurPass )
      reauthenticateWithCredential(authUser, credential).then(() => {
        updatePassword(authUser, inpNewPass).then(()=>{
          snackStatus = 'success'
          snackText   = 'Пароль змінено'
          set(ref(db, 'users/private/'+userName+'/userPass'), inpNewPass)
          set(ref(db, 'users/private/'+userName+'/lastChangePass'), Date.now())
          console.log(inpNewPass);
        }).catch(()=>{
          snackStatus = 'error'
          snackText   = 'Виникли проблеми. спробуй пізнише'
        })
      }).catch(() => {
        snackStatus = 'error'
        snackText   = 'Неправильний пароль'
      })
    } else alert('Змінювати пароль можна раз в годину')    
  }

  function logOut() {
    signOut(getAuth()).then(()=>{
      location.hash = '/'
      location.reload()
    })
  } 
  
  function deleteAcount() {
    if (confirm('Ви точно хочете видалити аккаунт?\nВідновити його буде неможливо!!!')) {
      if (confirm('Всі ваші дані, пости, переписки та все інше буде видалено назавжди!!!')) {
        prompt('Введіть пароль')
        alert('При видалені деяких даних сталася помилка. Спробуй пізніше')
      }
    }




    // signOut(getAuth()).then(()=>{
    //   location.hash = '/'
    //   location.reload()
    // })
  } 
</script>
<main>
<Snack bind:snackStatus {snackText} />

<div class="over" p=20>
  <h1 class="head">Налаштування</h1>
  <hr noshade size="1" color="4444" >
  <a href="#/edit">
    <h3>Редагувати профіль</h3>
  </a>
  <h3 color=gray>Тема: Темна</h3>
  <h3 pointer on:click={()=>changeEmail=1}>Змінити пошту</h3>
  <h3 pointer on:click={()=>changePass=1} >Змінити пароль</h3>
  <hr noshade size="1" color="4444" >
  <a href="https://t.me/antoshka280">
    <h3>Зв'язатися зі мною</h3>
  </a>
  <a href="#/about">
    <h3>Про додаток</h3>
  </a>
  <hr noshade size="1" color="4444" >
  <h3 pointer color=red on:click={logOut}>Вийти з аккаунта</h3>
  <h3 pointer color=red on:click={deleteAcount}>Видалити аккаунт</h3>  
</div>


{#if changePass}
  <div class="over" flex="col jc-c" p=20>
    <h6 m=10>старий пароль</h6>
    <input type="text" bind:value={inpCurPass}>
    <h6 m=10>новий пароль</h6>
    <input type="text" bind:value={inpNewPass}>
    <button color=orange on:click={newPass}>змінити</button>
    <div style="align-self: center;" on:click={()=>changePass=0}>
      <Close/>
    </div>
  </div>
{/if}


{#if changeEmail}
  <div class="over" flex="col jc-c" p=20>
    
    <h6 m=10>нова електронна пошта</h6>
    <input type="text" bind:value={email}>
    <h6 m=10>поточний пароль</h6>
    <input type="text" bind:value={inpCurPass}>
    <button color=orange on:click={newEmail}>змінити</button>

    <div style="align-self: center;" on:click={()=>changeEmail=0}>
      <Close/>
    </div>
  </div>
{/if}
</main>

<style>
  h3, a{
    margin-bottom: 30px;
  }
</style>