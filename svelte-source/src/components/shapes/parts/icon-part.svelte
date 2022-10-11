<script lang="ts">
  import Fa from 'svelte-fa'

  export let icon: any;
  export let iconColor: string;
  export let iconContrast: number;
  export let iconDropShadowAmount: number;
  export let iconScaling: number;
  export let iconTranslateX: number;
  export let iconTranslateY: number;
  export let flip: "horizontal" | "vertical" | "both" = null;
</script>


<g style="filter: {iconDropShadowAmount ? "drop-shadow(0px 0px "+iconDropShadowAmount+"px "+iconColor+")": ""}
  {"contrast("+iconContrast+"%)"};">
  <Fa icon={icon} scale={iconScaling} translateX={iconTranslateX}
  translateY={iconTranslateY} style="color:{iconColor}" flip={flip}/>
</g>