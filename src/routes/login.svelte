<script>
  document.title = 'ORAVA • LOGIN'
  import { getDatabase, get, ref, set } from "firebase/database"
  import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, sendPasswordResetEmail  }
  from "firebase/auth"
  import { orange } from "../js/orange"
  import { link, navigate } from "svelte-navigator";

  const db   = getDatabase()
  const auth = getAuth()
  export let authUser
  let login, pass, data, show, page, email

  if (authUser) { history.length > 2 ? history.back() : navigate('/')}
  
  function goLogin() {
    if (email && pass) {
      signInWithEmailAndPassword(auth, email, pass).then(e=>{
        login = e.user.displayName
        show = true
        setTimeout(location.reload(), 1500)
      }).catch(()=>{ alert('Неправильна пошта або пароль') })
    } else alert("Заповніть всі поля щоб продовжити")

  }


  function goRegist() {
    let checkEmail = orange.valid('email', email)
    let checkLogin = orange.valid('login', login)
    let checkPass  = orange.valid('pass' , pass )

    if (checkEmail && checkLogin && checkPass) {
      get(ref(db, 'users/public/' + login)).then(e => {
        data = e.val()
        if (!data){
          createUserWithEmailAndPassword(auth, email, pass).then(CurUser => {
            updateProfile(CurUser.user,{displayName:login}).then(() => {
              signInWithEmailAndPassword(auth, email, pass).then(e=>{
                console.log(e);
                set(ref(db, 'users/public/' + login), { 
                  userName: login, 
                  userBio:"", 
                  userGen: "", 
                  userAge:""
                })
                set(ref(db, 'users/private/' + login),{ userEmail:email, userPass:pass }).then(()=>{
                  show = true
                  setTimeout(() => { navigate("/edit"); location.reload() }, 1500);
                })
              })
            })
          }).catch(() => alert('Користувач з такою поштою вже існує') )
        }
        else alert('Користувач з таким логіном вже існує') 
      })
    }
    else alert(
        `Правила:
          Пошта - приклад (test@gmail.com)
          Логін - маленькі лат. літери, цифри, - , та _
          Пароль - лат. літери, цифри та ! @ # $ % ^ & *`
        )
  }



  function forgot(){
    if (email) {
      sendPasswordResetEmail(auth, email)
      .then(() => alert(`Лист надіслано на вашу електронну пошту\n\nВАЖЛИВО!!! перевірте папку зі спамом`))
      .catch(()=> alert('Введи правильну пошту або спробуйте пізніше'))
    }else alert('Вкажіть пошту на яку прийде лист з відновленням пароля')
    
  }
</script>

<div class="over" flex="center" p="20">
  <div class="wrapper" flex="center">
    {#if !show}
      {#if !page}
        <h1 text>Напиши логін та пароль <br> щоб увійти</h1>
        <input type="email"    placeholder="Пошта"  bind:value={email} autocomplete="email"/>
        <input type="password" placeholder="Пароль" bind:value={pass}  autocomplete="new-password"/>
        <button color="orange" on:click={goLogin} >Увійти</button>
        <p on:click={forgot}>Не пам'ятаю пароль</p>
        <p on:click={()=>{page=true}}>Я ще не маю аккаунту</p>
      {:else}
        <h1 text>Заповніть поля, щоб створити новий профіль</h1>
        <input type="text"     placeholder="Логін"  bind:value={login} />
        <input type="email"    placeholder="Пошта"  bind:value={email}>
        <input type="password" placeholder="Пароль" bind:value={pass}  />
        <button color="orange" on:click={goRegist}>Створити</button>
        <p on:click={()=>{page=false}}>Я вже маю аккаунт</p>
      {/if}
    {:else}
      <h1>Привіт, {login}</h1>
    {/if}
  </div>
</div>

<style>
  p{
    color: orange;
    cursor: pointer;
  }
  .wrapper{
    padding: 0;
  }
</style>
