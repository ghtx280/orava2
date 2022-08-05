<script>
  document.title = 'ORAVA • ADD'
  import { getDatabase, ref, set } from "firebase/database";
  import { getStorage, ref as sRef, uploadBytes, getDownloadURL, uploadString  } from "firebase/storage";
  import Close   from "../components/close.svelte";
  import Loading from "../components/loading.svelte";
  import { orange } from "../js/orange";

  const st = getStorage();
  const db = getDatabase();
  
  export let authUser
  let loading, file, postText
  let postTopic 
  let postUser  = authUser.displayName
  let postImage = ''
  let postVideo = ''
  let postAudio = ''

  if (!authUser) location.hash = '/login'

  function setPost() {
    set(ref(db, "/posts/" + Date.now()), {
      postUser,
      postText,
      postImage,
      postVideo,
      postAudio,
      postTopic:Number(postTopic),
      postlastEdit:Date.now(),
      postLikes:0,
      postCountComms:0
    }).then(()=>{
      location.hash = "/";
      localStorage.npt = Date.now() + 60000
    })
  }
  
  async function addPost() {
    if (localStorage.npt && localStorage.npt < Date.now()) {
      if (postText) {
        if (file) {
          if ('img' == fileValid().type) {
            if (fileValid().size < 5242880) {
              loading = true
              orange.convertImg(file, 90, 'webp', 0.5).then(newImg => {
                uploadString(sRef(st, "/postImg/" + Date.now()), newImg, 'data_url').then((e) => {
                  getDownloadURL(sRef(st, e.metadata.fullPath)).then(url => { postImage = url;  setPost() })
                })
              })
            } else alert(`Картинка має бути меньше 5мб.\n\n\nЦе потрібно щоб ви могли завантажувати більше картинок.\nЯ працюю з безплатною  базою даних в якій є обмеження.\nЯкщо ви хочете підтримати проєкт фінансово зв'яжіться зі мною в телеграмі @antoshka280`)
          }
          if ('vid' == fileValid().type) {
            if (fileValid().size < 5242880) {
              loading = true
              uploadBytes(sRef(st, "/postVid/" + file[0].name), file[0]).then((e) => {
                getDownloadURL(sRef(st, e.metadata.fullPath)).then(url => { postVideo = url; setPost() })
              }) 
            } else alert(`Відео має бути меньше 5мб.\n\n\nЦе потрібно щоб ви могли завантажувати більше відео.\nЯ працюю з безплатною  базою даних в якій є обмеження.\nЯкщо ви хочете підтримати проєкт фінансово зв'яжіться зі мною в телеграмі @antoshka280`)
          }
        } else { loading = true; setPost() }
      } else alert('напишіть щось')
    } else alert(`1 допис раз у хвилину\n\nНаступний: ${orange.time('hms', localStorage.npt)}`)
  }
 
  function fileValid() {
    let ft = file[0].type
    if (ft=='image/jpg'||ft=='image/jpeg'||ft=='image/png'||ft=='image/gif'||ft=='image/tiff')    return {type:'img',size:file[0].size}
    else if (ft=='video/mp4'||ft=='video/mkv'||ft=='video/wmv'||ft=='video/mov'||ft=='video/avi') return {type:'vid',size:file[0].size}
    else return false
  }

</script>

