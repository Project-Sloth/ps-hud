<script lang="ts">
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';
  import Fa from 'svelte-fa'

  export let height: number = 50;
  export let icon: any = null;
  export let iconColor: string = "red";
  export let iconScaling: number = 0.45;
  export let iconTranslateX: number = 0;
  export let iconTranslateY: number = 0;
  export let innerColor: string = "#212121";
  export let innerColorOpacity: number = 0.4;
  export let progressColor: string = "red";
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

  // filter= "drop-shadow(3px 5px 2px rgb(0 0 0 / 0.4))"
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
    { translateX | translateY ? "translate("+translateX+" "+translateY+")" : ""}"
  >
    <circle
      opacity={innerColorOpacity}
      stroke={innerColor}
      stroke-dashoffset={0}
      stroke-dasharray={circumference + ' ' + circumference}
      stroke-width={stroke}
      r={normalizedRadius}
      cx={radius}
      cy={radius}
      transform="rotate(-90, {radius}, {radius})"
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
  <g style="filter: drop-shadow(0px 0px 11px #000000) contrast(200%);">
    <Fa icon={icon} scale={iconScaling} translateX={iconTranslateX}
    translateY={iconTranslateY} style="color:{iconColor || progressColor}"/>
  </g>
</svg>