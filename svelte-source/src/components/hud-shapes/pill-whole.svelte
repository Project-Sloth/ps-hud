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
  export let name: string = "";
  export let outlineColor: string = "red";
  export let outlineContrast: number = 100;
  export let outlineDropShadowAmount: number = 0;
  export let progressColor: string = "red";
  export let progressContrast: number = 100;
  export let progressDropShadowAmount: number = 0;
  export let progressValue: number = 100;
  export let ringSize: number = 4;
  export let rotateDegree: number = 0;
  export let translateX: number = 0;
  export let translateY: number = 0;
  export let width: number = 50;
  export let xAxisRound: number = 18;
  export let yAxisRound: number = 18;

  let strokeDashoffset: number = 10;
  let maximumAxis: number = height;

  const progressTween = tweened(progressValue, {
		duration: 600,
		easing: cubicOut
	});

  $: progressTween.set(progressValue);
  $: maximumAxis = height > width ? height : width;

  $: strokeDashoffset = height - $progressTween / 100 * height;

</script>

<svg
  height={height}
  width={width}
  transform="
  { rotateDegree > 0 ? "rotate("+rotateDegree+" "+0+" "+0+")": ""}
  { "translate("+translateX+" "+translateY+")" }"
>
<defs>
  <clipPath id="{name}-cut-out-pillwhole">
    <rect
      stroke={progressColor}
      width={width}
      height={height}
      rx={xAxisRound}
      ry={yAxisRound}
    />
  </clipPath>
</defs>
  <rect
    fill={outlineColor}
    width={width}
    height={height}
    stroke="transparent"
    stroke-width={height}
    rx={xAxisRound}
    ry={yAxisRound}
    style="filter: {outlineDropShadowAmount ? "drop-shadow(0px 0px "+outlineDropShadowAmount+"px "+outlineColor+")": ""}
                   {"contrast("+outlineContrast+"%)"};"
  />
  <line
    x1="50%"
    y1="100%"
    x2="50%"
    y2="0%"
    stroke={progressColor} 
    stroke-dasharray={height}
    stroke-dashoffset={strokeDashoffset}
    stroke-width={maximumAxis}
    clip-path="url(#{name}-cut-out-pillwhole)"
    style="filter: {progressDropShadowAmount ? "drop-shadow(0px 0px "+progressDropShadowAmount+"px "+progressColor+")": ""}
                   {"contrast("+progressContrast+"%)"};"
  />
  <g style="filter: {iconDropShadowAmount ? "drop-shadow(0px 0px "+iconDropShadowAmount+"px "+iconColor+")": ""}
                    {"contrast("+iconContrast+"%)"};">
    <Fa icon={icon} scale={iconScaling} translateX={iconTranslateX}
      translateY={iconTranslateY} style="color:{iconColor}"
    />
  </g>
</svg>
