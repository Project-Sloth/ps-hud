<script lang="ts">
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';
  import { onMount } from 'svelte';
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

  let bolt;
  let pathLength;

  onMount(() => {
    pathLength = bolt.getTotalLength();
  });

  $: strokeDashoffset = pathLength - $progressTween / 100 * pathLength;

</script>

<div class="mx-[-7px]">
  <svg version="1.1" width={props.width} height={props.height} viewBox="0 0 16 16" transform="scale(-1,1)">
    <g 
      transform="
        { props.rotateDegree > 0 ? "rotate("+props.rotateDegree+" "+props.width/8+" "+props.height/8+")": ""}
        { props.translateX | props.translateY ? "translate("+props.translateX+" "+props.translateY+")" : ""}"
    >
      <path d="M8.384 1.226a.463.463 0 0 0-.768 0l-4.56 6.468a.537.537 0 0 0 0 .612l4.56 6.469a.463.463 0 0 0 .768 0l4.56-6.469a.537.537 0 0 0 0-.612l-4.56-6.468z"
        fill="{props.innerColor}"  
        stroke="{props.outlineColor}"
        stroke-width={props.ringSize}
        stroke-dasharray={pathLength +' ' + pathLength}
        stroke-dashoffset={0}
        opacity="{props.outlineColorOpacity}"
      />
      <svg viewBox="-1.5 4.5 19 7">
        <path d="M8.384 1.226a.463.463 0 0 0-.768 0l-4.56 6.468a.537.537 0 0 0 0 .612l4.56 6.469a.463.463 0 0 0 .768 0l4.56-6.469a.537.537 0 0 0 0-.612l-4.56-6.468z"
          stroke-width={props.ringSize-0.3}
          fill="{props.innerColor}"
          stroke="transparent"
          stroke-dasharray={pathLength +' ' + pathLength}
          stroke-dashoffset={0}
        />
      </svg>
      <path bind:this={bolt} d="M8.384 1.226a.463.463 0 0 0-.768 0l-4.56 6.468a.537.537 0 0 0 0 .612l4.56 6.469a.463.463 0 0 0 .768 0l4.56-6.469a.537.537 0 0 0 0-.612l-4.56-6.468z"
        class="stroke-cap-round stroke-join-round"
        stroke="{props.progressColor}"
        stroke-width={props.ringSize}
        fill="transparent"
        stroke-dasharray={pathLength +' ' + pathLength}
        stroke-dashoffset={strokeDashoffset}
      />
    </g>
    <Fa icon={props.icon} scale={props.iconScaling} translateX={props.iconTranslateX}
      translateY={props.iconTranslateY} flip={"horizontal"} style="color:{props.iconColor}"
    />
  </svg>
</div>