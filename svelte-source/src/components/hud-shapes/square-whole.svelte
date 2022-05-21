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

  let strokeDashoffset: number = 10;

  const progressTween = tweened(progressValue, {
		duration: 600,
		easing: cubicOut
	});

  $: progressTween.set(progressValue);
  $: strokeDashoffset = height - $progressTween / 100 * height;

</script>

<svg
  height={height}
  width={width}
  overflow="visible"
  transform="
    { rotateDegree > 0 ? "rotate("+rotateDegree+" "+0+" "+0+")": ""}
    { "translate("+translateX+" "+translateY+")" }"
  >
  <g>
    <line
      stroke={outlineColor}
      x1="50%"
      y1="100%"
      x2="50%"
      y2="0%"
      stroke-width={width}
      style="filter: {outlineDropShadowAmount ? "drop-shadow(0px 0px "+outlineDropShadowAmount+"px "+outlineColor+")": ""}
                     {"contrast("+outlineContrast+"%)"};"
    />
    <line
      x1="50%"
      y1="100%"
      x2="50%"
      y2="0%"
      stroke={progressColor} 
      fill="transparent" 
      stroke-dasharray={height}
      stroke-dashoffset={strokeDashoffset}
      stroke-width={width}
      style="filter: {progressDropShadowAmount ? "drop-shadow(0px 0px "+progressDropShadowAmount+"px "+progressColor+")": ""}
                     {"contrast("+progressContrast+"%)"};"
    />
    <line
      stroke={innerColor}
      x1="50%"
      y1={height-ringSize}
      x2="50%"
      y2={ringSize}
      stroke-width={width - (ringSize*2)}
    />
  </g>
  <g transform="rotate( {-rotateDegree} {height/2} {width/2})"
     style="filter: {iconDropShadowAmount ? "drop-shadow(0px 0px "+iconDropShadowAmount+"px "+iconColor+")": ""}
                    {"contrast("+iconContrast+"%)"};">
    <Fa icon={icon} scale={iconScaling} translateX={iconTranslateX}
    translateY={iconTranslateY} style="color:{iconColor};"/>
  </g>
</svg>