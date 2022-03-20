<script lang="ts">
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';
  import { onMount } from 'svelte';
  import Fa from 'svelte-fa';

  export let height: number = 50;
  export let width: number = 50;
  export let stroke: number = 3;
  export let progress: number = 10;
  export let progressColor: string = "#3FA554";
  export let innerColor: string = "black";
  export let icon = null;
  export let rotate: {degree: number, x: number, y: number} = null;
  export let translate: {x: number, y:number} = null;
  export let leftOffSetIcon: number = 0;

  const progressTween = tweened(progress, {
		duration: 600,
		easing: cubicOut
	});

  $: {
    progressTween.set(progress)
  }

  let triangle;
  let pathLength;

  onMount(() => {
    pathLength = triangle.getTotalLength();
  });

  $: strokeDashoffset = pathLength - $progressTween / 100 * pathLength;

</script>

<div class="flex ml-1">
  <svg width={width} height={height} viewBox="0 0 24 24" transform="scale(-1,1)">
    <g transform="rotate({rotate?.degree} {rotate?.x} {rotate?.y}) translate({translate?.x} {translate?.y})">
      <path bind:this={triangle} d="M21.87,19.29l-9-15.58a1,1,0,0,0-1.74,0l-9,15.58a1,1,0,0,0,0,1,1,1,0,0,0,.87.5H21a1,1,0,0,0,.87-.9"
        class="stroke-cap-round stroke-join-round"
        stroke="{progressColor}"
        opacity="0.4"
        fill="{innerColor}"
        stroke-width={stroke}
        stroke-dasharray={pathLength +' ' + pathLength}
        stroke-dashoffset={0}
      />
      <svg viewBox="3 -3 18 29">
        <path bind:this={triangle} d="M21.87,19.29l-9-15.58a1,1,0,0,0-1.74,0l-9,15.58a1,1,0,0,0,0,1,1,1,0,0,0,.87.5H21a1,1,0,0,0,.87-.9"
          fill="{innerColor}"
          stroke="transparent"
          stroke-width={stroke}
          stroke-dasharray={pathLength +' ' + pathLength}
          stroke-dashoffset={0}
        />
      </svg>
      <path bind:this={triangle} d="M21.87,19.29l-9-15.58a1,1,0,0,0-1.74,0l-9,15.58a1,1,0,0,0,0,1,1,1,0,0,0,.87.5H21a1,1,0,0,0,.87-.9"
        class="stroke-cap-round stroke-join-round"
        stroke="{progressColor}"
        fill="transparent"
        stroke-width={stroke}
        stroke-dasharray={pathLength +' ' + pathLength}
        stroke-dashoffset={strokeDashoffset}
        transform="rotate(-120, {12}, {14.5})"
      />
    </g>
    <Fa icon={icon} scale={0.35} translateY={0.10} translateX={leftOffSetIcon} flip={"horizontal"} style="color:white"/>
  </svg>
</div>
