<script lang="ts">
  import Fa from 'svelte-fa'
  export let width: number = 54;
  export let height: number = 54;
  export let stroke: number = 17;
  export let progress: number = 100;
  export let progressColor: string = "stroke-red-500"
  export let innerColor: string = "black"
  export let icon = null;

  // let normalizedRadius: number = radius - stroke * 2;
  // let circumference = normalizedRadius * 2 * Math.PI;
  let perimeter: number = (width + height) * 2;
  let strokeDashoffset: number = 10;

  $: strokeDashoffset = perimeter - progress / 100 * perimeter;
</script>

<div class="flex ml-2">
  <svg width={width} height={height}>
    <rect
      opacity="0.4"
      class="{progressColor}"
      width={width}
      height={height}
      stroke-width={stroke}
      stroke-dasharray={perimeter +' ' + perimeter}
      shape-rendering="geometricPrecision"
      stroke-dashoffset={0}
    />
    <rect
      fill="{innerColor}"
      transform="translate({stroke/2-0.1} {stroke/2-0.3})"
      stroke="transparent"
      shape-rendering="geometricPrecision"
      width={width-stroke+0.2}
      height={height-stroke+0.2}
      stroke-width={stroke}
      stroke-dasharray={perimeter +' ' + perimeter}
      stroke-dashoffset={0}
    />
    <rect
      class="{progressColor}"
      fill="transparent"
      width={width}
      height={height}
      stroke-width={stroke-0.1}
      stroke-dasharray={perimeter +' ' + perimeter}
      stroke-dashoffset={strokeDashoffset}
    />
    <Fa icon={icon} scale={0.5} style="color:white"/>
  </svg>
</div>