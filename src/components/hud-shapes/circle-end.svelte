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

<div class="">
  <svg height={height} width={width}>
    <rect
      stroke={progressColor}
      width={width-10}
      height={height-10}
      stroke-dasharray={pathLength + " " + pathLength}
      stroke-dashoffset={strokeDashoffset}
      stroke-width={ringSize}
      rx={20}
      ry={10}
      x="5" y="5"
      bind:this={square}
    />
    <Fa icon={icon} scale={iconScaling} translateX={iconTranslateX}
      translateY={iconTranslateY} style="color:{iconColor}"
    />
  </svg>
</div>