<script lang="ts">
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';
  import Fa from 'svelte-fa';

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

  const progressTween = tweened(progressValue, {
		duration: 600,
		easing: cubicOut
	});

  $: {
    progressTween.set(progressValue)
  }

  $: strokeDashoffset = 16 - $progressTween / 100 * 16;

</script>

<div class="mx-[-7px]">
  <svg version="1.1" width={width} height={height} viewBox="0 0 16 16">
    <defs>
      <clipPath id="{name}-cut-out-diamond">
        <path d="M8.384 1.226a.463.463 0 0 0-.768 0l-4.56 6.468a.537.537 0 0 0 0 .612l4.56 6.469a.463.463 0 0 0 .768 0l4.56-6.469a.537.537 0 0 0 0-.612l-4.56-6.468z"
          fill="transparent"
        />
      </clipPath>
    </defs>
    <g 
      transform="
        { rotateDegree > 0 ? "rotate("+rotateDegree+" "+8+" "+8+")": ""}
        { "translate("+translateX+" "+translateY+")" }"
    >
      <path d="M8.384 1.226a.463.463 0 0 0-.768 0l-4.56 6.468a.537.537 0 0 0 0 .612l4.56 6.469a.463.463 0 0 0 .768 0l4.56-6.469a.537.537 0 0 0 0-.612l-4.56-6.468z"
        fill={outlineColor}
        stroke="transparent"
        style="filter: {outlineDropShadowAmount ? "drop-shadow(0px 0px "+outlineDropShadowAmount+"px "+outlineColor+")": ""}
                       {"contrast("+outlineContrast+"%)"};"
      />
      <line
        x1="50%"
        y1="100%"
        x2="50%"
        y2={0}
        stroke={progressColor}
        stroke-dasharray={16}
        stroke-dashoffset={strokeDashoffset}
        stroke-width={width}
        clip-path="url(#{name}-cut-out-diamond)"
        style="filter: {progressDropShadowAmount ? "drop-shadow(0px 0px "+progressDropShadowAmount+"px "+progressColor+")": ""}
                       {"contrast("+progressContrast+"%)"};"
      />
    </g>
    <g style="filter: {iconDropShadowAmount ? "drop-shadow(0px 0px "+iconDropShadowAmount+"px "+iconColor+")": ""}
                      {"contrast("+iconContrast+"%)"};">
      <Fa icon={icon} scale={iconScaling} translateX={iconTranslateX}
        translateY={iconTranslateY} style="color:{iconColor}"
      />
    </g>
  </svg>
</div>