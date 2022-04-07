<script lang="ts">
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';
  import Fa from 'svelte-fa'

  export let conditionalText: (val: number) => string = null;
  export let height: number = 50;
  export let icon: any = null;
  export let iconColor: string = "red";
  export let iconScaling: number = 0.45;
  export let iconTranslateX: number = 0;
  export let iconTranslateY: number = 0;
  export let innerColor: string = "#212121";
  export let innerColorOpacity: number = 0.4;
  export let progressColor: string = "red";
  export let progressValue: number = 100;
  export let rotateDegree: number = 0;
  export let translateX: number = 0;
  export let translateY: number = 0;
  export let width: number = 50;

  let strokeDashoffset: number = 10;
  let text: string = "";

  const progressTween = tweened(progressValue, {
		duration: 600,
		easing: cubicOut
	});

  $: {
    progressTween.set(progressValue)
  }

  $: strokeDashoffset = width - $progressTween / 100 * width;

  $: {
    text = text;
    if (conditionalText) {
      text = conditionalText(progressValue);
    }
  }

  // <Fa icon={icon} scale={iconScaling*2} translateX={iconTranslateX}
  //         translateY={iconTranslateY+0.2} style="color:{iconColor}"
  //       />

</script>

<div class="border-4 border-black relative">
  <svg height={height-8} width={width}>
    <g transform="
      rotate( {rotateDegree} {height/2} {width/4})
      { translateX | translateY ? "translate("+translateX+" "+translateY+")" : ""}"
    >
      <line
        opacity={innerColorOpacity}
        stroke={innerColor}
        x1="0%"
        y1="50%"
        x2="100%"
        y2="50%"
        stroke-width={width}
      />
      <line
        x1="0%"
        y1="50%"
        x2="100%"
        y2="50%"
        stroke={progressColor} 
        fill="transparent" 
        stroke-dasharray={width}
        stroke-dashoffset={strokeDashoffset}
        stroke-width={width}
      />
    </g>
    <g dominant-baseline="middle">
      {#if !text}
        <Fa icon={icon} scale={iconScaling} translateX={iconTranslateX}
          translateY={iconTranslateY} style="color:{iconColor}"
        />
      {/if}
      <span>{text}</span>
    </g>
  </svg>
  {#if text}
    <div class="absolute top-0 left-0 w-full h-full">
      <div class="flex justify-center items-center h-full text-xl text-white">
        <Fa icon={icon} scale={iconScaling*2} translateX={iconTranslateX}
          translateY={iconTranslateY} style="color:{iconColor}"/>
        <span class="ml-2">{text}</span>
      </div>
    </div>
  {/if}
</div>