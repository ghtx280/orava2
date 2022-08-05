<script>
  document.title = 'ORAVA • EDIT'
  import { getStorage, ref as sRef, uploadString  } from "firebase/storage";
  import { getDatabase, get, ref, set } from "firebase/database";
  import Loading from "../components/loading.svelte";
  import { orange } from "../js/orange";
  import Img from "../components/img.svelte";
  import { Link, navigate } from "svelte-navigator";

  const db = getDatabase();
  const st = getStorage();

  export let authUser
  let userName = authUser.displayName
  let name, age, bio, gen, data, uImg, file, isImgChange, loading

  if (!userName) navigate("/login")

  get(ref(db, "users/public/" + userName)).then(e => {
    data   = e.val();
    name   = data.userName;
    age    = data.userAge;
    gen    = data.userGen;
    bio    = data.userBio;
  })


  function changeImg(){
    if (this.files[0].size > 5242880) {
      alert("Вибери файл меньше 5мб")
      isImgChange = false
    } else {
      uImg = URL.createObjectURL(this.files[0])
      isImgChange = true
    }
  }

  function updData() {
    loading = true
    if (isImgChange) {
      orange.ava(file, 150, 'webp', 0.75).then(newAva => {
        uploadString(sRef(st, "/profileImg/" + userName), newAva, 'data_url').then(() => setNewData())
      })
    } else setNewData()
  }

  function setNewData() {
    data.userName = name;
    data.userAge  = age;
    data.userGen  = gen;
    data.userBio  = bio;
    set(ref(db, "users/public/" + userName), data).then(() =>  {location.hash = "#/u/" + userName; location.reload()} )
  }


</script>

{#if loading}
  <div class="over">
    <Loading reload=false/>
  </div>
{/if}

<main>
  {#if data}
    <div class="wrapper">
      <div flex="center">
        <input type="file" id="selectFileImg" accept="image/*" style="display: none;" on:change={changeImg} bind:files={file} />
        <label for="selectFileImg">
          <Img src={uImg || userName} size=100 edit={isImgChange} />
          <h4>змінити пікчу</h4>
        </label>
      </div>
      <div flex="row g10">
        <div style="flex:3;">
          <h6>ім'я</h6>
          <input type="text" bind:value={name} on:input={()=>{name.length>30?name=name.slice(0,30):name=name}} />
        </div>
        <div style="flex: 1;">
          <h6>вік</h6>
          <input type="number" min="0" max="150" bind:value={age} on:input={()=>{age>150?age=150:age=age}} />
        </div>
      </div>
      <div>
        <h6>стать</h6>
        <select bind:value={gen}>
          <option value="male">Чоловік</option>
          <option value="female">Жінка</option>
        </select>
      </div>
      <div>
        <h6>про мене</h6>
        <textarea rows="7" bind:value={bio} on:input={()=>{bio.length>500?bio=bio.slice(0,500):bio=bio}} />
      </div>
      <button color="orange" on:click={updData}>змінити</button>
    </div>
  {:else}
    <Loading reload={0}/>
  {/if}

</main>

<style>
  option {
    color: black;
  }
</style>
