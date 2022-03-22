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

  let normalizedRadius: number = radius;
  let circumference = normalizedRadius * 2 * Math.PI;
  let strokeDashoffset: number = circumference - $progressTween / 100 * circumference;

  $: {
    radius = props.height > props.width ? props.height : props.width;
    normalizedRadius = radius;
    circumference = normalizedRadius * 2 * Math.PI;
    strokeDashoffset = circumference - $progressTween / 100 * circumference;
  }
  
  // filter= "drop-shadow(3px 5px 2px rgb(0 0 0 / 0.4))"
</script>

<div class="border-5 border-black">
  <svg
    width={radius}
    height={radius}
    viewBox = "0 0 {radius*2} {radius*2}"
  >
    <g 
    transform="
      { props.rotateDegree > 0 ? "rotate("+props.rotateDegree+" "+props.width+" "+props.height+")": ""}
      { props.translateX | props.translateY ? "translate("+props.translateX+" "+props.translateY+")" : ""}"
    >
      <circle
        opacity="{props.outlineColorOpacity}"
        stroke="{props.outlineColor}"
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
        stroke="{props.progressColor}"
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
    <Fa icon={props.icon} scale={props.iconScaling} translateX={props.iconTranslateX}
    translateY={props.iconTranslateY} style="color:{props.iconColor}"/>
  </svg>
</div>