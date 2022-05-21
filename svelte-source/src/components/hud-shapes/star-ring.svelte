<script lang="ts">
  import { onMount } from 'svelte';
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';
  import Fa from 'svelte-fa';

  export let displayOutline: boolean = true;
  export let height: number = 50;
  export let icon: any = null;
  export let iconColor: string = "red";
  export let iconContrast: number = 100;
  export let iconDropShadowAmount: number = 0;
  export let iconRotateDegree: number = 0;
  export let iconScaling: number = 0.45;
  export let iconTranslateX: number = 0;
  export let iconTranslateY: number = 0;
  export let innerColor: string = "#212121";
  export let name: string = "";
  export let outlineColor: string = "red";
  export let outlineContrast: number = 100;
  export let outlineDropShadowAmount: number = 0;
  export let progressColor: string = "red";
  export let progressContrast: number = 100;
  export let progressDropShadowAmount: number = 0;
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

  let star;
  let pathLength;

  onMount(() => {
    try {
      pathLength = star.getTotalLength();
    }catch(err) {
    }
  });

  $: strokeDashoffset = pathLength - $progressTween / 100 * pathLength;
</script>

<svg
  width={width}
  height={height}
  viewBox="0 0 38 40"
  transform="scale(-1,1)"
  overflow="visible"
>
  <g 
  transform="
    { rotateDegree > 0 ? "rotate("+rotateDegree+" "+19.35+" "+22+")": ""}
    { "translate("+translateX+" "+translateY+")" }"
  >
    <clipPath id="{name}-cut-out-star">
        <path d="M36.042,13.909c-0.123-0.377-0.456-0.646-0.85-0.688l-11.549-1.172L18.96,1.43c-0.16-0.36-0.519-0.596-0.915-0.596
        s-0.755,0.234-0.915,0.598L12.446,12.05L0.899,13.221c-0.394,0.04-0.728,0.312-0.85,0.688c-0.123,0.377-0.011,0.791,0.285,1.055
        l8.652,7.738L6.533,34.045c-0.083,0.387,0.069,0.787,0.39,1.02c0.175,0.127,0.381,0.191,0.588,0.191
        c0.173,0,0.347-0.045,0.503-0.137l10.032-5.84l10.03,5.84c0.342,0.197,0.77,0.178,1.091-0.059c0.32-0.229,0.474-0.633,0.391-1.02
        l-2.453-11.344l8.653-7.737C36.052,14.699,36.165,14.285,36.042,13.909z"
        stroke={outlineColor}
        fill={innerColor}
        stroke-width={ringSize+10}
        transform="rotate(-72, {20}, {20})"
        height={height}
        width={width}
      />
    </clipPath>
    <!-- <svg viewBox="{1-ringSize} {5.5-ringSize} {36 + ringSize*2} {29 + ringSize*2}">
      <path d="M36.042,13.909c-0.123-0.377-0.456-0.646-0.85-0.688l-11.549-1.172L18.96,1.43c-0.16-0.36-0.519-0.596-0.915-0.596
        s-0.755,0.234-0.915,0.598L12.446,12.05L0.899,13.221c-0.394,0.04-0.728,0.312-0.85,0.688c-0.123,0.377-0.011,0.791,0.285,1.055
        l8.652,7.738L6.533,34.045c-0.083,0.387,0.069,0.787,0.39,1.02c0.175,0.127,0.381,0.191,0.588,0.191
        c0.173,0,0.347-0.045,0.503-0.137l10.032-5.84l10.03,5.84c0.342,0.197,0.77,0.178,1.091-0.059c0.32-0.229,0.474-0.633,0.391-1.02
        l-2.453-11.344l8.653-7.737C36.052,14.699,36.165,14.285,36.042,13.909z"
        stroke-width={ringSize}
        fill="{innerColor}"
        stroke="transparent"
        stroke-dasharray={pathLength +' ' + pathLength}
        stroke-dashoffset={0}
        transform="rotate(-72, {20}, {20})"
      />
    </svg> -->
    <rect
      stroke={progressColor}
      stroke-width={ringSize}
      width={width}
      height={height}
      clip-path="url(#{name}-cut-out-star)"
    />
    {#if displayOutline}
      <path d="M36.042,13.909c-0.123-0.377-0.456-0.646-0.85-0.688l-11.549-1.172L18.96,1.43c-0.16-0.36-0.519-0.596-0.915-0.596
        s-0.755,0.234-0.915,0.598L12.446,12.05L0.899,13.221c-0.394,0.04-0.728,0.312-0.85,0.688c-0.123,0.377-0.011,0.791,0.285,1.055
        l8.652,7.738L6.533,34.045c-0.083,0.387,0.069,0.787,0.39,1.02c0.175,0.127,0.381,0.191,0.588,0.191
        c0.173,0,0.347-0.045,0.503-0.137l10.032-5.84l10.03,5.84c0.342,0.197,0.77,0.178,1.091-0.059c0.32-0.229,0.474-0.633,0.391-1.02
        l-2.453-11.344l8.653-7.737C36.052,14.699,36.165,14.285,36.042,13.909z"
        stroke={outlineColor}
        fill={innerColor}
        stroke-width={ringSize-0.6}
        stroke-dasharray={pathLength +' ' + pathLength}
        stroke-dashoffset={0}
        transform="rotate(-72, {20}, {20})"
        style="filter: {outlineDropShadowAmount ? "drop-shadow(0px 0px "+outlineDropShadowAmount+"px "+outlineColor+")": ""}
                       {"contrast("+outlineContrast+"%)"};"
      />
    {/if}
    <path bind:this={star} d="M36.042,13.909c-0.123-0.377-0.456-0.646-0.85-0.688l-11.549-1.172L18.96,1.43c-0.16-0.36-0.519-0.596-0.915-0.596
      s-0.755,0.234-0.915,0.598L12.446,12.05L0.899,13.221c-0.394,0.04-0.728,0.312-0.85,0.688c-0.123,0.377-0.011,0.791,0.285,1.055
      l8.652,7.738L6.533,34.045c-0.083,0.387,0.069,0.787,0.39,1.02c0.175,0.127,0.381,0.191,0.588,0.191
      c0.173,0,0.347-0.045,0.503-0.137l10.032-5.84l10.03,5.84c0.342,0.197,0.77,0.178,1.091-0.059c0.32-0.229,0.474-0.633,0.391-1.02
      l-2.453-11.344l8.653-7.737C36.052,14.699,36.165,14.285,36.042,13.909z"
      class="stroke-cap-round"
      stroke={progressColor}
      stroke-width={ringSize}
      fill="transparent"
      stroke-dasharray={pathLength +' ' + pathLength}
      stroke-dashoffset={strokeDashoffset}
      transform="rotate(-72, {20}, {20})"
      style="filter: {progressDropShadowAmount ? "drop-shadow(0px 0px "+progressDropShadowAmount+"px "+progressColor+")": ""}
                     {"contrast("+progressContrast+"%)"};"
    />
  </g>
  <g style="filter: {iconDropShadowAmount ? "drop-shadow(0px 0px "+iconDropShadowAmount+"px "+iconColor+")": ""}
                    {"contrast("+iconContrast+"%)"};">
    <Fa icon={icon} scale={iconScaling} translateX={iconTranslateX}
      translateY={iconTranslateY} flip={"horizontal"} style="color:{iconColor}"
    />
</g>
</svg>