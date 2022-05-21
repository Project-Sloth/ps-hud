<script lang="ts">
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';
  import { onMount } from 'svelte';
  import Fa from 'svelte-fa';

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

  let triangle;
  let pathLength;

  onMount(() => {
    try {
      pathLength = triangle.getTotalLength();
    }catch(err) {
      console.log("Error: PS-Hud: Triangle-Ring-Icon should not be mounting when hiding icons")
    }
  });

  $: strokeDashoffset = pathLength - $progressTween / 100 * pathLength;
</script>

<svg
  width={width}
  height={height}
  viewBox="0 0 24 24"
  transform="
    scale(-1,1)
    { rotateDegree > 0 ? "rotate("+rotateDegree+" "+12+" "+14.5+")": ""}
    { "translate("+translateX+" "+translateY+")" }"
  overflow="visible"
>
  <path d="M21.87,19.29l-9-15.58a1,1,0,0,0-1.74,0l-9,15.58a1,1,0,0,0,0,1,1,1,0,0,0,.87.5H21a1,1,0,0,0,.87-.9"
    class="stroke-cap-round stroke-join-round"
    stroke={outlineColor}
    fill={innerColor}
    stroke-width={ringSize}
    stroke-dasharray={pathLength +' ' + pathLength}
    stroke-dashoffset={0}
    style="filter: {outlineDropShadowAmount ? "drop-shadow(0px 0px "+outlineDropShadowAmount+"px "+outlineColor+")": ""}
                   {"contrast("+outlineContrast+"%)"};"
  />
  <!-- <svg viewBox="2 {0.4-ringSize} 20 {24 + ringSize*1.5}">
    <path d="M21.87,19.29l-9-15.58a1,1,0,0,0-1.74,0l-9,15.58a1,1,0,0,0,0,1,1,1,0,0,0,.87.5H21a1,1,0,0,0,.87-.9"
      fill="{innerColor}"
      stroke="transparent"
      stroke-width={ringSize}
      stroke-dasharray={pathLength +' ' + pathLength}
      stroke-dashoffset={0}
    />
  </svg> -->
  <path bind:this={triangle}
    d="M21.87,19.29l-9-15.58a1,1,0,0,0-1.74,0l-9,15.58a1,1,0,0,0,0,1,1,1,0,0,0,.87.5H21a1,1,0,0,0,.87-.9"
    class="stroke-cap-round"
    stroke="{progressColor}"
    fill="transparent"
    stroke-width={ringSize}
    stroke-dasharray={pathLength +' ' + pathLength}
    stroke-dashoffset={strokeDashoffset}
    transform="rotate(-120, {12}, {14.5})"
    style="filter: {progressDropShadowAmount ? "drop-shadow(0px 0px "+progressDropShadowAmount+"px "+progressColor+")": ""}
                   {"contrast("+progressContrast+"%)"};"
  />
  <g style="filter: {iconDropShadowAmount ? "drop-shadow(0px 0px "+iconDropShadowAmount+"px "+iconColor+")": ""}
                    {"contrast("+iconContrast+"%)"};">
    <Fa icon={icon} scale={iconScaling} translateX={iconTranslateX}
      translateY={iconTranslateY } flip={"horizontal"} style="color:{iconColor}"
    />
  </g>
  <!-- || 0.10 -->
</svg>
