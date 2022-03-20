<script lang="ts">
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';
  import Fa from 'svelte-fa'

  export let radius: number = 25;
  export let stroke: number = 25;
  export let progress: number = 100;
  export let progressColor: string = "#3FA554";
  export let icon = null;

  const progressTween = tweened(progress, {
		duration: 600,
		easing: cubicOut
	});

  $: {
    progressTween.set(progress)
  }

  let normalizedRadius: number = radius - (stroke/2);
  let circumference = normalizedRadius * 2 * Math.PI;
  let strokeDashoffset: number = circumference - $progressTween / 100 * circumference;

  $: strokeDashoffset = circumference - $progressTween / 100 * circumference;
  
</script>

<svg
  width={radius*2 }
  height={radius*2 }
  viewBox = "0 0 {radius*2} {radius*2}"
>
  <circle
    opacity="0.4"
    stroke="grey"
    stroke-dashoffset={0}
    stroke-dasharray={circumference + ' ' + circumference}
    stroke-width={stroke}
    r={normalizedRadius}
    cx={radius}
    cy={radius}
    transform="rotate(-90, {radius}, {radius})"
  />
  <circle
    stroke="{progressColor}"
    fill="transparent"
    opacity="1"
    stroke-dashoffset={strokeDashoffset}
    stroke-dasharray={circumference + ' ' + circumference}
    stroke-width={stroke}
    r={normalizedRadius}
    cx={radius}
    cy={radius}
    transform="rotate(-90, {radius}, {radius})"
  />
    <Fa icon={icon} scale={0.50} style="color:black;"/>
</svg>