<script lang="ts">
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';
  import Fa from 'svelte-fa'

  export let width: number = 50;
  export let height: number = 50;
  export let stroke: number = 15;
  export let progress: number = 100;
  export let progressColor: string = "#3FA554"
  export let innerColor: string = "black"
  export let icon = null;
  export let startPostion: "top-left" | "top-right" | "bottom-right" | "bottom-left" = "top-left";

  let rotateDegree: number = 0;
  let perimeter: number = (width + height) * 2;
  let strokeDashoffset: number = 10;

  const progressTween = tweened(progress, {
		duration: 600,
		easing: cubicOut
	});

  $: {
    switch (startPostion) {
      case "top-left":
        rotateDegree = 0;
        break;
      case "top-right":
        rotateDegree = 90;
        break;
      case "bottom-right":
        rotateDegree = 180;
        break;
      case "bottom-left":
        rotateDegree = 270;
        break;
    }
  }

  $: {
    progressTween.set(progress)
  }

  $: strokeDashoffset = perimeter - $progressTween / 100 * perimeter;
</script>

<div class="mr-1">
  <svg width={width} height={height}>
    <g transform="rotate({rotateDegree} {width/2} {height/2})">
    <rect
      opacity="0.4"
      stroke="{progressColor}"
      width={width}
      height={height}
      stroke-width={stroke}
      stroke-dasharray={perimeter +' ' + perimeter}
      shape-rendering="geometricPrecision"
      stroke-dashoffset={0}
    />
    <rect
      fill="{innerColor}"
      transform="translate({stroke/2-0.1} {stroke/2-0.3})"
      stroke="transparent"
      shape-rendering="geometricPrecision"
      width={width-stroke+0.2}
      height={height-stroke+0.2}
      stroke-width={stroke}
      stroke-dasharray={perimeter +' ' + perimeter}
      stroke-dashoffset={0}
    />
    <rect
      stroke="{progressColor}"
      fill="transparent"
      width={width}
      height={height}
      stroke-width={stroke-0.1}
      stroke-dasharray={perimeter +' ' + perimeter}
      stroke-dashoffset={strokeDashoffset}
    />
    </g>
    <Fa icon={icon} scale={0.4} style="color:white"/>
  </svg>
</div>