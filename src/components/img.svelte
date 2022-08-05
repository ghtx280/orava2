<script>
  export let src, size, edit, link
    link=a=>`https://firebasestorage.googleapis.com/v0/b/test-f886d.appspot.com/o/profileImg%2F${a}?alt=media`
</script>
<div  style="height:{size}px; width:{size}px">
  <svg 
   viewBox="0 0 152 152" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="152" height="152" rx="76" fill="#999999"/>
    <circle cx="76" cy="49" r="20" stroke="white" stroke-width="10"/>
    <path d="M63.25 83.5H88.75C105.18 83.5 118.5 96.8195 118.5 113.25C118.5 117.806 114.806 121.5 110.25 121.5H41.75C37.1937 121.5 33.5 117.806 33.5 113.25C33.5 96.8195 46.8195 83.5 63.25 83.5Z" stroke="white" stroke-width="5" stroke-linecap="round"/>
  </svg>
  <!-- <img src={edit?src:link(src)}  on:error={e=>ok=1} style:opacity={ok?0:1} alt> -->
  <div class="img" style:background-image="url({edit?src:link(src)})"/>
</div>

<style>
  div{ position: relative }
  .img, svg{
    position: absolute;
    border-radius: 50%;
    height: 100%;
    width: 100%;
    background-size:contain 
  }
</style>