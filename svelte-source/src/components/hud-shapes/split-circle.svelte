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
  export let dashes: number = 8;
  export let gap: number = 4;
  export let borderGap: number = 0.80;
  
  let radius: number = 25;

  const progressTween = tweened(progressValue, {
		duration: 600,
		easing: cubicOut
	});
  $: {
    progressTween.set(progressValue)
  }

  let normalizedRadius: number = radius - (ringSize/2);
  let circumference: number = normalizedRadius * 2 * Math.PI;

  let progressbarRadius = normalizedRadius * borderGap;
  let progressbarCircumference = circumference * borderGap;

  let strokeDashoffset: string = "";
  let outlineStrokeDashOffset: string = "";

  $: radius = height > width ? height/2 : width/2;
  $: {
    normalizedRadius = radius - (ringSize/2);
    circumference = normalizedRadius * 2 * Math.PI;
    progressbarRadius = normalizedRadius * borderGap;
    progressbarCircumference = circumference * borderGap;
    strokeDashoffset = generateOffsetprogress($progressTween, dashes, gap);
    outlineStrokeDashOffset = generateOffsetprogress(100, dashes, gap);
  }

  function generateOffsetprogress(currentProgress: number, currentDashes: number, currentGap: number): string {
    let progressCircumference: number = progressbarCircumference - (100 - currentProgress)/100 * progressbarCircumference;
    let currentCircumference: number = 0;
    let dashArray: string = `0 ${Math.floor(currentGap/2)}`;
    let newCircumference: number = progressbarCircumference - currentDashes*currentGap;
    let circumferencePiece: number = newCircumference/currentDashes;

    if (progressCircumference < currentGap) {
      return `0 ${progressbarCircumference}`;
    }

    while (currentCircumference <= progressCircumference) {
      if (currentCircumference + circumferencePiece >= progressCircumference) {
        let partialPiece: number = progressCircumference-currentCircumference;
        if (partialPiece < 0.1) {
          break;
        }
        dashArray+= ` ${partialPiece} ${progressbarCircumference}`;
        return dashArray;
      }
      dashArray += ` ${circumferencePiece} ${currentGap}`;
      currentCircumference += circumferencePiece+currentGap;
    }

    let lastSpace = dashArray.lastIndexOf(' ');
    dashArray = dashArray.substring(0, lastSpace);
    dashArray += " "+(progressbarCircumference);

    return dashArray;
  }

</script>

<svg
  width={radius * 2}
  height={radius * 2}
  viewBox = "0 0 {radius * 2} {radius * 2}"
  overflow="visible"
>
  <g 
    transform="
    { rotateDegree > 0 ? "rotate("+rotateDegree+" "+radius+" "+radius+")": ""}
    { "translate("+translateX+" "+translateY+")" }"
  >
    <circle
      fill={innerColor}
      r={normalizedRadius+3}
      cx={radius}
      cy={radius}
      transform="rotate(-90, {radius}, {radius})"
    />
    <circle
      fill="transparent"
      stroke={outlineColor}
      stroke-dasharray={outlineStrokeDashOffset}
      stroke-width={ringSize}
      r={progressbarRadius}
      cx={radius}
      cy={radius}
      transform="rotate(-90, {radius}, {radius})"
      style="filter: {outlineDropShadowAmount ? "drop-shadow(0px 0px "+outlineDropShadowAmount+"px "+outlineColor+")": ""}
                     {"contrast("+outlineContrast+"%)"};"
    />
    <circle
      stroke={progressColor}
      fill="transparent"
      stroke-dasharray={strokeDashoffset}
      stroke-width={ringSize}
      r={progressbarRadius}
      cx={radius}
      cy={radius}
      transform="rotate(-90, {radius}, {radius})"
      style="filter: {progressDropShadowAmount ? "drop-shadow(0px 0px "+progressDropShadowAmount+"px "+progressColor+")": ""}
                     {"contrast("+progressContrast+"%)"};"
    />
  </g>
  <g style="filter: {iconDropShadowAmount ? "drop-shadow(0px 0px "+iconDropShadowAmount+"px "+iconColor+")": ""}
                    {"contrast("+iconContrast+"%)"};">
    <Fa icon={icon} scale={iconScaling} translateX={iconTranslateX}
    translateY={iconTranslateY} style="color:{iconColor}"/>
  </g>
</svg>