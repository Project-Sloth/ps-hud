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
</script>

<svg width={props.width} height={props.height} viewBox="0 0 {props.width} {props.height}">
  <Fa icon={props.icon} scale={props.iconScaling} translateX={props.iconTranslateX}
    translateY={props.iconTranslateY || 0.20} style="color:{props.iconColor || props.progressColor}"
  />
  <text class="font-semibold" fill="white" x="55%" y="25%" dominant-baseline="middle" text-anchor="middle">
    {Math.round($progressTween)+"%"}
  </text>
</svg>