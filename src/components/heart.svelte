<script lang="ts">
  import { onMount } from 'svelte';
  import Fa from 'svelte-fa';

  export let height: number = 65;
  export let width: number = 65;
  export let stroke: number = 2.7;
  export let progress: number = 16;
  export let progressColor: string = "stroke-red-500";
  export let innerColor: string = "black";
  export let icon = null;

  let heart;
  let pathLength;

  onMount(() => {
    pathLength = heart.getTotalLength();
  });
</script>

<div class="flex ml-1">
  <svg width={height} height={width} viewBox="0 0 24 24">
    <path d="M2 8.60555C2 5.50969 4.50969 3 7.60555 3C8.71223 3 9.79414 3.32758 10.715 
      3.94145L12 4.79815L13.285 3.94145C14.2059 3.32758 15.2878 3 16.3944 3C19.4903 3 22 5.50969 22 8.60555V9.34382C22 11.3098 21.219 
      13.1952 19.8289 14.5853L14.1213 20.2929C12.9497 21.4645 11.0503 21.4645 9.87868 20.2929L4.1711 14.5853C2.78097 13.1952 2 11.3098 2 
      9.34382V8.60555ZM7.60555"
      class="{progressColor}"
      opacity="0.4"
      fill="{innerColor}"
      stroke-width={stroke}
      stroke-dasharray={pathLength +' ' + pathLength}
      stroke-dashoffset={0}
    />
    <svg viewBox="0 -1.5 24 27">
      <path d="M2 8.60555C2 5.50969 4.50969 3 7.60555 3C8.71223 3 9.79414 3.32758 10.715 
        3.94145L12 4.79815L13.285 3.94145C14.2059 3.32758 15.2878 3 16.3944 3C19.4903 3 22 5.50969 22 8.60555V9.34382C22 11.3098 21.219 
        13.1952 19.8289 14.5853L14.1213 20.2929C12.9497 21.4645 11.0503 21.4645 9.87868 20.2929L4.1711 14.5853C2.78097 13.1952 2 11.3098 2 
        9.34382V8.60555ZM7.60555"
        fill="{innerColor}"
        stroke="transparent"
        stroke-width={stroke}
        stroke-dasharray={pathLength +' ' + pathLength}
        stroke-dashoffset={0}
      />
    </svg>
    <path bind:this={heart} d="M2 8.60555C2 5.50969 4.50969 3 7.60555 3C8.71223 3 9.79414 3.32758 10.715 
      3.94145L12 4.79815L13.285 3.94145C14.2059 3.32758 15.2878 3 16.3944 3C19.4903 3 22 5.50969 22 8.60555V9.34382C22 11.3098 21.219 
      13.1952 19.8289 14.5853L14.1213 20.2929C12.9497 21.4645 11.0503 21.4645 9.87868 20.2929L4.1711 14.5853C2.78097 13.1952 2 11.3098 2 
      9.34382V8.60555ZM7.60555"
      class="{progressColor} stroke-cap-round stroke-join-round"
      fill="transparent"
      stroke-width={stroke}
      stroke-dasharray={pathLength +' ' + pathLength}
      stroke-dashoffset={pathLength - progress / 100 * pathLength}
    />
    <Fa icon={icon} scale={0.38} style="color:white"/>
  </svg>
</div>