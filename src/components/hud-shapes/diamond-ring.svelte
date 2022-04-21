<script lang="ts">
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';
  import { onMount } from 'svelte';
  import Fa from 'svelte-fa';

  export let displayOutline: boolean = true;
  export let height: number = 50;
  export let icon: any = null;
  export let iconColor: string = "red";
  export let iconRotateDegree: number = 0;
  export let iconScaling: number = 0.45;
  export let iconTranslateX: number = 0;
  export let iconTranslateY: number = 0;
  export let innerColor: string = "#212121";
  export let innerColorOpacity: number = 1;
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

  let strokeDashoffset: number = 10;

  const progressTween = tweened(progressValue, {
		duration: 600,
		easing: cubicOut
	});

  $: {
    progressTween.set(progressValue)
  }

  $: strokeDashoffset = pathLength - $progressTween / 100 * pathLength;

  let diamond;
  let pathLength;

  onMount(() => {
    try {
      pathLength = diamond.getTotalLength();
    }catch(err) {
      console.log("Error: QB-Hud: Diamond-Ring-Icon should not be mounting when hiding icons")
    }
  });

</script>

<div class="mx-[-7px]">
  <svg version="1.1" width={width} height={height} viewBox="0 0 16 16" transform="scale(-1,1)">
    <g 
      transform="
        { rotateDegree > 0 ? "rotate("+rotateDegree+" "+8+" "+8+")": ""}
        { translateX | translateY ? "translate("+translateX+" "+translateY+")" : ""}"
    >
      {#if displayOutline}
        <path d="M8.384 1.226a.463.463 0 0 0-.768 0l-4.56 6.468a.537.537 0 0 0 0 .612l4.56 6.469a.463.463 0 0 0 .768 0l4.56-6.469a.537.537 0 0 0 0-.612l-4.56-6.468z"
          fill={innerColor}
          fill-opacity={innerColorOpacity}
          stroke={outlineColor}
          stroke-width={ringSize}
          stroke-dasharray={pathLength +' ' + pathLength}
          stroke-dashoffset={0}
          opacity={outlineColorOpacity}
        />
      {/if}
      <svg viewBox="-1.5 4.5 19 7">
        <path d="M8.384 1.226a.463.463 0 0 0-.768 0l-4.56 6.468a.537.537 0 0 0 0 .612l4.56 6.469a.463.463 0 0 0 .768 0l4.56-6.469a.537.537 0 0 0 0-.612l-4.56-6.468z"
          stroke-width={ringSize-0.3}
          fill={innerColor}
          fill-opacity={innerColorOpacity}
          stroke="transparent"
          stroke-dasharray={pathLength +' ' + pathLength}
          stroke-dashoffset={0}
        />
      </svg>
      <path bind:this={diamond} d="M8.384 1.226a.463.463 0 0 0-.768 0l-4.56 6.468a.537.537 0 0 0 0 .612l4.56 6.469a.463.463 0 0 0 .768 0l4.56-6.469a.537.537 0 0 0 0-.612l-4.56-6.468z"
        class="stroke-cap-round stroke-join-round"
        stroke={progressColor}
        stroke-width={ringSize}
        fill="transparent"
        stroke-dasharray={pathLength +' ' + pathLength}
        stroke-dashoffset={strokeDashoffset}
      />
    </g>
    <Fa icon={icon} scale={iconScaling} translateX={iconTranslateX}
      translateY={iconTranslateY} flip={"horizontal"} style="color:{iconColor}"
    />
  </svg>
</div>