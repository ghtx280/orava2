<script>
	export let src, full;
	let paused = true;
  let duration, currentTime
  let time = 0
	
  function playVid(){
    paused = !paused

    let int = setInterval(() => {
      time = 100 / (duration / currentTime)
      if (currentTime > duration || paused) clearInterval(int)
    }, 100);
  }
</script>

<div class="vid">
	{#if paused}
		<div class="ppb">
			<svg width="27" height="32" viewBox="0 0 27 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M25.5 13.4019C27.5 14.5566 27.5 17.4434 25.5 18.5981L4.5 30.7224C2.5 31.8771 -1.50515e-06 30.4338 -1.4042e-06 28.1244L-3.44255e-07 3.87564C-2.43308e-07 1.56624 2.5 0.122865 4.5 1.27757L25.5 13.4019Z" fill="white"/>
      </svg>  
		</div>
	{/if}
  <div class="dur" style:width="{time}%"/>
  <video style:height={full ? "100%":""} on:click={playVid} bind:paused bind:duration bind:currentTime>
    <source {src}>
    <track kind="captions">
  </video>
</div>

<style>
  .vid{
    position: relative;
    left: 0;
    top: 0;
  }

  .ppb{
    position:absolute;
    left: 0;top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;height: 100%;
		pointer-events: none;
  }
  .dur{
    position: absolute;
    background: white;
    height: 3px;
    width: 0%;
    bottom: 3px;
    left: 0;
    z-index: 1;
  }
  video{
    width: 100%;
    height: 360px;
  }
  @media screen and (min-width: 900px) {
    video{
      height: 360px;
    }
  }
</style>