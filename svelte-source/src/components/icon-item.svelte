<script lang="ts">
    import MetaShape from './meta-shape.svelte';
    import { fade } from 'svelte/transition';
    import type { colorEffect, optionalHudIconMetaShapeType } from '../types/types';

    export let singleIconStore;
    export let designMode: boolean;
    export let designProgress: number;
    export let iconToNotShow: boolean;
    export let buffColorEffect: optionalHudIconMetaShapeType;
    export let currentEffect: colorEffect;
</script>

{#if ($singleIconStore.isShowing && iconToNotShow) || designMode}
  <div transition:fade|local="{{duration: 1000}}" class="my-auto">
    <MetaShape hudIconInfo={
      {
        ...$singleIconStore,
        progressColor: currentEffect.progressColor,
        progressContrast: currentEffect.progressContrast,
        progressDropShadowAmount: currentEffect.progressDropShadowAmount,
        progressValue: designMode ?
          designProgress : $singleIconStore.progressValue,
        iconColor: buffColorEffect ? buffColorEffect.iconColor : currentEffect.iconColor,
        iconContrast: currentEffect.iconContrast,
        iconDropShadowAmount: currentEffect.iconDropShadowAmount,
        outlineColor: currentEffect.outlineColor,
        outlineContrast: currentEffect.outlineContrast,
        outlineDropShadowAmount: currentEffect.outlineDropShadowAmount,
        innerColor: currentEffect.innerColor,
      }}
    />
  </div>
{/if}