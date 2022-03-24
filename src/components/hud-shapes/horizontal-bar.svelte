<script lang="ts">
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';
  import Fa from 'svelte-fa'
  import type { shapePropsType } from "../../types/types"
  import { defaultShapeProps } from "../../types/types"

  export let props: shapePropsType = defaultShapeProps();

  let strokeDashoffset: number = 10;
  let text: string = "";

  const progressTween = tweened(props.progressValue, {
		duration: 600,
		easing: cubicOut
	});

  $: {
    progressTween.set(props.progressValue)
    strokeDashoffset = props.width - $progressTween / 100 * props.width;
    text = props.text;
    if (props.conditionalText) {
      text = props.conditionalText(props.progressValue);
    }
  }

</script>

<div class="border-3 border-black">
  <svg height={props.height} width={props.width}>
    <g transform="rotate( {props.rotateDegree} {props.height/2} {props.width/4})">
      <line
        opacity="{props.outlineColorOpacity}"
        stroke="{props.outlineColor}"
        x1="0%"
        y1="50%"
        x2="100%"
        y2="50%"
        stroke-width={props.width}
      />
      <line
        x1="0%"
        y1="50%"
        x2="100%"
        y2="50%"
        stroke={props.progressColor} 
        fill="transparent" 
        stroke-dasharray="{props.width}" 
        stroke-dashoffset="{strokeDashoffset}" 
        stroke-width={props.width}
      />
    </g>
    <g dominant-baseline="middle">
        <Fa icon={props.icon} scale={props.iconScaling} translateX={props.iconTranslateX}
          translateY={props.iconTranslateY} style="color:{props.iconColor}"
        />
      {#if text}
        <text class="font-semibold" display="inline-block" font-size="large" fill="white" x="52.5%" y="55%" dominant-baseline="middle" text-anchor="middle">
          {text}
        </text>
      {/if}
    </g>
  </svg>
</div>