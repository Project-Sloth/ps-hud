<script lang="ts">
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';
  import Fa from 'svelte-fa'

  export let width: number = 250;
  export let height: number = 50;
  export let stroke: number = 50;
  export let progress: number = 100;
  export let progressColor: string = "#3FA554"
  export let innerColor: string = "black"
  export let icon = null;
  export let startPostion: "top-left" | "top-right" | "bottom-right" | "bottom-left" = "top-left";

  let rotateDegree: number = 0;
  let strokeDashoffset: number = 10;

  const progressTween = tweened(progress, {
		duration: 600,
		easing: cubicOut
	});

  $: {
    switch (startPostion) {
      case "top-left":
        rotateDegree = 0;
        break;
      case "top-right":
        rotateDegree = 90;
        break;
      case "bottom-right":
        rotateDegree = 180;
        break;
      case "bottom-left":
        rotateDegree = 270;
        break;
    }
  }

  $: {
    progressTween.set(progress)
  }

  $: strokeDashoffset = width - $progressTween / 100 * width;

</script>

<div>
  <svg id="line-progress" height={height} width={width} transform="scale(1,1)">
    <g transform="rotate({0} {width/2} {height/2})">
      <line
        opacity="0.4"
        stroke="{progressColor}"
        x1="0"
        y1="50%"
        x2="100%"
        y2="50%"
        stroke-width={width}
      />
      <line
        x1="0"
        y1="50%"
        x2="100%"
        y2="50%"
        stroke={progressColor} 
        fill="transparent" 
        stroke-dasharray="{width}" 
        stroke-dashoffset="{strokeDashoffset}" 
        stroke-width={width}
      />
    </g>
    <Fa icon={icon} scale={0.50} style="color:white" translateX={-1.0} translateY={-0.03}/>
    <text class="font-semibold" fill="white" x="55%" y="50%" dominant-baseline="middle" text-anchor="middle">
      Healthy
    </text>
  </svg>
</div>