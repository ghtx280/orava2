<script>
  document.title = 'ORAVA • FIND'

  import { Link } from "svelte-navigator";
  import Loading from "../components/loading.svelte";
  import Img     from "../components/img.svelte";

  export let users
</script>

<main>
  <!-- {#if show} -->
    <div class="wrapper">
      <input type="search" class="findUser" placeholder="Пошук..." />
      <hr noshade size="1" color="888888" />
      {#each Object.entries(users) as [key, user] (key)}
        <Link to="/u/{key}">
          <div class="user" flex="row ai-c">
            <Img src={key} size=60/>
            <div flex="col">
              <h3>{user.userName || 'помилка'}</h3>
              <h6>{user.userBio  || 'тут поки пусто'}</h6>
            </div>
          </div>
        </Link>
      {/each}
    </div>
  <!-- {:else} -->
    <!-- <Loading/> -->
  <!-- {/if} -->
</main>

<style>
  h3 {
    color: #fff;
  }
  h3,
  h6 {
    margin: 0;
  }
  h6,h3 {
    width: 200px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .user {
    border: 1px solid #888;
    padding: 10px;
    margin-bottom: 20px;
    gap: 10px;
    border-radius: 10px;
  }
  .user div {
    gap: 5px;
  }
  .findUser {
    border: 1px solid #888;
    background: none;
  }
</style>
