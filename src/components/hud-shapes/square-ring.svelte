<script lang="ts">
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';
  import Fa from 'svelte-fa'

  export let width: number = 50;
  export let height: number = 50;
  export let ringSize: number = 15;
  export let progressValue: number = 100;
  export let progressColor: string = "#3FA554"
  export let innerColor: string = "black"
  export let rotateDegree: number = 0;
  export let translateX: number = 0;
  export let translateY: number = 0;
  export let icon = null;
  export let iconScaling: number = 0.4;
  export let iconColor: string = "white";
  export let iconTranslateX: number = 0;
  export let iconTranslateY: number = 0;

  let perimeter: number = (width + height) * 2;
  let strokeDashoffset: number = 10;

  const progressTween = tweened(progressValue, {
		duration: 600,
		easing: cubicOut
	});

  $: {
    progressTween.set(progressValue)
  }

  $: strokeDashoffset = perimeter - $progressTween / 100 * perimeter;
</script>

<div class="">
  <svg width={width} height={height}>
    <g 
      transform="
      { rotateDegree > 0 ? "rotate("+rotateDegree+" "+width/2+" "+height/2+")": ""}
      { translateX | translateY ? "translate("+translateX+" "+translateY+")" : ""}"
    >
      <rect
        opacity="0.4"
        stroke="{progressColor}"
        width={width}
        height={height}
        stroke-width={ringSize}
        stroke-dasharray={perimeter +' ' + perimeter}
        shape-rendering="geometricPrecision"
        stroke-dashoffset={0}
      />
      <rect
        fill="{innerColor}"
        transform="translate({ringSize/2-0.1} {ringSize/2-0.3})"
        stroke="transparent"
        shape-rendering="geometricPrecision"
        width={width-ringSize+0.2}
        height={height-ringSize+0.2}
        stroke-width={ringSize}
        stroke-dasharray={perimeter +' ' + perimeter}
        stroke-dashoffset={0}
      />
      <rect
        stroke="{progressColor}"
        fill="transparent"
        width={width}
        height={height}
        stroke-width={ringSize-0.1}
        stroke-dasharray={perimeter +' ' + perimeter}
        stroke-dashoffset={strokeDashoffset}
      />
    </g>
    <Fa icon={icon} scale={iconScaling} translateX={iconTranslateX} translateY={iconTranslateY} style="color:{iconColor}"/>
  </svg>
</div>