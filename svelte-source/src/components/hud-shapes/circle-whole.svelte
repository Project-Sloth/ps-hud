<script lang="ts">
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';
  import Fa from 'svelte-fa'

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

  let radius: number = 25;
  let stroke: number = 25;
  let normalizedRadius: number = radius - (stroke/2);
  let circumference = normalizedRadius * 2 * Math.PI;
  let strokeDashoffset: number = 0;
  
  const progressTween = tweened(progressValue, {
    duration: 600,
    easing: cubicOut
  });

  $: {
    progressTween.set(progressValue)
  }

  $: {
    radius = height > width ? height/2 : width/2;
    stroke = radius;
    normalizedRadius = radius - (stroke/2);
    circumference = normalizedRadius * 2 * Math.PI;
    strokeDashoffset = circumference - $progressTween / 100 * circumference;
  }
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
      fill="transparent"
      stroke={outlineColor}
      stroke-dashoffset={0}
      stroke-dasharray={circumference + ' ' + circumference}
      stroke-width={stroke}
      r={normalizedRadius}
      cx={radius}
      cy={radius}
      transform="rotate(-90, {radius}, {radius})"
      style="filter: {outlineDropShadowAmount ? "drop-shadow(0px 0px "+outlineDropShadowAmount+"px "+outlineColor+")": ""}
                     {"contrast("+outlineContrast+"%)"};"
    />
    <circle
      stroke={progressColor}
      fill="transparent"
      stroke-dashoffset={strokeDashoffset}
      stroke-dasharray={circumference + ' ' + circumference}
      stroke-width={stroke}
      r={normalizedRadius}
      cx={radius}
      cy={radius}
      transform="rotate(-90, {radius}, {radius})"
      style="filter: {progressDropShadowAmount ? "drop-shadow(0px 0px "+progressDropShadowAmount+"px "+progressColor+")": ""}
                     {"contrast("+progressContrast+"%)"};"
    />

    <!-- This is the outer border -->
    <!-- <circle
      stroke="black"
      fill="transparent"
      stroke-width={3}
      r={normalizedRadius*2 - 1.5}
      cx={radius}
      cy={radius}
      transform="rotate(-90, {radius}, {radius})"
    /> -->
  
  </g>
  <g style="filter: {iconDropShadowAmount ? "drop-shadow(0px 0px "+iconDropShadowAmount+"px "+iconColor+")": ""}
                    {"contrast("+iconContrast+"%)"};">
    <Fa icon={icon} scale={iconScaling} translateX={iconTranslateX}
    translateY={iconTranslateY} style="color:{iconColor}"/>
  </g>
</svg>