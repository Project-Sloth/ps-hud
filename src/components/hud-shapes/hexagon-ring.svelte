<script lang="ts">
  import { onMount } from 'svelte';
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';
  import Fa from 'svelte-fa';
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

  $: strokeDashoffset = pathLength - $progressTween / 100 * pathLength;

  let hexagon;
  let pathLength;

  onMount(() => {
    pathLength = hexagon.getTotalLength();
  });


</script>

  <svg width={props.width} height={props.height} viewBox="0 0 15 15" transform="scale(-1,1)">
    <!-- <defs>
      <linearGradient id="gradient-stroke" x1="0%" y1="0%" x2="100%" y2="0%" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="#14d4ff" />
          <stop offset="1" stop-color="#eb0ed8" />
      </linearGradient>
    </defs> -->

    <!-- stroke="black" -->
    <!-- opacity="0.75" -->
    <g 
      transform="
        { props.rotateDegree > 0 ? "rotate("+props.rotateDegree+" "+7.5+" "+7.5+")": ""}
        { props.translateX | props.translateY ? "translate("+props.translateX+" "+props.translateY+")" : ""}"
    >
      <path d="M1.5 4.5V10.5L7.5 14L13.5 10.5V4.5L7.5 1L1.5 4.5Z"
        class="stroke-cap-round"
        stroke="{props.outlineColor}"
        opacity="{props.outlineColorOpacity}"
        fill="{props.innerColor}"
        stroke-width={props.ringSize}
        stroke-dasharray={pathLength +' ' + pathLength}
        stroke-dashoffset={0}
        transform="rotate(90, {7.5}, {7.5})"
      />
      <svg viewBox={props.ringSize == 1 ? "0 -0.75 15 16.5" : "0 -1.5 15 18"}>
        <path d="M1.5 4.5V10.5L7.5 14L13.5 10.5V4.5L7.5 1L1.5 4.5Z"
          fill="{props.innerColor}"
          stroke="transparent"
          stroke-width={props.ringSize}
          stroke-dasharray={pathLength +' ' + pathLength}
          stroke-dashoffset={0}
          transform="rotate(90, {7.5}, {7.5})"
        />
      </svg>

      <!-- stroke="url(#gradient-stroke)" -->
      <path bind:this={hexagon} d="M1.5 4.5V10.5L7.5 14L13.5 10.5V4.5L7.5 1L1.5 4.5Z"
        class="stroke-cap-round"
        stroke="{props.progressColor}"
        fill="transparent"
        stroke-width={props.ringSize}
        stroke-dasharray={pathLength +' ' + pathLength}
        stroke-dashoffset={strokeDashoffset}
        transform="rotate(90, {7.5}, {7.5})"
      />
    </g>
    <Fa icon={props.icon} scale={props.iconScaling} translateX={props.iconTranslateX}
      translateY={props.iconTranslateY} flip={"horizontal"} style="color:{props.iconColor}"/>
  </svg>
