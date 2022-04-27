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
  export let name: string = "";
  export let progressColor: string = "red";
  export let progressValue: number = 100;
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

  let normalizedRadius: number = radius;
  let circumference = normalizedRadius * 2 * Math.PI;
  let strokeDashoffset: number = circumference - $progressTween / 100 * circumference;

  $: {
    radius = height > width ? height : width;
    normalizedRadius = radius;
    circumference = normalizedRadius * 2 * Math.PI;
    strokeDashoffset = circumference - $progressTween / 100 * circumference;
  }
  
  // filter= "drop-shadow(3px 5px 2px rgb(0 0 0 / 0.4))"
</script>

<svg
  width={radius}
  height={radius}
  viewBox = "0 0 {radius*2} {radius*2}"
>
  <g 
  transform="
    { rotateDegree > 0 ? "rotate("+rotateDegree+" "+width+" "+height+")": ""}
    { translateX | translateY ? "translate("+translateX+" "+translateY+")" : ""}"
  >
    <circle
      opacity="{innerColorOpacity}"
      stroke="{innerColor}"
      fill="transparent"
      stroke-dashoffset={0}
      stroke-dasharray={circumference + ' ' + circumference}
      stroke-width={normalizedRadius*2}
      r={normalizedRadius}
      cx={radius}
      cy={radius}
      transform="rotate(-90, {radius}, {radius})"
    />
    <circle
      stroke="{progressColor}"
      fill="transparent"
      stroke-dashoffset={strokeDashoffset}
      stroke-dasharray={circumference + ' ' + circumference}
      stroke-width={normalizedRadius*2}
      r={normalizedRadius}
      cx={radius}
      cy={radius}
      transform="rotate(-90, {radius}, {radius})"
    />
  </g>
  <Fa icon={icon} scale={iconScaling} translateX={iconTranslateX}
  translateY={iconTranslateY} style="color:{iconColor}"/>
</svg>