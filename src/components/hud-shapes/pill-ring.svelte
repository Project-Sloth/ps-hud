<script lang="ts">
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';
  import { onMount } from 'svelte';
  import Fa from 'svelte-fa'

  export let displayOutline: boolean = true;
  export let height: number = 50;
  export let icon: any = null;
  export let iconColor: string = "red";
  export let iconRotateDegree: number = 0;
  export let iconScaling: number = 0.45;
  export let iconTranslateX: number = 0;
  export let iconTranslateY: number = 0;
  export let innerColor: string = "#212121";
  export let innerColorOpacity: number = 0.4;
  export let name: string = "";
  export let outlineColor: string = "red";
  export let outlineColorOpacity: number = 0.4;
  export let progressColor: string = "red";
  export let progressValue: number = 100;
  export let ringSize: number = 4;
  export let rotateDegree: number = 0;
  export let translateX: number = 0;
  export let translateY: number = 0;
  export let width: number = 50;
  export let xAxisRound: number = 18;
  export let yAxisRound: number = 18;

  let strokeDashoffset: number = 10;
  let square: any = null;
  let pathLength: number = 0;

  const progressTween = tweened(progressValue, {
		duration: 600,
		easing: cubicOut
	});

  onMount(() => {
    pathLength = square.getTotalLength();
  });

  $: progressTween.set(progressValue);

  $: {
    // Need this pointless if statment to refresh pathLength as these settings are getting changed
    if (height && width && xAxisRound >= 0 && yAxisRound >= 0) {
      pathLength = square?.getTotalLength()+5;
    }
  }

  $: strokeDashoffset = pathLength - $progressTween / 100 * pathLength;

</script>

<svg
  height={height}
  width={width}
  transform="
  { rotateDegree > 0 ? "rotate("+rotateDegree+" "+0+" "+0+")": ""}
  { translateX | translateY ? "translate("+translateX+" "+translateY+")" : ""}"
>
  <rect
    stroke={progressColor}
    width={width-10}
    height={height-10}
    stroke-dasharray={pathLength + " " + pathLength}
    stroke-dashoffset={strokeDashoffset}
    stroke-width={ringSize}
    rx={xAxisRound}
    ry={yAxisRound}
    x="5" y="5"
    bind:this={square}
  />
  <Fa icon={icon} scale={iconScaling} translateX={iconTranslateX}
    translateY={iconTranslateY} style="color:{iconColor}"
  />
</svg>