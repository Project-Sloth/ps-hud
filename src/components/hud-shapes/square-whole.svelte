<script lang="ts">
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';
  import Fa from 'svelte-fa'
  import type { shapePropsType } from "../../types/types"
  import { defaultShapeProps } from "../../types/types"

  export let props: shapePropsType = defaultShapeProps();

  let strokeDashoffset: number = 10;
  let minimalAxis: number = props.width;

  const progressTween = tweened(props.progressValue, {
		duration: 600,
		easing: cubicOut
	});

  $: {
    progressTween.set(props.progressValue)
    minimalAxis = props.width > props.height ? props.height : props.width;
  }

  $: strokeDashoffset = minimalAxis - $progressTween / 100 * minimalAxis;

</script>

<div class="border-3 border-black">
  <svg height={minimalAxis-0} width={minimalAxis-0}>
    <g transform="rotate( {props.rotateDegree} {minimalAxis/2} {minimalAxis/2})">
      <line
        opacity="{props.outlineColorOpacity}"
        stroke="{props.outlineColor}"
        x1="50%"
        y1="100%"
        x2="50%"
        y2="0%"
        stroke-width={minimalAxis}
      />
      <line
        x1="50%"
        y1="100%"
        x2="50%"
        y2="0%"
        stroke={props.progressColor} 
        fill="transparent" 
        stroke-dasharray="{minimalAxis}" 
        stroke-dashoffset="{strokeDashoffset}" 
        stroke-width={minimalAxis}
      />
    </g>
    <Fa icon={props.icon} scale={props.iconScaling} translateX={props.iconTranslateX}
      translateY={props.iconTranslateY} style="color:{props.iconColor}"
    />
  </svg>
</div>