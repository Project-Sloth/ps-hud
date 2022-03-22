<script lang="ts">
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';
  import Fa from 'svelte-fa'
  import type { shapePropsType } from "../../types/types"
  import { defaultShapeProps } from "../../types/types"

  export let props: shapePropsType = defaultShapeProps();
  
  let radius: number = 25;

  const progressTween = tweened(props.progressValue, {
		duration: 600,
		easing: cubicOut
	});
  $: {
    progressTween.set(props.progressValue)
  }

  let normalizedRadius: number = radius - (props.ringSize/2);
  let circumference: number = normalizedRadius * 2 * Math.PI;
  let strokeDashoffset: number = circumference - $progressTween / 100 * circumference;

  $: {
    radius = props.height > props.width ? props.height/2 : props.width/2;
    normalizedRadius = radius - (props.ringSize/2);
    circumference = normalizedRadius * 2 * Math.PI;
    strokeDashoffset = circumference - $progressTween / 100 * circumference;
  }
  
</script>

<svg
  width={radius * 2}
  height={radius * 2}
  viewBox = "0 0 {radius * 2} {radius * 2}"
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
      stroke-width={props.ringSize}
      r={normalizedRadius}
      cx={radius}
      cy={radius}
      transform="rotate(-90, {radius}, {radius})"
    />
    <circle
      fill="{props.innerColor}"
      stroke="transparent"
      stroke-dashoffset={0}
      stroke-dasharray={circumference +' ' + circumference}
      stroke-width={props.ringSize-0.6}
      r={normalizedRadius - (props.ringSize/2) + 0.1}
      cx={radius}
      cy={radius}
      transform="rotate(-90, {radius}, {radius})"
    />
    <circle
      stroke="{props.progressColor}"
      fill="transparent"
      stroke-dashoffset={strokeDashoffset}
      stroke-dasharray={circumference + ' ' + circumference}
      stroke-width={props.ringSize}
      r={normalizedRadius}
      cx={radius}
      cy={radius}
      transform="rotate(-90, {radius}, {radius})"
    />
  </g>
  <Fa icon={props.icon} scale={props.iconScaling} translateX={props.iconTranslateX}
    translateY={props.iconTranslateY} style="color:{props.iconColor}"/>
</svg>