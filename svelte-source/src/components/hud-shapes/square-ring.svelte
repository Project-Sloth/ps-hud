<script lang="ts">
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';
  import Fa from 'svelte-fa'
  
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

  let perimeter: number = (width + height) * 2;
  let strokeDashoffset: number = 10;

  const progressTween = tweened(progressValue, {
		duration: 600,
		easing: cubicOut
	});

  $: perimeter = (width + height) * 2;
  $: progressTween.set(progressValue);
  $: strokeDashoffset = perimeter - $progressTween / 100 * perimeter;
</script>

<svg
  width={width}
  height={height}
  transform="
    { rotateDegree > 0 ? "rotate("+rotateDegree+" "+0+" "+0+")": ""}
    { "translate("+translateX+" "+translateY+")" }"
>
  <g>
    {#if displayOutline}
      <rect
        stroke={outlineColor}
        width={width}
        height={height}
        stroke-width={ringSize}
        stroke-dasharray={perimeter +' ' + perimeter}
        shape-rendering="geometricPrecision"
        stroke-dashoffset={0}
        fill="transparent"
      />
    {/if}
    <rect
      fill={innerColor}
      transform="translate({ringSize/2-0.1} {ringSize/2-0.3})"
      stroke="transparent"
      shape-rendering="geometricPrecision"
      width={width-ringSize+0.2}
      height={height-ringSize+0.2}
      stroke-width={ringSize}
      stroke-dasharray={perimeter +' ' + perimeter}
      stroke-dashoffset={0}
      style="filter: {outlineDropShadowAmount ? "drop-shadow(0px 0px "+outlineDropShadowAmount+"px "+outlineColor+")": ""}
                     {"contrast("+outlineContrast+"%)"};"
    />
    <rect
      stroke={progressColor}
      fill="transparent"
      width={width}
      height={height}
      stroke-width={ringSize-0.1}
      stroke-dasharray={perimeter +' ' + perimeter}
      stroke-dashoffset={strokeDashoffset}
      style="filter: {progressDropShadowAmount ? "drop-shadow(0px 0px "+progressDropShadowAmount+"px "+progressColor+")": ""}
                     {"contrast("+progressContrast+"%)"};"
    />
  </g>
  <g style="filter: {iconDropShadowAmount ? "drop-shadow(0px 0px "+iconDropShadowAmount+"px "+iconColor+")": ""}
                    {"contrast("+iconContrast+"%)"};">
    <Fa icon={icon} scale={iconScaling} translateX={iconTranslateX}
      translateY={iconTranslateY} style="color:{iconColor}"/>
  </g>
</svg>