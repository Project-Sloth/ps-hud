<script lang="ts">
  import { onMount } from 'svelte';
  import Fa from 'svelte-fa';

  export let height: number = 76;
  export let width: number = 76;
  export let stroke: number = 1.9;
  export let progress: number = 0;
  export let progressColor: string = "stroke-red-500"
  export let innerColor: string = "black";
  export let icon = null;
  export let rotate: {degree: number, x: number, y: number} = null

  let bolt;
  let pathLength;

  onMount(() => {
    pathLength = bolt.getTotalLength();
  });

</script>

<div class="flex ml-[-9px]">
  <svg version="1.1" width={width} height={height} viewBox="0 0 16 16" transform="scale(-1,1)">
    <path d="M8.384 1.226a.463.463 0 0 0-.768 0l-4.56 6.468a.537.537 0 0 0 0 .612l4.56 6.469a.463.463 0 0 0 .768 0l4.56-6.469a.537.537 0 0 0 0-.612l-4.56-6.468z"
      class="{progressColor}"
      opacity="0.4"
      fill="{innerColor}"
      stroke-width={stroke}
      stroke-dasharray={pathLength +' ' + pathLength}
      stroke-dashoffset={0}
      transform="rotate({rotate?.degree} {rotate?.x} {rotate?.y})"
    />
    <svg viewBox="-1.5 4.5 19 7">
      <path d="M8.384 1.226a.463.463 0 0 0-.768 0l-4.56 6.468a.537.537 0 0 0 0 .612l4.56 6.469a.463.463 0 0 0 .768 0l4.56-6.469a.537.537 0 0 0 0-.612l-4.56-6.468z"
        stroke-width={stroke-0.3}
        fill="{innerColor}"
        stroke="transparent"
        stroke-dasharray={pathLength +' ' + pathLength}
        stroke-dashoffset={0}
        transform="rotate({rotate?.degree} {rotate?.x} {rotate?.y})"
      />
    </svg>
    <path bind:this={bolt} d="M8.384 1.226a.463.463 0 0 0-.768 0l-4.56 6.468a.537.537 0 0 0 0 .612l4.56 6.469a.463.463 0 0 0 .768 0l4.56-6.469a.537.537 0 0 0 0-.612l-4.56-6.468z"
      class="{progressColor} stroke-cap-round stroke-join-round"
      stroke-width={stroke}
      fill="transparent"
      stroke-dasharray={pathLength +' ' + pathLength}
      stroke-dashoffset={pathLength - progress / 100 * pathLength}
      transform="rotate({rotate?.degree} {rotate?.x} {rotate?.y})"
    />
    <Fa icon={icon} scale={0.26} flip={"horizontal"} style="color:white"/>
  </svg>
</div>