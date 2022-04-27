<script lang="ts">
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';
  import Fa from 'svelte-fa'

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
  
  let radius: number = 25;

  const progressTween = tweened(progressValue, {
		duration: 600,
		easing: cubicOut
	});
  $: {
    progressTween.set(progressValue)
  }

  // Outer ring
  let normalizedRadius: number = radius - (ringSize/2);
  let circumference: number = normalizedRadius * 2 * Math.PI;
  let strokeDashoffset: number = circumference - $progressTween / 100 * circumference;

  // inner circle
  let innerRadius: number = radius*0.80;
  let innerNormalizedRadius: number = innerRadius - (innerRadius/2);
  let innerCircumference: number = innerNormalizedRadius * 2 * Math.PI;
  let innerStrokeDashoffset: number = innerCircumference - $progressTween / 100 * innerCircumference;

  $: radius = height > width ? height/2 : width/2;
  $: {
    normalizedRadius = radius - (ringSize/2);
    circumference = normalizedRadius * 2 * Math.PI;

    innerRadius = (radius - ringSize)*0.80;
    innerNormalizedRadius =  innerRadius - (innerRadius/2);
    innerCircumference = innerNormalizedRadius * 2 * Math.PI;
  }
  $: {
    strokeDashoffset = circumference - $progressTween / 100 * circumference;
    innerStrokeDashoffset = innerCircumference - $progressTween / 100 * innerCircumference;
  }
  
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
    {#if displayOutline}
      <circle
        opacity={outlineColorOpacity}
        fill="transparent"
        stroke={outlineColor}
        stroke-dashoffset={0}
        stroke-dasharray={circumference + ' ' + circumference}
        stroke-width={ringSize}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
        transform="rotate(-90, {radius}, {radius})"
      />
    {/if}
    <circle
      fill={"transparent"}
      stroke={progressColor}
      stroke-opacity={0.6}
      stroke-dashoffset={innerStrokeDashoffset}
      stroke-dasharray={innerCircumference + ' ' + innerCircumference}
      stroke-width={innerRadius}
      r={innerNormalizedRadius}
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