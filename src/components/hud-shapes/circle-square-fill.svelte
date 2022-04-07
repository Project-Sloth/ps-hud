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
  let minimumAxis: number = height;
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
    minimumAxis = height > width ? height : width;
    radius = minimumAxis/2;
    stroke = radius;
    normalizedRadius = radius - (stroke/2);
    circumference = normalizedRadius * 2 * Math.PI;
  }

  $: {
    strokeDashoffset = minimumAxis - $progressTween / 100 * minimumAxis;
  }


  // filter= "drop-shadow(3px 5px 2px rgb(0 0 0 / 0.4))"
</script>

<svg
  width={radius * 2}
  height={radius * 2}
  viewBox = "0 0 {radius * 2} {radius * 2}"
  overflow="visible"
>
  <defs>
    <clipPath id="cut-out-circle">
      <circle
        stroke={progressColor}
        stroke-width={stroke}
        r={radius}
        cx={radius}
        cy={radius}
      />
    </clipPath>
  </defs>
  <g 
    transform="
    { rotateDegree > 0 ? "rotate("+rotateDegree+" "+radius+" "+radius+")": ""}
    { translateX | translateY ? "translate("+translateX+" "+translateY+")" : ""}"
  >
  <circle
    opacity={innerColorOpacity}
    stroke={innerColor}
    stroke-width={stroke}
    r={normalizedRadius}
    cx={radius}
    cy={radius}
  />
  <line
    x1="50%"
    y1="100%"
    x2="50%"
    y2="0%"
    stroke={progressColor} 
    stroke-dasharray={minimumAxis}
    stroke-dashoffset={strokeDashoffset}
    stroke-width={minimumAxis}
    clip-path="url(#cut-out-circle)"
  />
  </g>
  <g style="filter: drop-shadow(0px 0px 11px #000000) contrast(200%);">
    <Fa icon={icon} scale={iconScaling} translateX={iconTranslateX}
    translateY={iconTranslateY} style="color:{iconColor || progressColor}"/>
  </g>
</svg>