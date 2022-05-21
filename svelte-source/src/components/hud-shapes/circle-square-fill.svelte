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
</script>

<svg
  width={radius * 2}
  height={radius * 2}
  viewBox = "0 0 {radius * 2} {radius * 2}"
  overflow="visible"
>
  <defs>
    <clipPath id={name+"-cut-out-circle"}>
      <circle
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
    { "translate("+translateX+" "+translateY+")" }"
  >
  <circle
    stroke={outlineColor}
    fill="transparent"
    stroke-width={stroke}
    r={normalizedRadius}
    cx={radius}
    cy={radius}
    shape-rendering="geometricPrecision"
    style="filter: {outlineDropShadowAmount ? "drop-shadow(0px 0px "+outlineDropShadowAmount+"px "+outlineColor+")": ""}
                   {"contrast("+outlineContrast+"%)"};"
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
    clip-path="url(#{name+"-cut-out-circle"})"
    shape-rendering="geometricPrecision"
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