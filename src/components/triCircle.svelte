<script lang="ts">
  import { onMount } from 'svelte';
  import Fa from 'svelte-fa';

  export let height: number = 65;
  export let width: number = 65;
  export let stroke: number = 3;
  let progress: number = 100;
  export let progressColor: string = "stroke-red-500";
  export let innerColor: string = "black";
  export let icon = null;

  let triangle;
  let triangle2;

  let pathTri1Length;
  let pathTri2Length;


  onMount(() => {
    pathTri1Length = triangle.getTotalLength();
    pathTri2Length = triangle2.getTotalLength();
  });

</script>

<div class="flex ml-1">
  <svg width={width} height={height} viewBox="0 0 100 100">
    <g>
    <path d="M21.87,19.29l-9-15.58a1,1,0,0,0-1.74,0l-9,15.58a1,1,0,0,0,0,1,1,1,0,0,0,.87.5H21a1,1,0,0,0,.87-.9"
      class="{progressColor} stroke-cap-round stroke-join-round"
      opacity="0.4"
      fill="{innerColor}"
      stroke-width={stroke}
      stroke-dasharray={pathTri1Length +' ' + pathTri1Length}
      stroke-dashoffset={0}
    />
    <svg viewBox="3 -3 18 29">
      <path d="M21.87,19.29l-9-15.58a1,1,0,0,0-1.74,0l-9,15.58a1,1,0,0,0,0,1,1,1,0,0,0,.87.5H21a1,1,0,0,0,.87-.9"
        fill="{innerColor}"
        stroke="transparent"
        stroke-width={stroke}
        stroke-dasharray={pathTri1Length +' ' + pathTri1Length}
        stroke-dashoffset={0}
      />
    </svg>
    <path bind:this={triangle} d="M21.87,19.29l-9-15.58a1,1,0,0,0-1.74,0l-9,15.58a1,1,0,0,0,0,1,1,1,0,0,0,.87.5H21a1,1,0,0,0,.87-.9"
      class="{progressColor} stroke-cap-round stroke-join-round"
      fill="transparent"
      stroke-width={stroke}
      stroke-dasharray={pathTri1Length +' ' + pathTri1Length}
      stroke-dashoffset={pathTri1Length - progress / 100 * pathTri1Length}
    />
    </g>
    <Fa icon={icon} scale={0.25} translateY={0.10} flip={"horizontal"} style="color:white"/>
  </svg>
</div>
