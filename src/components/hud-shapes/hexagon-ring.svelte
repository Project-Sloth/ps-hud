<script lang="ts">
  import { onMount } from 'svelte';
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';
  import Fa from 'svelte-fa';

  export let height: number = 50;
  export let width: number = 50;
  export let ringSize: number = 1.8;
  export let progressValue: number = 2;
  export let progressColor: string = "stroke-red-500";
  export let innerColor: string = "black";
  export let rotateDegree: number = 0;
  export let translateX: number = 0;
  export let translateY: number = 0;
  export let icon = null;
  export let iconScaling: number = 0.40;
  export let iconColor: string = "white";
  export let iconTranslateX: number = 0;
  export let iconTranslateY: number = 0;

  const progressTween = tweened(progressValue, {
		duration: 600,
		easing: cubicOut
	});

  $: {
    progressTween.set(progressValue)
  }

  let hexagon;
  let pathLength;

  onMount(() => {
    pathLength = hexagon.getTotalLength();
  });

  $: strokeDashoffset = pathLength - $progressTween / 100 * pathLength;

</script>

  <svg width={width} height={height} viewBox="0 0 15 15" transform="scale(-1,1)">
    <!-- <defs>
      <linearGradient id="gradient-stroke" x1="0%" y1="0%" x2="100%" y2="0%" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="#14d4ff" />
          <stop offset="1" stop-color="#eb0ed8" />
      </linearGradient>
    </defs> -->

    <!-- stroke="black" -->
    <!-- opacity="0.75" -->
    <g 
      transform="
        { rotateDegree > 0 ? "rotate("+rotateDegree+" "+width/4+" "+height/4+")": ""}
        { translateX | translateY ? "translate("+translateX+" "+translateY+")" : ""}"
    >
      <path d="M1.5 4.5V10.5L7.5 14L13.5 10.5V4.5L7.5 1L1.5 4.5Z"
        class="stroke-cap-round"
        stroke="{progressColor}"
        opacity="0.40"
        fill="{innerColor}"
        stroke-width={ringSize}
        stroke-dasharray={pathLength +' ' + pathLength}
        stroke-dashoffset={0}
        transform="rotate(90, {7.5}, {7.5})"
      />
      <svg viewBox={ringSize == 1 ? "0 -0.75 15 16.5" :"0 -1.5 15 18"}>
        <path d="M1.5 4.5V10.5L7.5 14L13.5 10.5V4.5L7.5 1L1.5 4.5Z"
          fill="{innerColor}"
          stroke="transparent"
          stroke-width={ringSize}
          stroke-dasharray={pathLength +' ' + pathLength}
          stroke-dashoffset={0}
          transform="rotate(90, {7.5}, {7.5})"
        />
      </svg>

      <!-- stroke="url(#gradient-stroke)" -->
      <path bind:this={hexagon} d="M1.5 4.5V10.5L7.5 14L13.5 10.5V4.5L7.5 1L1.5 4.5Z"
        class="stroke-cap-round"
        stroke="{progressColor}"
        fill="transparent"
        stroke-width={ringSize}
        stroke-dasharray={pathLength +' ' + pathLength}
        stroke-dashoffset={strokeDashoffset}
        transform="rotate(90, {7.5}, {7.5})"
      />
    </g>
    <Fa icon={icon} scale={iconScaling} translateX={iconTranslateX} translateY={iconTranslateY} flip={"horizontal"} style="color:{iconColor}"/>
  </svg>
