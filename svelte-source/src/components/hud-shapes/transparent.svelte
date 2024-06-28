<script lang="ts">
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';
  import Fa from 'svelte-fa'

  export let height: number = 50;
  export let icon: any = null;
  export let iconColor: string = "red";
  export let iconContrast: number = 100;
  export let iconDropShadowAmount: number = 0;
  export let iconScaling: number = 0.45;
  export let iconTranslateX: number = 0;
  export let iconTranslateY: number = 0;
  export let innerColor: string = "#212121";
  export let outlineColor: string = "red";
  export let outlineContrast: number = 100;
  export let outlineDropShadowAmount: number = 0;
  export let progressColor: string = "red";
  export let progressContrast: number = 100;
  export let progressDropShadowAmount: number = 0;
  export let progressValue: number = 100;
  export let rotateDegree: number = 0;
  export let translateX: number = 0;
  export let translateY: number = 0;
  export let width: number = 50;
  export let xAxisRound: number = 5;
  export let yAxisRound: number = 20;
  export let name: string = "";
  export let barHeight: number = 4;
  export let borderSize: number = 4;

  let strokeDashoffset: number = 0;

  const progressTween = tweened(progressValue, {
		duration: 600,
		easing: cubicOut
	});

  $: progressTween.set(progressValue);

  $: {
    progressTween.set(progressValue)
  }

  $: strokeDashoffset = $progressTween / 100 * width;

</script>

<svg
  height={height}
  width={width + (borderSize*2)}
  transform="
  { translateX | translateY ? "translate("+translateX+" "+translateY+")" : ""}"
>
  <rect
    width={width-0.2}
    height={barHeight-0.2}
    fill={outlineColor}
    y={height-barHeight-5}
    x={borderSize}
    rx={xAxisRound}
    ry={yAxisRound}
    style="filter: {outlineDropShadowAmount ? "drop-shadow(0px 0px "+outlineDropShadowAmount+"px "+outlineColor+")": ""}
                    {"contrast("+outlineContrast+"%)"}; overflow: visible;"
  />

  <rect
    width={strokeDashoffset}
    height={barHeight}
    fill={progressColor}
    y={height-barHeight-5}
    x={borderSize}
    rx={xAxisRound}
    ry={yAxisRound}
    style="filter: {progressDropShadowAmount ? "drop-shadow(0px 0px "+progressDropShadowAmount+"px "+progressColor+")": ""}
                    {"contrast("+progressContrast+"%)"};"
  />
  <g style="filter: {iconDropShadowAmount ? "drop-shadow(0px 0px "+iconDropShadowAmount+"px "+iconColor+")": ""}
      {"contrast("+iconContrast+"%)"};">
    <Fa icon={icon} scale={iconScaling} translateX={iconTranslateX}
    translateY={iconTranslateY-0.075} style="color:{iconColor}"/>
  </g>
</svg>