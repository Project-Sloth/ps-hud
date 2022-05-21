<script lang="ts">
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';
  import { onMount } from 'svelte';
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
  export let xAxisRound: number = 18;
  export let yAxisRound: number = 18;

  let strokeDashoffset: number = 10;
  let pillRing: any = null;
  let pathLength: number = 0;

  const progressTween = tweened(progressValue, {
		duration: 600,
		easing: cubicOut
	});

  onMount(() => {
    try {
      pathLength = pillRing.getTotalLength();
    }catch(err) {
      console.log("Error: PS-Hud: Pill-Ring-Icon should not be mounting when hiding icons")
    }
  });

  $: progressTween.set(progressValue);

  $: {
    // Need this pointless if statment to refresh pathLength as these settings are getting changed
    if (height && width && xAxisRound >= 0 && yAxisRound >= 0) {
      pathLength = pillRing?.getTotalLength()+5;
    }
  }

  $: strokeDashoffset = pathLength - $progressTween / 100 * pathLength;

</script>

<svg
  height={height}
  width={width}
  transform="
  { rotateDegree > 0 ? "rotate("+rotateDegree+" "+0+" "+0+")": ""}
  { "translate("+translateX+" "+translateY+")" }"
>
  <rect
    fill={innerColor}
    width={width-10-(ringSize/2)}
    height={height-10-(ringSize/2)}
    stroke-dasharray={pathLength + " " + pathLength}
    stroke-dashoffset={0}
    stroke-width={ringSize}
    rx={xAxisRound}
    ry={yAxisRound}
    x={5+(ringSize/4)} y={5+(ringSize/4)}
  />
  {#if displayOutline}
    <rect
      fill="transparent"
      stroke={outlineColor}
      width={width-10}
      height={height-10}
      stroke-dasharray={pathLength + " " + pathLength}
      stroke-dashoffset={0}
      stroke-width={ringSize}
      rx={xAxisRound}
      ry={yAxisRound}
      x="5" y="5"
      style="filter: {outlineDropShadowAmount ? "drop-shadow(0px 0px "+outlineDropShadowAmount+"px "+outlineColor+")": ""}
                     {"contrast("+outlineContrast+"%)"};"
    />
  {/if}
  <rect
    fill="transparent"
    stroke={progressColor}
    width={width-10}
    height={height-10}
    stroke-dasharray={pathLength + " " + pathLength}
    stroke-dashoffset={strokeDashoffset}
    stroke-width={ringSize}
    rx={xAxisRound}
    ry={yAxisRound}
    x="5" y="5"
    bind:this={pillRing}
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