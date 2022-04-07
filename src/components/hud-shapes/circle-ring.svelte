<script lang="ts">
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';
  import Fa from 'svelte-fa'

  export let height: number = 50;
  export let icon: any = null;
  export let iconColor: string = "red";
  export let iconRotateDegree: number = 0;
  export let iconScaling: number = 0.45;
  export let iconTranslateX: number = 0;
  export let iconTranslateY: number = 0;
  export let innerColor: string = "#212121";
  export let innerColorOpacity: number = 1;
  export let outlineColor: string = "red";
  export let outlineColorOpacity: number = 0.4;
  export let progressColor: string = "red";
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
  
  // track circle
  //       style="filter: drop-shadow(0px 0px 6px {progressColor}) contrast(200%);"
  // progress circle
  //       style="filter: drop-shadow(0px 0px 10px {progressColor}) contrast(300%) contrast(175%);"
  // icon
  //       style="filter: drop-shadow(0px 0px 10px {progressColor}) contrast(300%);"
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
      opacity={outlineColorOpacity}
      stroke={outlineColor}
      stroke-dashoffset={0}
      stroke-dasharray={circumference + ' ' + circumference}
      stroke-width={ringSize}
      r={normalizedRadius}
      cx={radius}
      cy={radius}
      transform="rotate(-90, {radius}, {radius})"
    />
    <circle
      fill={innerColor}
      fill-opacity={innerColorOpacity}
      stroke="transparent"
      stroke-dashoffset={0}
      stroke-dasharray={circumference +' ' + circumference}
      stroke-width={ringSize-0.6}
      r={normalizedRadius - (ringSize/2) + 0.1}
      cx={radius}
      cy={radius}
      transform="rotate(-90, {radius}, {radius})"
    />
    <circle
      stroke={progressColor}
      fill="transparent"
      stroke-dashoffset={strokeDashoffset}
      stroke-dasharray={circumference + ' ' + circumference}
      stroke-width={ringSize}
      r={normalizedRadius}
      cx={radius}
      cy={radius}
      transform="rotate(-90, {radius}, {radius})"
    />
  </g>
  <g >
    <Fa icon={icon} scale={iconScaling} translateX={iconTranslateX}
    translateY={iconTranslateY} style="color:{iconColor || progressColor}"/>
  </g>
</svg>