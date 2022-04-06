<script lang="ts">
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';
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

  const progressTween = tweened(progressValue, {
		duration: 600,
		easing: cubicOut
	});

  $: progressTween.set(progressValue);
  $: strokeDashoffset = height - $progressTween / 100 * height;

</script>

<div>
  <svg
    height={height}
    width={width}
    transform="
      { rotateDegree > 0 ? "rotate("+rotateDegree+" "+0+" "+0+")": ""}
      { translateX | translateY ? "translate("+translateX+" "+translateY+")" : ""}"
    >
    <g>
      <line
        opacity="{outlineColorOpacity}"
        stroke="{outlineColor}"
        x1="50%"
        y1="100%"
        x2="50%"
        y2="0%"
        stroke-width={width}
      />
      <line
        x1="50%"
        y1="100%"
        x2="50%"
        y2="0%"
        stroke={progressColor} 
        fill="transparent" 
        stroke-dasharray={height}
        stroke-dashoffset={strokeDashoffset}
        stroke-width={width}
      />
      <line
        stroke={innerColor}
        x1="50%"
        y1={height-ringSize}
        x2="50%"
        y2={ringSize}
        stroke-width={width - (ringSize*2)}
      />
    </g>
    <g transform="rotate( {-rotateDegree} {height/2} {width/2})">
      <Fa icon={icon} scale={iconScaling} translateX={iconTranslateX}
      translateY={iconTranslateY} style="color:{iconColor};"/>
    </g>
  </svg>
</div>