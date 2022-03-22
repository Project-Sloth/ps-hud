<script lang="ts">
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';
  import Fa from 'svelte-fa'
  import type { shapePropsType } from "../../types/types"
  import { defaultShapeProps } from "../../types/types"

  export let props: shapePropsType = defaultShapeProps();

  let strokeDashoffset: number = 10;

  const progressTween = tweened(props.progressValue, {
		duration: 600,
		easing: cubicOut
	});

  $: {
    progressTween.set(props.progressValue)
  }

  $: strokeDashoffset = props.width - $progressTween / 100 * props.width;

</script>

<div class="border-3 border-black">
  <svg id="line-progress" height={props.height} width={props.width}>
    <g transform="rotate({props.rotateDegree} {props.width/2} {props.height/2})">
      <line
        opacity="{props.outlineColorOpacity}"
        stroke="{props.outlineColor}"
        x1="50%"
        y1="100%"
        x2="50%"
        y2="0%"
        stroke-width={props.width}
      />
      <line
        x1="50%"
        y1="100%"
        x2="50%"
        y2="0%"
        stroke={props.progressColor} 
        fill="transparent" 
        stroke-dasharray="{props.width}" 
        stroke-dashoffset="{strokeDashoffset}" 
        stroke-width={props.width}
      />
    </g>
    <Fa icon={props.icon} scale={props.iconScaling} translateX={props.iconTranslateX}
      translateY={props.iconTranslateY} style="color:{props.iconColor}"
    />
  </svg>
</div>