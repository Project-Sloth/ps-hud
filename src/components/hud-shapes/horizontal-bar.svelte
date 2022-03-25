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
  }

  $: strokeDashoffset = props.width - $progressTween / 100 * props.width;

  $: {
    text = props.text;
    if (props.conditionalText) {
      text = props.conditionalText(props.progressValue);
    }
  }

  // <Fa icon={props.icon} scale={props.iconScaling*2} translateX={props.iconTranslateX}
  //         translateY={props.iconTranslateY+0.2} style="color:{props.iconColor}"
  //       />

</script>

<div class="border-4 border-black relative">
  <svg height={props.height-8} width={props.width}>
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
      {#if !text}
        <Fa icon={props.icon} scale={props.iconScaling} translateX={props.iconTranslateX}
          translateY={props.iconTranslateY} style="color:{props.iconColor}"
        />
      {/if}
      <span>{text}</span>
    </g>
  </svg>
  {#if text}
    <div class="absolute top-0 left-0 w-full h-full">
      <div class="flex justify-center items-center h-full text-xl text-white">
        <Fa icon={props.icon} scale={props.iconScaling*2} translateX={props.iconTranslateX}
          translateY={props.iconTranslateY} style="color:{props.iconColor}"/>
        <span class="ml-2">{text}</span>
      </div>
    </div>
  {/if}
</div>