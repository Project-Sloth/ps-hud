<script lang="ts">
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';
  import Fa from 'svelte-fa'
  
  export let displayOutline: boolean = true;
  export let height: number = 50;
  export let icon: any = null;
  export let iconColor: string = "red";
  export let iconContrast: number = 100;
  export let iconDropShadowAmount: number = 0;
  export let iconRotateDegree: number = 0;
  export let iconScaling: number = 0.45;
  export let iconTranslateX: number = 0;
  export let iconTranslateY: number = 0;
  export let innerColor: string = "#212121";
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
  export let borderGap: number = 0.75;

  let strokeDashoffset: number = 10;

  let progressWidth = width*borderGap;
  let progressHeight = height*borderGap;
  let progressPerimeter = (progressWidth + progressHeight) * 2;

  const progressTween = tweened(progressValue, {
		duration: 600,
		easing: cubicOut
	});

  $: progressTween.set(progressValue);

  $: progressWidth = width*borderGap;
  $: progressHeight = height*borderGap;
  $: progressPerimeter = (progressWidth + progressHeight) * 2;
  $: strokeDashoffset = progressPerimeter - $progressTween / 100 * progressPerimeter;
</script>

<svg
  width={width}
  height={height}
  transform="
    { rotateDegree > 0 ? "rotate("+rotateDegree+" "+0+" "+0+")": ""}
    { "translate("+translateX+" "+translateY+")" }"
>
  <g>
    <rect
      fill={innerColor}
      stroke="transparent"
      shape-rendering="geometricPrecision"
      width={width}
      height={height}
      style="filter: {outlineDropShadowAmount ? "drop-shadow(0px 0px "+outlineDropShadowAmount+"px "+outlineColor+")": ""}
                     {"contrast("+outlineContrast+"%)"};"
    />
    <rect
      stroke={outlineColor}
      fill="transparent"
      x={width*((1-borderGap)/2)}
      y={height*((1-borderGap)/2)}
      width={progressWidth}
      height={progressHeight}
      stroke-width={ringSize}
      stroke-dasharray={progressPerimeter +' ' + progressPerimeter}
      stroke-dashoffset={0}
      shape-rendering="geometricPrecision"
    />
    <rect
      stroke={progressColor}
      fill="transparent"
      x={width*((1-borderGap)/2)}
      y={height*((1-borderGap)/2)}
      width={progressWidth}
      height={progressHeight}
      stroke-width={ringSize}
      stroke-dasharray={progressPerimeter +' ' + progressPerimeter}
      stroke-dashoffset={strokeDashoffset}
      style="filter: {progressDropShadowAmount ? "drop-shadow(0px 0px "+progressDropShadowAmount+"px "+progressColor+")": ""}
                     {"contrast("+progressContrast+"%)"};"
    />
  </g>
  <g style="filter: {iconDropShadowAmount ? "drop-shadow(0px 0px "+iconDropShadowAmount+"px "+iconColor+")": ""}
                    {"contrast("+iconContrast+"%)"};"
      transform="{ iconRotateDegree > 0 ? "rotate("+iconRotateDegree+" "+width/2+" "+height/2+")": ""}">
    <Fa icon={icon} scale={iconScaling} translateX={iconTranslateX}
      translateY={iconTranslateY} style="color:{iconColor}"/>
  </g>
</svg>