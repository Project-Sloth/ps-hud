<script lang="ts">
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';
  import Fa from 'svelte-fa'
  import type { shapePropsType } from "../../types/types"
  import { defaultShapeProps } from "../../types/types"

  export let props: shapePropsType = defaultShapeProps();

  let perimeter: number = (props.width + props.height) * 2;
  let strokeDashoffset: number = 10;

  const progressTween = tweened(props.progressValue, {
		duration: 600,
		easing: cubicOut
	});

  $: {
    progressTween.set(props.progressValue)
  }

  $: strokeDashoffset = perimeter - $progressTween / 100 * perimeter;
</script>

<div class="">
  <svg width={props.width} height={props.height}>
    <g 
      transform="
      { props.rotateDegree > 0 ? "rotate("+props.rotateDegree+" "+props.width/2+" "+props.height/2+")": ""}
      { props.translateX | props.translateY ? "translate("+props.translateX+" "+props.translateY+")" : ""}"
    >
      <rect
        opacity="{props.outlineColorOpacity}"
        stroke="{props.outlineColor}"
        width={props.width}
        height={props.height}
        stroke-width={props.ringSize}
        stroke-dasharray={perimeter +' ' + perimeter}
        shape-rendering="geometricPrecision"
        stroke-dashoffset={0}
      />
      <rect
        fill="{props.innerColor}"
        transform="translate({props.ringSize/2-0.1} {props.ringSize/2-0.3})"
        stroke="transparent"
        shape-rendering="geometricPrecision"
        width={props.width-props.ringSize+0.2}
        height={props.height-props.ringSize+0.2}
        stroke-width={props.ringSize}
        stroke-dasharray={perimeter +' ' + perimeter}
        stroke-dashoffset={0}
      />
      <rect
        stroke="{props.progressColor}"
        fill="transparent"
        width={props.width}
        height={props.height}
        stroke-width={props.ringSize-0.1}
        stroke-dasharray={perimeter +' ' + perimeter}
        stroke-dashoffset={strokeDashoffset}
      />
    </g>
    <Fa icon={props.icon} scale={props.iconScaling} translateX={props.iconTranslateX}
      translateY={props.iconTranslateY} style="color:{props.iconColor}"/>
  </svg>
</div>