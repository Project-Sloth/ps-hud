<script lang="ts">
  import { onMount } from 'svelte';
  import Fa from 'svelte-fa';

  export let height: number = 65;
  export let width: number = 65;
  export let stroke: number = 3;
  export let progress: number = 0;
  export let progressColor: string = "stroke-red-500";
  export let innerColor: string = "black";
  export let icon = null;

  let triangle;
  let pathLength;

  onMount(() => {
    pathLength = triangle.getTotalLength();
  });

</script>

<div class="flex ml-1">
  <svg width={width} height={height} viewBox="0 0 24 24">
    <path d="M11.574 3.712c.195-.323.662-.323.857 0l9.37 15.545c.2.333-.039.757-.429.757l-18.668-.006c-.385 
      0-.629-.422-.428-.758l9.298-15.538zm.429-2.483c-.76 0-1.521.37-1.966"
      class="{progressColor}"
      opacity="0.4"
      fill="{innerColor}"
      stroke-width={stroke}
      stroke-dasharray={pathLength +' ' + pathLength}
      stroke-dashoffset={0}
    />
    <svg viewBox="2 -4 20 31">
      <path d="M11.574 3.712c.195-.323.662-.323.857 0l9.37 15.545c.2.333-.039.757-.429.757l-18.668-.006c-.385 
        0-.629-.422-.428-.758l9.298-15.538zm.429-2.483c-.76 0-1.521.37-1.966"
        fill="{innerColor}"
        stroke="transparent"
        stroke-width={stroke}
        stroke-dasharray={pathLength +' ' + pathLength}
        stroke-dashoffset={0}
      />
    </svg>
    <path bind:this={triangle} d="M11.574 3.712c.195-.323.662-.323.857 0l9.37 15.545c.2.333-.039.757-.429.757l-18.668-.006c-.385 
      0-.629-.422-.428-.758l9.298-15.538zm.429-2.483c-.76 0-1.521.37-1.966"
      class="{progressColor} stroke-cap-round stroke-join-round"
      fill="transparent"
      stroke-width={stroke}
      stroke-dasharray={pathLength +' ' + pathLength}
      stroke-dashoffset={pathLength - progress / 100 * pathLength}
    />
    <Fa icon={icon} scale={0.25} translateY={0.10} style="color:white"/>
  </svg>
</div>
