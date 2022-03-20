<script lang="ts">
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';
  import { onMount } from 'svelte';
  import Fa from 'svelte-fa';

  export let height: number = 60;
  export let width: number = 60;
  export let stroke: number = 1.9;
  export let progress: number = 0;
  export let progressColor: string = "#3FA554"
  export let innerColor: string = "black";
  export let icon = null;
  export let rotate: {degree: number, x: number, y: number} = null
  export let leftOffSetIcon: number = 0;

  const progressTween = tweened(progress, {
		duration: 600,
		easing: cubicOut
	});

  $: {
    progressTween.set(progress)
  }

  let bolt;
  let pathLength;

  onMount(() => {
    pathLength = bolt.getTotalLength();
  });

  $: strokeDashoffset = pathLength - $progressTween / 100 * pathLength;

</script>

<div class="flex mx-[-7px]">
  <svg version="1.1" width={width} height={height} viewBox="0 0 16 16" transform="scale(-1,1)">
    <path d="M8.384 1.226a.463.463 0 0 0-.768 0l-4.56 6.468a.537.537 0 0 0 0 .612l4.56 6.469a.463.463 0 0 0 .768 0l4.56-6.469a.537.537 0 0 0 0-.612l-4.56-6.468z"
    stroke="{progressColor}"
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
      class="stroke-cap-round stroke-join-round"
      stroke="{progressColor}"
      stroke-width={stroke}
      fill="transparent"
      stroke-dasharray={pathLength +' ' + pathLength}
      stroke-dashoffset={strokeDashoffset}
      transform="rotate({rotate?.degree} {rotate?.x} {rotate?.y})"
    />
    <Fa icon={icon} scale={0.35} flip={"horizontal"} translateX={leftOffSetIcon} style="color:white"/>
  </svg>
</div>