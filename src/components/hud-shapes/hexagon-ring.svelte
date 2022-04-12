<script lang="ts">
  import { onMount } from 'svelte';
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';
  import Fa from 'svelte-fa';

  export let displayOutline: boolean = true;
  export let height: number = 50;
  export let icon: any = null;
  export let iconColor: string = "red";
  export let iconRotateDegree: number = 0;
  export let iconScaling: number = 0.45;
  export let iconTranslateX: number = 0;
  export let iconTranslateY: number = 0;
  export let innerColor: string = "#212121";
  export let innerColorOpacity: number = 1;
  export let name: string = "";
  export let outlineColor: string = "red";
  export let outlineColorOpacity: number = 0.4;
  export let progressColor: string = "red";
  export let progressValue: number = 100;
  export let ringSize: number = 4;
  export let rotateDegree: number = 0;
  export let translateX: number = 0;
  export let translateY: number = 0;
  export let width: number = 50;

  let strokeDashoffset: number = 10;

  const progressTween = tweened(progressValue, {
		duration: 600,
		easing: cubicOut
	});

  $: {
    progressTween.set(progressValue)
  }

  $: strokeDashoffset = pathLength - $progressTween / 100 * pathLength;

  let hexagon;
  let pathLength;

  onMount(() => {
    pathLength = hexagon.getTotalLength();
  });


</script>

<svg width={width} height={height} viewBox="0 0 24 24" overflow="visible">
  <!-- <defs>
    <linearGradient id="gradient-stroke" x1="0%" y1="0%" x2="100%" y2="0%" gradientUnits="userSpaceOnUse">
        <stop offset="0" stop-color="#14d4ff" />
        <stop offset="1" stop-color="#eb0ed8" />
    </linearGradient>
  </defs> -->
  <defs>
    <clipPath id="cut-out-{name}">
        <path d="M11.7 1.1732C11.8856 1.06603 12.1144 1.06603 12.3 1.17321L21.2263 6.3268C21.4119 6.43397 21.5263 6.63205 21.5263 6.84641V17.1536C21.5263 17.3679 21.4119 17.566 21.2263 17.6732L12.3 22.8268C12.1144 22.934 11.8856 22.934 11.7 22.8268L2.77372 17.6732C2.58808 17.566 2.47372 17.3679 2.47372 17.1536V6.84641C2.47372 6.63205 2.58808 6.43397 2.77372 6.32679L11.7 1.1732Z"
          class="stroke-cap-round"
          fill={"transparent"}
          stroke-width={width/2}
        />
    </clipPath>
  </defs>

  <!-- stroke="black" -->
  <!-- opacity="0.75" -->
  <g 
    transform="
      { rotateDegree > 0 ? "rotate("+rotateDegree+" "+12+" "+12+")": ""}"
  >
    {#if displayOutline}
      <path d="M11.7 1.1732C11.8856 1.06603 12.1144 1.06603 12.3 1.17321L21.2263 6.3268C21.4119 6.43397 21.5263 6.63205 21.5263 6.84641V17.1536C21.5263 17.3679 21.4119 17.566 21.2263 17.6732L12.3 22.8268C12.1144 22.934 11.8856 22.934 11.7 22.8268L2.77372 17.6732C2.58808 17.566 2.47372 17.3679 2.47372 17.1536V6.84641C2.47372 6.63205 2.58808 6.43397 2.77372 6.32679L11.7 1.1732Z"
        class="stroke-cap-round"
        stroke={outlineColor}
        opacity={outlineColorOpacity}
        fill={innerColor}
        stroke-width={ringSize}
        stroke-dasharray={pathLength +' ' + pathLength}
        stroke-dashoffset={0}
      />
    {/if}
    <line
      x1="50%"
      y1={24}
      x2="50%"
      y2={0}
      stroke={"black"}
      stroke-width={width}
      clip-path="url(#cut-out-{name})"
    />

    <!-- stroke="url(#gradient-stroke)" -->
    <path bind:this={hexagon} d="M11.7 1.1732C11.8856 1.06603 12.1144 1.06603 12.3 1.17321L21.2263 6.3268C21.4119 6.43397 21.5263 6.63205 21.5263 6.84641V17.1536C21.5263 17.3679 21.4119 17.566 21.2263 17.6732L12.3 22.8268C12.1144 22.934 11.8856 22.934 11.7 22.8268L2.77372 17.6732C2.58808 17.566 2.47372 17.3679 2.47372 17.1536V6.84641C2.47372 6.63205 2.58808 6.43397 2.77372 6.32679L11.7 1.1732Z"
      class="stroke-cap-round"
      stroke={progressColor}
      fill="transparent"
      stroke-width={ringSize}
      stroke-dasharray={pathLength +' ' + pathLength}
      stroke-dashoffset={strokeDashoffset}
    />
  </g>
  <Fa icon={icon} scale={iconScaling} translateX={iconTranslateX}
    translateY={iconTranslateY} flip={"horizontal"} style="color:{iconColor}"/>
</svg>
