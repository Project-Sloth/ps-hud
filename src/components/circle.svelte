<script lang="ts">
  import Fa from 'svelte-fa'
  export let radius: number = 38;
  export let stroke: number = 8;
  export let progress: number = 100;
  export let progressColor: string = "stroke-red-500";
  export let innerColor: string = "black";
  export let icon = null;
  //#212121

  let normalizedRadius: number = radius - stroke * 2;
  let circumference = normalizedRadius * 2 * Math.PI;
  let strokeDashoffset: number = circumference - progress / 100 * circumference;
  console.log("Nmm", normalizedRadius)

  $: strokeDashoffset = circumference - progress / 100 * circumference;
</script>

<div class="mx-[-8px]">
  <svg
    width={radius * 2}
    height={radius * 2}
    style="fill-opacity: 1 !important;"
  >
    <circle
      opacity="0.4"
      class="{progressColor}"
      fill="{innerColor}"
      stroke-dashoffset={0}
      stroke-dasharray={circumference +' ' + circumference}
      stroke-width={stroke}
      r={normalizedRadius}
      cx={radius}
      cy={radius}
      transform="rotate(-90, {radius}, {radius})"
    />
    <circle
      fill="{innerColor}"
      stroke="transparent"
      stroke-dashoffset={0}
      stroke-dasharray={circumference +' ' + circumference}
      stroke-width={stroke-0.6}
      r={normalizedRadius - (stroke/2) + 0.1}
      cx={radius}
      cy={radius}
      transform="rotate(-90, {radius}, {radius})"
    />
    <circle
      class="{progressColor}"
      fill="transparent"
      stroke-dashoffset={strokeDashoffset}
      stroke-dasharray={circumference +' ' + circumference}
      stroke-width={stroke}
      r={normalizedRadius}
      cx={radius}
      cy={radius}
      transform="rotate(-90, {radius}, {radius})"
    />
    <Fa icon={icon} scale={0.28} style="color:white"/>
  </svg>
</div>