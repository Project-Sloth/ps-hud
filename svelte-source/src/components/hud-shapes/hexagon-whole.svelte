<script lang="ts">
  import { onMount } from 'svelte';
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';
  import Fa from 'svelte-fa';

  export let height: number = 50;
  export let icon: any = null;
  export let iconColor: string = "red";
  export let iconContrast: number = 100;
  export let iconDropShadowAmount: number = 0;
  export let iconScaling: number = 0.45;
  export let iconTranslateX: number = 0;
  export let iconTranslateY: number = 0;
  export let name: string = "";
  export let outlineColor: string = "red";
  export let outlineContrast: number = 100;
  export let outlineDropShadowAmount: number = 0;
  export let progressColor: string = "red";
  export let progressContrast: number = 100;
  export let progressDropShadowAmount: number = 0;
  export let progressValue: number = 100;
  export let rotateDegree: number = 0;
  export let translateX: number = 0;
  export let translateY: number = 0;
  export let width: number = 50;

  let strokeDashoffset: number = 10;
  let line: any = null;
  let pathLength: number = 0;
  let minimumAxis: number = height;
  
  $: minimumAxis = height > width ? height : width;

  onMount(() => {
    try {
      pathLength = line.getTotalLength();
    }catch(err) {
      console.log("Error: PS-Hud: Hexagon-Whole-Icon should not be mounting when hiding icons")
    }
  });


  const progressTween = tweened(progressValue, {
		duration: 600,
		easing: cubicOut
	});

  $: {
    progressTween.set(progressValue)
  }

  $: strokeDashoffset = pathLength - $progressTween / 100 * pathLength;

</script>

<svg width={width} height={height} viewBox="0 0 24 24">
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
      { rotateDegree > 0 ? "rotate("+rotateDegree+" "+12+" "+12+")": ""}
      { "translate("+translateX+" "+translateY+")" }"
  >
    <path d="M11.7 1.1732C11.8856 1.06603 12.1144 1.06603 12.3 1.17321L21.2263 6.3268C21.4119 6.43397 21.5263 6.63205 21.5263 6.84641V17.1536C21.5263 17.3679 21.4119 17.566 21.2263 17.6732L12.3 22.8268C12.1144 22.934 11.8856 22.934 11.7 22.8268L2.77372 17.6732C2.58808 17.566 2.47372 17.3679 2.47372 17.1536V6.84641C2.47372 6.63205 2.58808 6.43397 2.77372 6.32679L11.7 1.1732Z"
      fill={outlineColor}
      stroke="transparent"
      stroke-width={minimumAxis}
      style="filter: {outlineDropShadowAmount ? "drop-shadow(0px 0px "+outlineDropShadowAmount+"px "+outlineColor+")": ""}
                     {"contrast("+outlineContrast+"%)"};"
    />
    <clipPath id="{name}-cut-out-hexwhole">
      <path d="M11.7 1.1732C11.8856 1.06603 12.1144 1.06603 12.3 1.17321L21.2263 6.3268C21.4119 6.43397 21.5263 6.63205 21.5263 6.84641V17.1536C21.5263 17.3679 21.4119 17.566 21.2263 17.6732L12.3 22.8268C12.1144 22.934 11.8856 22.934 11.7 22.8268L2.77372 17.6732C2.58808 17.566 2.47372 17.3679 2.47372 17.1536V6.84641C2.47372 6.63205 2.58808 6.43397 2.77372 6.32679L11.7 1.1732Z"/>
    </clipPath>

    <line
      x1="50%"
      y1={24}
      x2="50%"
      y2={0}
      stroke={progressColor}
      stroke-dasharray={pathLength}
      stroke-dashoffset={strokeDashoffset}
      stroke-width={pathLength}
      clip-path="url(#{name}-cut-out-hexwhole)"
      bind:this={line}
      style="filter: {progressDropShadowAmount ? "drop-shadow(0px 0px "+progressDropShadowAmount+"px "+progressColor+")": ""}
                     {"contrast("+progressContrast+"%)"};"
    />

    <!-- stroke="url(#gradient-stroke)" -->
  </g>
  <g style="filter: {iconDropShadowAmount ? "drop-shadow(0px 0px "+iconDropShadowAmount+"px "+iconColor+")": ""}
                    {"contrast("+iconContrast+"%)"};">
    <Fa icon={icon} scale={iconScaling} translateX={iconTranslateX}
      translateY={iconTranslateY} flip={"horizontal"} style="color:{iconColor}"/>
  </g>
</svg>
