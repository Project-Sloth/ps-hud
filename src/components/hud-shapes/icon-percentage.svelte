<script lang="ts">
  import { tweened } from 'svelte/motion';
  import { linear  } from 'svelte/easing';
  import Fa from 'svelte-fa';
  import type { shapePropsType } from "../../types/types"
  import { defaultShapeProps } from "../../types/types"

  export let props: shapePropsType = defaultShapeProps();

  const progressTween = tweened(props.progressValue, {
		duration: 1200,
		easing: linear,
	});

  $: {
    progressTween.set(props.progressValue);
  }

  $: if (props.iconColor == "white") props.iconColor = props.progressColor
</script>

<svg width={props.width} height={props.height} viewBox="0 0 {props.width} {props.height}">
  <filter id="glow" width="100%" height="100%" x="0" y="0" filterUnits="userSpaceOnUse">
    <feOffset in="SourceAlpha" result="shadowOffsetOuter1"/>
    <feGaussianBlur in="shadowOffsetOuter1" result="shadowBlurOuter1" stdDeviation="5"/>
    <feColorMatrix in="shadowBlurOuter1" result="shadowMatrixOuter1" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
    <feOffset dy="1" in="SourceAlpha" result="shadowOffsetOuter2"/>
    <feGaussianBlur in="shadowOffsetOuter2" result="shadowBlurOuter2" stdDeviation="7"/>
    <feColorMatrix in="shadowBlurOuter2" result="shadowMatrixOuter2" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.9 0"/>
    <feOffset dy="2" in="SourceAlpha" result="shadowOffsetOuter3"/>
    <feGaussianBlur in="shadowOffsetOuter3" result="shadowBlurOuter3" stdDeviation="10"/>
    <feColorMatrix in="shadowBlurOuter3" result="shadowMatrixOuter3" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0"/>
    <feOffset dx="2" dy="2" in="SourceAlpha" result="shadowOffsetOuter4"/>
    <feGaussianBlur in="shadowOffsetOuter4" result="shadowBlurOuter4" stdDeviation="1"/>
    <feColorMatrix in="shadowBlurOuter4" result="shadowMatrixOuter4" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.69678442 0"/>
    <feOffset dy="2" in="SourceAlpha" result="shadowOffsetOuter5"/>
    <feGaussianBlur in="shadowOffsetOuter5" result="shadowBlurOuter5" stdDeviation="8"/>
    <feColorMatrix in="shadowBlurOuter5" result="shadowMatrixOuter5" values="0 0 0 0 0.314369351 0 0 0 0 0.8883757 0 0 0 0 0.759899616 0 0 0 0.649371603 0"/>
    <feMerge>
      <feMergeNode in="shadowMatrixOuter1"/>
      <feMergeNode in="shadowMatrixOuter2"/>
      <feMergeNode in="shadowMatrixOuter3"/>
      <feMergeNode in="shadowMatrixOuter4"/>
      <feMergeNode in="shadowMatrixOuter5"/>
    </feMerge>
  </filter>
  <g class="glow" style="filter: drop-shadow(0px 0px 6px {props.progressColor}) contrast(300%);">
    <Fa icon={props.icon} scale={props.iconScaling} translateX={props.iconTranslateX}
    translateY={props.iconTranslateY || 0.20} style="color:{props.iconColor || props.progressColor}"/>
  </g>
  <text class="font-semibold" fill="white" x="55%" y="25%" dominant-baseline="middle" text-anchor="middle">
    {Math.round($progressTween)+"%"}
  </text>
</svg>

<style>
  .glow {
    filter: drop-shadow(0px 0px 6px #116466);
  }
</style>