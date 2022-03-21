<script lang="ts">
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';
  import { onMount } from 'svelte';
  import Fa from 'svelte-fa';

  export let height: number = 50;
  export let width: number = 50;
  export let ringSize: number = 3;
  export let progressValue: number = 10;
  export let progressColor: string = "#3FA554";
  export let innerColor: string = "black";
  export let rotateDegree: number = 0;
  export let translateX: number = 0;
  export let translateY: number = 0;
  export let icon = null;
  export let iconScaling: number = 0.35;
  export let iconColor: string = "white";
  export let iconTranslateX: number = 0;
  export let iconTranslateY: number = 0;

  console.log("RotateDegree", rotateDegree)

  const progressTween = tweened(progressValue, {
		duration: 600,
		easing: cubicOut
	});

  $: {
    progressTween.set(progressValue)
  }

  let triangle;
  let pathLength;

  onMount(() => {
    pathLength = triangle.getTotalLength();
  });

  $: strokeDashoffset = pathLength - $progressTween / 100 * pathLength;
  // translate({translate?.x} {translate?.y})
</script>

<div>
  <svg width={width} height={height} viewBox="0 0 24 24" transform="scale(-1,1)">
    <g 
      transform="
        { rotateDegree > 0 ? "rotate("+rotateDegree+" "+width/4+" "+height/4+")": ""}
        { translateX | translateY ? "translate("+translateX+" "+translateY+")" : ""}"
    >
      <path d="M21.87,19.29l-9-15.58a1,1,0,0,0-1.74,0l-9,15.58a1,1,0,0,0,0,1,1,1,0,0,0,.87.5H21a1,1,0,0,0,.87-.9"
        class="stroke-cap-round stroke-join-round"
        stroke="{progressColor}"
        opacity="0.4"
        fill="{innerColor}"
        stroke-width={ringSize}
        stroke-dasharray={pathLength +' ' + pathLength}
        stroke-dashoffset={0}
      />
      <svg viewBox="2 {0.4-ringSize} 20 {24 + ringSize*1.5}">
        <path d="M21.87,19.29l-9-15.58a1,1,0,0,0-1.74,0l-9,15.58a1,1,0,0,0,0,1,1,1,0,0,0,.87.5H21a1,1,0,0,0,.87-.9"
          fill="{innerColor}"
          stroke="transparent"
          stroke-width={ringSize}
          stroke-dasharray={pathLength +' ' + pathLength}
          stroke-dashoffset={0}
        />
      </svg>
      <path bind:this={triangle} d="M21.87,19.29l-9-15.58a1,1,0,0,0-1.74,0l-9,15.58a1,1,0,0,0,0,1,1,1,0,0,0,.87.5H21a1,1,0,0,0,.87-.9"
        class="stroke-cap-round"
        stroke="{progressColor}"
        fill="transparent"
        stroke-width={ringSize}
        stroke-dasharray={pathLength +' ' + pathLength}
        stroke-dashoffset={strokeDashoffset}
        transform="rotate(-120, {12}, {14.5})"
      />
    </g>
    <Fa icon={icon} scale={iconScaling} translateX={iconTranslateX} translateY={iconTranslateY} flip={"horizontal"} style="color:{iconColor}"/>
  </svg>
</div>
