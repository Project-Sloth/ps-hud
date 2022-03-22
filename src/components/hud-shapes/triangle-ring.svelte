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

  let triangle;
  let pathLength;

  onMount(() => {
    pathLength = triangle.getTotalLength();
  });

  $: strokeDashoffset = pathLength - $progressTween / 100 * pathLength;
</script>

<div>
  <svg width={props.width} height={props.height} viewBox="0 0 24 24" transform="scale(-1,1)">
    <g 
      transform="
        { props.rotateDegree > 0 ? "rotate("+props.rotateDegree+" "+props.width/4+" "+props.height/4+")": ""}
        { props.translateX | props.translateY ? "translate("+props.translateX+" "+props.translateY+")" : ""}"
    >
      <path d="M21.87,19.29l-9-15.58a1,1,0,0,0-1.74,0l-9,15.58a1,1,0,0,0,0,1,1,1,0,0,0,.87.5H21a1,1,0,0,0,.87-.9"
        class="stroke-cap-round stroke-join-round"
        stroke="{props.outlineColor}"
        opacity="{props.outlineColorOpacity}"
        fill="{props.innerColor}"
        stroke-width={props.ringSize}
        stroke-dasharray={pathLength +' ' + pathLength}
        stroke-dashoffset={0}
      />
      <svg viewBox="2 {0.4-props.ringSize} 20 {24 + props.ringSize*1.5}">
        <path d="M21.87,19.29l-9-15.58a1,1,0,0,0-1.74,0l-9,15.58a1,1,0,0,0,0,1,1,1,0,0,0,.87.5H21a1,1,0,0,0,.87-.9"
          fill="{props.innerColor}"
          stroke="transparent"
          stroke-width={props.ringSize}
          stroke-dasharray={pathLength +' ' + pathLength}
          stroke-dashoffset={0}
        />
      </svg>
      <path bind:this={triangle}
        d="M21.87,19.29l-9-15.58a1,1,0,0,0-1.74,0l-9,15.58a1,1,0,0,0,0,1,1,1,0,0,0,.87.5H21a1,1,0,0,0,.87-.9"
        class="stroke-cap-round"
        stroke="{props.progressColor}"
        fill="transparent"
        stroke-width={props.ringSize}
        stroke-dasharray={pathLength +' ' + pathLength}
        stroke-dashoffset={strokeDashoffset}
        transform="rotate(-120, {12}, {14.5})"
      />
    </g>
    <Fa icon={props.icon} scale={props.iconScaling} translateX={props.iconTranslateX}
    translateY={props.iconTranslateY || 0.10 } flip={"horizontal"} style="color:{props.iconColor}"/>
  </svg>
</div>
