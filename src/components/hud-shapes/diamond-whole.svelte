<script lang="ts">
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';
  import Fa from 'svelte-fa';

  export let height: number = 50;
  export let icon: any = null;
  export let iconColor: string = "red";
  export let iconScaling: number = 0.45;
  export let iconTranslateX: number = 0;
  export let iconTranslateY: number = 0;
  export let innerColor: string = "#212121";
  export let innerColorOpacity: number = 1;
  export let progressColor: string = "red";
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
      <clipPath id="cut-out">
        <path d="M8.384 1.226a.463.463 0 0 0-.768 0l-4.56 6.468a.537.537 0 0 0 0 .612l4.56 6.469a.463.463 0 0 0 .768 0l4.56-6.469a.537.537 0 0 0 0-.612l-4.56-6.468z"
          fill="transparent"
        />
      </clipPath>
    </defs>
    <g 
      transform="
        { rotateDegree > 0 ? "rotate("+rotateDegree+" "+8+" "+8+")": ""}
        { translateX | translateY ? "translate("+translateX+" "+translateY+")" : ""}"
    >
      <path d="M8.384 1.226a.463.463 0 0 0-.768 0l-4.56 6.468a.537.537 0 0 0 0 .612l4.56 6.469a.463.463 0 0 0 .768 0l4.56-6.469a.537.537 0 0 0 0-.612l-4.56-6.468z"
        fill={innerColor}
        fill-opacity={innerColorOpacity}
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
        clip-path="url(#cut-out)"
      />
    </g>
    <Fa icon={icon} scale={iconScaling} translateX={iconTranslateX}
      translateY={iconTranslateY} style="color:{iconColor}"
    />
  </svg>
</div>