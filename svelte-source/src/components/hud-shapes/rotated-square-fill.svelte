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
  export let name: string = "";
  export let progressColor: string = "red";
  export let progressContrast: number = 100;
  export let progressDropShadowAmount: number = 0;
  export let progressValue: number = 100;
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

  $: strokeDashoffset = (height-borderSize*2) - $progressTween / 100 * (height-borderSize*2) + borderSize;
</script>

<svg
  width={width}
  height={height}
  transform="
    { rotateDegree > 0 ? "rotate("+rotateDegree+" "+0+" "+0+")": ""}
    { "translate("+translateX+" "+translateY+")" }"
>
  <defs>
    <clipPath id={`${name}-clipOut`}>
      <path d={`M ${width-borderSize} ${height/2} L ${width/2} ${borderSize} L ${borderSize} ${height/2} L ${width/2} ${height-borderSize}z`}/>
    </clipPath>
  </defs>
  <g>
    <path d={`M ${0} ${height/2} L ${width/2} 0 L ${width} ${height/2} L ${width/2} ${height}z
      M ${width-borderSize} ${height/2} L ${width/2} ${borderSize} L ${borderSize} ${height/2} L ${width/2} ${height-borderSize}z`}/>
    <rect
      transform={`rotate(180 ${height/2} ${width/2})`}
      height={strokeDashoffset}
      fill={progressColor}
      width={width}
      clip-path={`url(#${name}-clipOut)`}
    />
  </g>
  <g style="filter: {iconDropShadowAmount ? "drop-shadow(0px 0px "+iconDropShadowAmount+"px "+iconColor+")": ""}
                    {"contrast("+iconContrast+"%)"};"
      transform="{ iconRotateDegree > 0 ? "rotate("+iconRotateDegree+" "+width/2+" "+height/2+")": ""}">
    <Fa icon={icon} scale={iconScaling} translateX={iconTranslateX}
      translateY={iconTranslateY} style="color:{iconColor}"/>
  </g>
</svg>