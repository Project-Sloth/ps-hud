<script lang="ts">
  import { onMount } from 'svelte';
  import Fa from 'svelte-fa';

  export let height: number = 60;
  export let width: number = 60;
  export let stroke: number = 1.5;
  export let progress: number = 2;
  export let progressColor: string = "stroke-red-500";
  export let innerColor: string = "black";
  export let icon = null;

  let octagon;
  let pathLength;

  onMount(() => {
    try {
      pathLength = octagon.getTotalLength();
    }catch(err) {
    }
  });
</script>

<div class="flex ml-1">
  <svg width={width} height={height} viewBox="0 0 16 16" version="1.1">
    <polygon bind:this={octagon} points="5.25 1.75,10.75 1.75,14.25 5.25,14.25 10.75,10.75 14.25,5.25 14.25,1.75 10.75,1.75 5.25"
      class="{progressColor} stroke-cap-round stroke-join-round"
      fill="transparent"
      stroke-width={stroke}
      stroke-dasharray={pathLength +' ' + pathLength}
      stroke-dashoffset={pathLength - progress / 100 * pathLength}
    />
  </svg>
</div>