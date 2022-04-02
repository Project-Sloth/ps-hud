<script lang="ts">
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';
  import { onMount } from 'svelte';
  import Fa from 'svelte-fa';

  export let height: number = 50;
  export let icon: any = null;
  export let iconColor: string = "red";
  export let iconScaling: number = 0.45;
  export let iconTranslateX: number = 0;
  export let iconTranslateY: number = 0;
  export let innerColor: string = "#212121";
  export let outlineColor: string = "red";
  export let outlineColorOpacity: number = 0.4;
  export let progressColor: string = "red";
  export let progressValue: number = 100;
  export let ringSize: number = 4;
  export let rotateDegree: number = 0;
  export let translateX: number = 0;
  export let translateY: number = 0;
  export let width: number = 50;

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
</script>

<div>
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    transform="
      scale(-1,1)
      { rotateDegree > 0 ? "rotate("+rotateDegree+" "+12+" "+14.5+")": ""}
      { translateX | translateY ? "translate("+translateX+" "+translateY+")" : ""}"
  >
    <path d="M21.87,19.29l-9-15.58a1,1,0,0,0-1.74,0l-9,15.58a1,1,0,0,0,0,1,1,1,0,0,0,.87.5H21a1,1,0,0,0,.87-.9"
      class="stroke-cap-round stroke-join-round"
      stroke="{outlineColor}"
      opacity="{outlineColorOpacity}"
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
    <path bind:this={triangle}
      d="M21.87,19.29l-9-15.58a1,1,0,0,0-1.74,0l-9,15.58a1,1,0,0,0,0,1,1,1,0,0,0,.87.5H21a1,1,0,0,0,.87-.9"
      class="stroke-cap-round"
      stroke="{progressColor}"
      fill="transparent"
      stroke-width={ringSize}
      stroke-dasharray={pathLength +' ' + pathLength}
      stroke-dashoffset={strokeDashoffset}
      transform="rotate(-120, {12}, {14.5})"
    />
    <Fa icon={icon} scale={iconScaling} translateX={iconTranslateX}
    translateY={iconTranslateY } flip={"horizontal"} style="color:{iconColor}"/>
    <!-- || 0.10 -->
  </svg>
</div>
