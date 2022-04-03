<script lang="ts">
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';
  import { onMount } from 'svelte';
  import Fa from 'svelte-fa'

  export let height: number = 50;
  export let icon: any = null;
  export let iconColor: string = "red";
  export let iconScaling: number = 0.45;
  export let iconTranslateX: number = 0;
  export let iconTranslateY: number = 0;
  export let innerColor: string = "#212121";
  export let outlineColor: string = "red";
  export let outlineColorOpacity: number = 0.4;
  export let progressColor: string = "red";
  export let progressValue: number = 100;
  export let ringSize: number = 4;
  export let rotateDegree: number = 0;
  export let translateX: number = 0;
  export let translateY: number = 0;
  export let width: number = 50;
  export let xAxisRound: number = 5;
  export let yAxisRound: number = 20;
  export let name: string = "";

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
    if (height && width) {
      pathLength = square?.getTotalLength() + 5;
    }
  }

  $: strokeDashoffset = pathLength - $progressTween / 100 * pathLength;

</script>

<div class="flex flex-col justify-center ml-2 bg-gray-600 px-1 pb-2 pt-4 rounded-lg bg-opacity-80">
  <Fa class="mb-3" icon={icon} scale={iconScaling} translateX={iconTranslateX}
    translateY={iconTranslateY} style="color:{progressColor}"
  />
  <svg
    height={height}
    width={width}
    transform="
    { rotateDegree > 0 ? "rotate("+rotateDegree+" "+0+" "+0+")": ""}
    { translateX | translateY ? "translate("+translateX+" "+translateY+")" : ""}"
  >
  <defs>
    <linearGradient id="half{name}">
        <stop offset="0%" stop-color={progressColor} />
        <stop offset="{$progressTween}%" stop-color={progressColor} />
        <stop offset="{$progressTween}%" stop-color="darkgrey" />
        <stop offset="100%" stop-color="darkgrey" />
    </linearGradient>            
  </defs>
    <rect
      width={width}
      height={height}
      fill="url(#half{name})"
      rx={xAxisRound}
      ry={yAxisRound}
      bind:this={square}
    />
  </svg>
</div>