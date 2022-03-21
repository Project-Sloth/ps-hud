<script lang="ts">
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';
  import Fa from 'svelte-fa'

  export let height: number = 50;
  export let width: number = 50;
  export let ringSize: number = 7;
  export let progressValue: number = 100;
  export let progressColor: string = "#3FA554";
  export let innerColor: string = "black";
  export let rotateDegree: number = 0;
  export let translateX: number = 0;
  export let translateY: number = 0;
  export let icon = null;
  export let iconScaling: number = 0.40;
  export let iconColor: string = "white";
  export let iconTranslateX: number = 0;
  export let iconTranslateY: number = 0;
  
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

  $: {
    radius = height > width ? height/2 : width/2;
    normalizedRadius = radius - (ringSize/2);
    circumference = normalizedRadius * 2 * Math.PI;
    strokeDashoffset = circumference - $progressTween / 100 * circumference;
  }
  
</script>

<svg
  width={radius*2 }
  height={radius*2 }
  viewBox = "0 0 {radius*2} {radius*2}"
>
  <g 
    transform="
    { rotateDegree > 0 ? "rotate("+rotateDegree+" "+width/2+" "+height/2+")": ""}
    { translateX | translateY ? "translate("+translateX+" "+translateY+")" : ""}"
  >
    <circle
      opacity="0.4"
      stroke="{progressColor}"
      stroke-dashoffset={0}
      stroke-dasharray={circumference + ' ' + circumference}
      stroke-width={ringSize}
      r={normalizedRadius}
      cx={radius}
      cy={radius}
      transform="rotate(-90, {radius}, {radius})"
    />
    <circle
      fill="{innerColor}"
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
      stroke="{progressColor}"
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
  <Fa icon={icon} scale={iconScaling} translateX={iconTranslateX} translateY={iconTranslateY} style="color:{iconColor}"/>
</svg>