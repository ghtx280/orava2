<script>
  import { link } from "svelte-navigator";
  document.title = 'ORAVA • 404'
</script>

<div flex="center" class="over" p="20">
  <h1>404</h1>
  <h2 text>Вибачте, але такої сторінки немає</h2>
  <a href="/" use:link >на головну</a>
</div>

<style>
  h1{font-size: 48px;}
  a{ font-size: 18px;}
</style>