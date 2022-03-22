<script lang="ts">
  import { onMount } from 'svelte';
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';
  import Fa from 'svelte-fa';
  import type { shapePropsType } from "../../types/types"
  import { defaultShapeProps } from "../../types/types"

  export let props: shapePropsType = defaultShapeProps();

  const progressTween = tweened(props.progressValue, {
		duration: 600,
		easing: cubicOut
	});

  $: {
    progressTween.set(props.progressValue)
  }

  let star;
  let pathLength;

  onMount(() => {
    pathLength = star.getTotalLength();
  });

  $: strokeDashoffset = pathLength - $progressTween / 100 * pathLength;
</script>

<svg
  width={props.width}
  height={props.height}
  viewBox="0 0 38 40"
  transform="scale(-1,1)"
>
  <g 
  transform="
    { props.rotateDegree > 0 ? "rotate("+props.rotateDegree+" "+props.width/2+" "+props.height/2+")": ""}
    { props.translateX | props.translateY ? "translate("+props.translateX+" "+props.translateY+")" : ""}"
  >
    <path d="M36.042,13.909c-0.123-0.377-0.456-0.646-0.85-0.688l-11.549-1.172L18.96,1.43c-0.16-0.36-0.519-0.596-0.915-0.596
      s-0.755,0.234-0.915,0.598L12.446,12.05L0.899,13.221c-0.394,0.04-0.728,0.312-0.85,0.688c-0.123,0.377-0.011,0.791,0.285,1.055
      l8.652,7.738L6.533,34.045c-0.083,0.387,0.069,0.787,0.39,1.02c0.175,0.127,0.381,0.191,0.588,0.191
      c0.173,0,0.347-0.045,0.503-0.137l10.032-5.84l10.03,5.84c0.342,0.197,0.77,0.178,1.091-0.059c0.32-0.229,0.474-0.633,0.391-1.02
      l-2.453-11.344l8.653-7.737C36.052,14.699,36.165,14.285,36.042,13.909z"
      stroke="{props.outlineColor}"
      opacity="{props.outlineColorOpacity}"
      fill="{props.innerColor}"
      stroke-width={props.ringSize-0.6}
      stroke-dasharray={pathLength +' ' + pathLength}
      stroke-dashoffset={0}
      transform="rotate(-72, {20}, {20})"
    />
    <svg viewBox="{1-props.ringSize} {5.5-props.ringSize} {36 + props.ringSize*2} {29 + props.ringSize*2}">
      <path d="M36.042,13.909c-0.123-0.377-0.456-0.646-0.85-0.688l-11.549-1.172L18.96,1.43c-0.16-0.36-0.519-0.596-0.915-0.596
        s-0.755,0.234-0.915,0.598L12.446,12.05L0.899,13.221c-0.394,0.04-0.728,0.312-0.85,0.688c-0.123,0.377-0.011,0.791,0.285,1.055
        l8.652,7.738L6.533,34.045c-0.083,0.387,0.069,0.787,0.39,1.02c0.175,0.127,0.381,0.191,0.588,0.191
        c0.173,0,0.347-0.045,0.503-0.137l10.032-5.84l10.03,5.84c0.342,0.197,0.77,0.178,1.091-0.059c0.32-0.229,0.474-0.633,0.391-1.02
        l-2.453-11.344l8.653-7.737C36.052,14.699,36.165,14.285,36.042,13.909z"
        stroke-width={props.ringSize}
        fill="{props.innerColor}"
        stroke="transparent"
        stroke-dasharray={pathLength +' ' + pathLength}
        stroke-dashoffset={0}
        transform="rotate(-72, {20}, {20})"
      />
    </svg>
    <path bind:this={star} d="M36.042,13.909c-0.123-0.377-0.456-0.646-0.85-0.688l-11.549-1.172L18.96,1.43c-0.16-0.36-0.519-0.596-0.915-0.596
      s-0.755,0.234-0.915,0.598L12.446,12.05L0.899,13.221c-0.394,0.04-0.728,0.312-0.85,0.688c-0.123,0.377-0.011,0.791,0.285,1.055
      l8.652,7.738L6.533,34.045c-0.083,0.387,0.069,0.787,0.39,1.02c0.175,0.127,0.381,0.191,0.588,0.191
      c0.173,0,0.347-0.045,0.503-0.137l10.032-5.84l10.03,5.84c0.342,0.197,0.77,0.178,1.091-0.059c0.32-0.229,0.474-0.633,0.391-1.02
      l-2.453-11.344l8.653-7.737C36.052,14.699,36.165,14.285,36.042,13.909z"
      class="stroke-cap-round"
      stroke="{props.progressColor}"
      stroke-width={props.ringSize}
      fill="transparent"
      stroke-dasharray={pathLength +' ' + pathLength}
      stroke-dashoffset={strokeDashoffset}
      transform="rotate(-72, {20}, {20})"
    />
  </g>
  <Fa icon={props.icon} scale={props.iconScaling} translateX={props.iconTranslateX}
    translateY={props.iconTranslateY || 0.07} flip={"horizontal"} style="color:{props.iconColor}"/>
</svg>