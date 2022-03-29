<script lang="ts">
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';
  import Fa from 'svelte-fa'
  import type { shapePropsType } from "../../types/types"
  import { defaultShapeProps } from "../../types/types"

  export let props: shapePropsType = defaultShapeProps();

  let radius: number = 25;
  let stroke: number = 25;
  let normalizedRadius: number = radius - (stroke/2);
  let circumference = normalizedRadius * 2 * Math.PI;
  let strokeDashoffset: number = 0;
  
  const progressTween = tweened(props.progressValue, {
    duration: 600,
    easing: cubicOut
  });

  $: {
    progressTween.set(props.progressValue)
  }

  $: {
    radius = props.height > props.width ? props.height/2 : props.width/2;
    stroke = radius;
    normalizedRadius = radius - (stroke/2);
    circumference = normalizedRadius * 2 * Math.PI;
    strokeDashoffset = circumference - $progressTween / 100 * circumference;
  }

  // filter= "drop-shadow(3px 5px 2px rgb(0 0 0 / 0.4))"
</script>

<svg
  width={radius*2 }
  height={radius*2 }
  viewBox = "0 0 {radius*2} {radius*2}"
>
  <g 
    transform="
    { props.rotateDegree > 0 ? "rotate("+props.rotateDegree+" "+props.width/2+" "+props.height/2+")": ""}
    { props.translateX | props.translateY ? "translate("+props.translateX+" "+props.translateY+")" : ""}"
  >
    <circle
      opacity="{props.outlineColorOpacity}"
      stroke="{props.outlineColor}"
      stroke-dashoffset={0}
      stroke-dasharray={circumference + ' ' + circumference}
      stroke-width={stroke}
      r={normalizedRadius}
      cx={radius}
      cy={radius}
      transform="rotate(-90, {radius}, {radius})"
    />
    <circle
      stroke="{props.progressColor}"
      fill="transparent"
      stroke-dashoffset={strokeDashoffset}
      stroke-dasharray={circumference + ' ' + circumference}
      stroke-width={stroke}
      r={normalizedRadius}
      cx={radius}
      cy={radius}
      transform="rotate(-90, {radius}, {radius})"
    />
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
    <Fa icon={props.icon} scale={props.iconScaling} translateX={props.iconTranslateX}
    translateY={props.iconTranslateY} style="color:{props.iconColor || props.progressColor}"/>
  </g>
</svg>