<div class="over" flex="center" p="20">
  {#if loading}
    <Loading reload={0}/>
    <h3 text>зачекайте будь ласка<br>ваш файл завантажується</h3>
  {:else}
    <div class="wrapper" flex="center">
      <h1 text="center">Напиши що небудь цікавенького</h1>
      <textarea rows="7" placeholder="Писати тут, max 1500" bind:value={postText} maxlength="1500"
      on:input={()=>{postText.length>1500?postText=postText.slice(0,1500):postText=postText}}/>
      <div class="add-content" flex="between g20">
        <input type="file" accept="image/*, video/*" id="file" style="display: none;" bind:files={file}>
        <label for="file">
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.3752 4.0625C11.3752 5.13994 10.9472 6.17325 10.1853 6.93512C9.42342 7.69699 8.39011 8.125 7.31267 8.125C6.23523 8.125 5.20191 7.69699 4.44005 6.93512C3.67818 6.17325 3.25017 5.13994 3.25017 4.0625C3.25017 2.98506 3.67818 1.95175 4.44005 1.18988C5.20191 0.428012 6.23523 0 7.31267 0C8.39011 0 9.42342 0.428012 10.1853 1.18988C10.9472 1.95175 11.3752 2.98506 11.3752 4.0625ZM18.2408 10.6486C18.0884 10.5723 17.9159 10.5458 17.7476 10.5729C17.5793 10.6 17.4239 10.6794 17.3032 10.7997L11.2744 18.4535L6.95192 13.949C6.79585 13.8451 6.60866 13.7984 6.42207 13.8167C6.23548 13.8351 6.06098 13.9174 5.92817 14.0497L0.00341797 21.125V24.375C0.00341797 24.806 0.174623 25.2193 0.479369 25.524C0.784116 25.8288 1.19744 26 1.62842 26H24.3784C24.5918 26 24.8031 25.958 25.0003 25.8763C25.1974 25.7946 25.3766 25.6749 25.5275 25.524C25.6784 25.3732 25.7981 25.194 25.8797 24.9969C25.9614 24.7997 26.0034 24.5884 26.0034 24.375V17.0625L18.2408 10.6486Z" fill="#999999"/>
          </svg>        
        </label>
        <label for="file">
          <svg width="22" height="26" viewBox="0 0 22 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21.4001 0H16.2001V1.73333H5.8001V0H0.600098V26H5.8001V24.2667H16.2001V26H21.4001V0ZM4.06676 1.73333V3.46667H2.33343V1.73333H4.06676ZM19.6668 1.73333V3.46667H17.9334V1.73333H19.6668ZM16.2001 3.46667V12.1333H5.8001V3.46667H16.2001ZM4.06676 5.2V6.93333H2.33343V5.2H4.06676ZM19.6668 5.2V6.93333H17.9334V5.2H19.6668ZM4.06676 8.66667V10.4H2.33343V8.66667H4.06676ZM19.6668 8.66667V10.4H17.9334V8.66667H19.6668ZM4.06676 12.1333V13.8667H2.33343V12.1333H4.06676ZM19.6668 12.1333V13.8667H17.9334V12.1333H19.6668ZM16.2001 13.8667V22.5333H5.8001V13.8667H16.2001ZM4.06676 15.6V17.3333H2.33343V15.6H4.06676ZM19.6668 15.6V17.3333H17.9334V15.6H19.6668ZM4.06676 19.0667V20.8H2.33343V19.0667H4.06676ZM19.6668 19.0667V20.8H17.9334V19.0667H19.6668ZM4.06676 22.5333V24.2667H2.33343V22.5333H4.06676ZM19.6668 22.5333V24.2667H17.9334V22.5333H19.6668Z" fill="#999999"/>
          </svg>
        </label>
      </div>
      <select id="tematica" bind:value={postTopic}>
        <option value=0>Вибери тематику...</option>
        <option value=2>Ігри</option>
        <option value=3>Музика</option>
        <option value=4>Арт</option>
        <option value=5>Фільми</option>
        <option value=6>Серіали</option>
        <option value=7>Мультики</option>
        <option value=8>Аніме</option>
        <option value=9>Школа</option>
        <option value=10>Дом.тварини</option>
        <option value=11>Кулінарія</option>
        <option value=12>Подожорі</option>
        <option value=13>Спорт</option>
        <option value=14>Політика</option>
        <option value=15>Наука</option>
        <option value=16>Транспорт</option>
        <option value=17>Програмування</option>
        <option value=1>Інше</option>
      </select>
      <button color="orange" on:click={addPost}>зробити допис</button>
      <div on:click={()=> history.back() }><Close/></div>
    </div> 
  {/if}
</div>

<style>
  .add-content{
    width: 100%;
    margin-bottom: 20px;
  }
  .add-content label{
    
    width: 100%;
    border: 1px solid white;
    border-radius: 10px;
    padding: 7px 0;
    text-align: center;
  }
  .wrapper{
    padding: 0;
  }
</style>