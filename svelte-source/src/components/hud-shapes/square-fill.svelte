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
  export let borderSize: number = 4;


  let strokeDashoffset: number = 10;
  const progressTween = tweened(progressValue, {
		duration: 600,
		easing: cubicOut
	});
  $: progressTween.set(progressValue);
  $: strokeDashoffset = (height-borderSize) - $progressTween / 100 * (height-borderSize*2);
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
    <path d={`M0 0 h${width} v${height} h-${width}z M${width-borderSize} ${borderSize} 
      h-${width-(borderSize*2)} v${height-(borderSize*2)} h${width-(borderSize*2)}`}
    />
    <line
      stroke={progressColor} 
      x1="50%"
      y1={height-borderSize}
      x2="50%"
      y2={borderSize}
      stroke-dasharray={height-borderSize}
      stroke-dashoffset={strokeDashoffset}
      stroke-width={width - (borderSize*2)}
    />
  </g>
  <g transform="rotate( {-rotateDegree} {height/2} {width/2})"
     style="filter: {iconDropShadowAmount ? "drop-shadow(0px 0px "+iconDropShadowAmount+"px "+iconColor+")": ""}
                    {"contrast("+iconContrast+"%)"};">
    <Fa icon={icon} scale={iconScaling} translateX={iconTranslateX}
    translateY={iconTranslateY} style="color:{iconColor};"/>
  </g>
</svg>