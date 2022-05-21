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
  
  let radius: number = 25;

  const progressTween = tweened(progressValue, {
		duration: 600,
		easing: cubicOut
	});
  $: {
    progressTween.set(progressValue)
  }

  let normalizedRadius: number = radius - (ringSize/2);
  let circumference: number = normalizedRadius * 2 * Math.PI;
  let strokeDashoffset: number = circumference - $progressTween / 100 * circumference;

  $: radius = height > width ? height/2 : width/2;
  $: {
    normalizedRadius = radius - (ringSize/2);
    circumference = normalizedRadius * 2 * Math.PI;
  }
  $: strokeDashoffset = circumference - $progressTween / 100 * circumference;
</script>

<svg
  width={radius * 2}
  height={radius * 2}
  viewBox = "0 0 {radius * 2} {radius * 2}"
  overflow="visible"
>
  <g 
    transform="
    { rotateDegree > 0 ? "rotate("+rotateDegree+" "+radius+" "+radius+")": ""}
    { "translate("+translateX+" "+translateY+")" }"
  >
    <circle
      fill={innerColor}
      stroke="transparent"
      stroke-dashoffset={0}
      stroke-dasharray={circumference +' ' + circumference}
      stroke-width={ringSize-0.6}
      r={normalizedRadius - (ringSize/2) + 0.1}
      cx={radius}
      cy={radius}
      transform="rotate(-90, {radius}, {radius})"
    />
    {#if displayOutline}
    <circle
      fill="transparent"
      stroke={outlineColor}
      stroke-dashoffset={0}
      stroke-dasharray={circumference + ' ' + circumference}
      stroke-width={ringSize}
      r={normalizedRadius}
      cx={radius}
      cy={radius}
      transform="rotate(-90, {radius}, {radius})"
      style="filter: {outlineDropShadowAmount ? "drop-shadow(0px 0px "+outlineDropShadowAmount+"px "+outlineColor+")": ""}
                     {"contrast("+outlineContrast+"%)"};"
    />
  {/if}
    <circle
      stroke="{progressColor}"
      fill="transparent"
      stroke-dashoffset={strokeDashoffset}
      stroke-dasharray={circumference + ' ' + circumference}
      stroke-width={ringSize}
      r={normalizedRadius}
      cx={radius}
      cy={radius}
      transform="rotate(-90, {radius}, {radius})"
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