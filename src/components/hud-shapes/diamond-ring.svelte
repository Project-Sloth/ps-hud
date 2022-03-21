<script lang="ts">
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';
  import { onMount } from 'svelte';
  import Fa from 'svelte-fa';

  export let height: number = 60;
  export let width: number = 60;
  export let ringSize: number = 1.9;
  export let progressValue: number = 0;
  export let progressColor: string = "#3FA554"
  export let innerColor: string = "black";
  export let rotateDegree: number = 0;
  export let translateX: number = 0;
  export let translateY: number = 0;
  export let icon = null;
  export let iconScaling: number = 0.35;
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

  let bolt;
  let pathLength;

  onMount(() => {
    pathLength = bolt.getTotalLength();
  });

  $: strokeDashoffset = pathLength - $progressTween / 100 * pathLength;

</script>

<div class="flex mx-[-7px]">
  <svg version="1.1" width={width} height={height} viewBox="0 0 16 16" transform="scale(-1,1)">
    <g 
      transform="
        { rotateDegree > 0 ? "rotate("+rotateDegree+" "+width/8+" "+height/8+")": ""}
        { translateX | translateY ? "translate("+translateX+" "+translateY+")" : ""}"
    >
      <path d="M8.384 1.226a.463.463 0 0 0-.768 0l-4.56 6.468a.537.537 0 0 0 0 .612l4.56 6.469a.463.463 0 0 0 .768 0l4.56-6.469a.537.537 0 0 0 0-.612l-4.56-6.468z"
      stroke="{progressColor}"
        opacity="0.4"
        fill="{innerColor}"
        stroke-width={ringSize}
        stroke-dasharray={pathLength +' ' + pathLength}
        stroke-dashoffset={0}
      />
      <svg viewBox="-1.5 4.5 19 7">
        <path d="M8.384 1.226a.463.463 0 0 0-.768 0l-4.56 6.468a.537.537 0 0 0 0 .612l4.56 6.469a.463.463 0 0 0 .768 0l4.56-6.469a.537.537 0 0 0 0-.612l-4.56-6.468z"
          stroke-width={ringSize-0.3}
          fill="{innerColor}"
          stroke="transparent"
          stroke-dasharray={pathLength +' ' + pathLength}
          stroke-dashoffset={0}
        />
      </svg>
      <path bind:this={bolt} d="M8.384 1.226a.463.463 0 0 0-.768 0l-4.56 6.468a.537.537 0 0 0 0 .612l4.56 6.469a.463.463 0 0 0 .768 0l4.56-6.469a.537.537 0 0 0 0-.612l-4.56-6.468z"
        class="stroke-cap-round stroke-join-round"
        stroke="{progressColor}"
        stroke-width={ringSize}
        fill="transparent"
        stroke-dasharray={pathLength +' ' + pathLength}
        stroke-dashoffset={strokeDashoffset}
      />
    </g>
    <Fa icon={icon} scale={iconScaling} translateX={iconTranslateX} translateY={iconTranslateY} flip={"horizontal"} style="color:{iconColor}"/>
  </svg>
</div>