<script lang="ts">
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';
  import Fa from 'svelte-fa'

  export let conditionalText: (val: number) => string = null;
  export let height: number = 50;
  export let icon: any = null;
  export let iconColor: string = "red";
  export let iconContrast: number = 100;
  export let iconDropShadowAmount: number = 0;
  export let iconScaling: number = 0.45;
  export let iconTranslateX: number = 0;
  export let iconTranslateY: number = 0;
  export let name: string = "";
  export let outlineColor: string = "red";
  export let outlineContrast: number = 100;
  export let outlineDropShadowAmount: number = 0;
  export let progressColor: string = "red";
  export let progressContrast: number = 100;
  export let progressDropShadowAmount: number = 0;
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
</script>

<div class="border-4 border-black relative">
  <svg height={height-8} width={width}>
    <g transform="
      rotate( {rotateDegree} {height/2} {width/4})
      { "translate("+translateX+" "+translateY+")" }"
    >
      <line
        stroke={outlineColor}
        x1="0%"
        y1="50%"
        x2="100%"
        y2="50%"
        stroke-width={width}
        style="filter: {outlineDropShadowAmount ? "drop-shadow(0px 0px "+outlineDropShadowAmount+"px "+outlineColor+")": ""}
                       {"contrast("+outlineContrast+"%)"};"
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
        style="filter: {progressDropShadowAmount ? "drop-shadow(0px 0px "+progressDropShadowAmount+"px "+progressColor+")": ""}
                       {"contrast("+progressContrast+"%)"};"
      />
    </g>
    <g dominant-baseline="middle">
      {#if !text}
        <g style="filter: {iconDropShadowAmount ? "drop-shadow(0px 0px "+iconDropShadowAmount+"px "+iconColor+")": ""}
                          {"contrast("+iconContrast+"%)"};">
          <Fa icon={icon} scale={iconScaling} translateX={iconTranslateX}
            translateY={iconTranslateY} style="color:{iconColor}"
          />
        </g>
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