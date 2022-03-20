<script lang="ts">
  import { onMount } from 'svelte';
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';
  import Fa from 'svelte-fa';

  export let height: number = 60;
  export let width: number = 60;
  export let stroke: number = 5;
  export let progress: number = 5;
  export let progressColor: string = "#3FA554";
  export let innerColor: string = "black";
  export let icon = null;

  const progressTween = tweened(progress, {
		duration: 600,
		easing: cubicOut
	});

  $: {
    progressTween.set(progress)
  }

  let star;
  let pathLength;

  onMount(() => {
    pathLength = star.getTotalLength();
  });

  $: strokeDashoffset = pathLength - $progressTween / 100 * pathLength;

</script>

<svg
  width={width}
  height={height}
  viewBox="0 0 38 40"
  transform="scale(-1,1)"
>
  <path d="M36.042,13.909c-0.123-0.377-0.456-0.646-0.85-0.688l-11.549-1.172L18.96,1.43c-0.16-0.36-0.519-0.596-0.915-0.596
    s-0.755,0.234-0.915,0.598L12.446,12.05L0.899,13.221c-0.394,0.04-0.728,0.312-0.85,0.688c-0.123,0.377-0.011,0.791,0.285,1.055
    l8.652,7.738L6.533,34.045c-0.083,0.387,0.069,0.787,0.39,1.02c0.175,0.127,0.381,0.191,0.588,0.191
    c0.173,0,0.347-0.045,0.503-0.137l10.032-5.84l10.03,5.84c0.342,0.197,0.77,0.178,1.091-0.059c0.32-0.229,0.474-0.633,0.391-1.02
    l-2.453-11.344l8.653-7.737C36.052,14.699,36.165,14.285,36.042,13.909z"
    stroke="{progressColor}"
    opacity="0.4"
    fill="{innerColor}"
    stroke-width={stroke-0.6}
    stroke-dasharray={pathLength +' ' + pathLength}
    stroke-dashoffset={0}
    transform="rotate(-72, {20}, {20})"
  />
  <svg viewBox="-5 1 48 36">
    <path d="M36.042,13.909c-0.123-0.377-0.456-0.646-0.85-0.688l-11.549-1.172L18.96,1.43c-0.16-0.36-0.519-0.596-0.915-0.596
      s-0.755,0.234-0.915,0.598L12.446,12.05L0.899,13.221c-0.394,0.04-0.728,0.312-0.85,0.688c-0.123,0.377-0.011,0.791,0.285,1.055
      l8.652,7.738L6.533,34.045c-0.083,0.387,0.069,0.787,0.39,1.02c0.175,0.127,0.381,0.191,0.588,0.191
      c0.173,0,0.347-0.045,0.503-0.137l10.032-5.84l10.03,5.84c0.342,0.197,0.77,0.178,1.091-0.059c0.32-0.229,0.474-0.633,0.391-1.02
      l-2.453-11.344l8.653-7.737C36.052,14.699,36.165,14.285,36.042,13.909z"
      stroke-width={stroke}
      fill="{innerColor}"
      stroke="transparent"
      stroke-dasharray={pathLength +' ' + pathLength}
      stroke-dashoffset={0}
      transform="rotate(-72, {20}, {20})"
    />
  </svg>
  <path bind:this={star} d="M36.042,13.909c-0.123-0.377-0.456-0.646-0.85-0.688l-11.549-1.172L18.96,1.43c-0.16-0.36-0.519-0.596-0.915-0.596
    s-0.755,0.234-0.915,0.598L12.446,12.05L0.899,13.221c-0.394,0.04-0.728,0.312-0.85,0.688c-0.123,0.377-0.011,0.791,0.285,1.055
    l8.652,7.738L6.533,34.045c-0.083,0.387,0.069,0.787,0.39,1.02c0.175,0.127,0.381,0.191,0.588,0.191
    c0.173,0,0.347-0.045,0.503-0.137l10.032-5.84l10.03,5.84c0.342,0.197,0.77,0.178,1.091-0.059c0.32-0.229,0.474-0.633,0.391-1.02
    l-2.453-11.344l8.653-7.737C36.052,14.699,36.165,14.285,36.042,13.909z"
    class="stroke-cap-round stroke-join-round"
    stroke="{progressColor}"
    stroke-width={stroke}
    fill="transparent"
    stroke-dasharray={pathLength +' ' + pathLength}
    stroke-dashoffset={strokeDashoffset}
    transform="rotate(-72, {20}, {20})"
  />
  <Fa icon={icon} scale={0.32} translateY={0.06} flip={"horizontal"} style="color:white"/>
</svg>