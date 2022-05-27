<script lang="ts">
  import PlayerHudStore from '../stores/playerStatusHudStore';
  import ExternalStatusStore from '../stores/externalStatusStore';
  import ColorEffectStore from '../stores/colorEffectStore';
  import type { playerHudIcons, optionalPlayerHudIconsType, optionalHudIconType } from '../types/types';
  import { fade } from 'svelte/transition';
  import MetaShape from './meta-shape.svelte';

  export let isReversed: boolean = false;
  export let iconsToShow: Array<keyof playerHudIcons> = [];
  export let iconsToNotShow: Array<keyof playerHudIcons> = [];
  export let options: optionalPlayerHudIconsType = {};
  export let optionsForAll: optionalHudIconType = {};

  let globalIconList: Array<keyof playerHudIcons> = $PlayerHudStore.showingOrder;
  
  $: editSingleIconName = $ColorEffectStore.globalColorSettings.editSingleIconName;

  $: {
    let globalIconList = $PlayerHudStore.showingOrder;
    if (isReversed) {
      globalIconList = globalIconList.reverse();
    }
  }

  // <MetaShape hudIconInfo={{...$PlayerHudUIStore.icons[shapeName], progressValue: num, ...optionsForAll, ...options[shapeName]}} />
</script>

{#each iconsToShow.length ? iconsToShow : globalIconList as iconName }
  {@const currentEffectIndex = $PlayerHudStore.designMode ? 
    editSingleIconName == iconName ? $ColorEffectStore.globalColorSettings.editSingleIconStage : 0 : $ColorEffectStore.icons[iconName].currentEffect}
  {@const currentEffect = $ColorEffectStore.icons[iconName].colorEffects[currentEffectIndex]}
  {@const buffColorEffect = $ExternalStatusStore[iconName]}
  
  {#if ($PlayerHudStore.icons[iconName].isShowing && !iconsToNotShow.includes(iconName)) || $PlayerHudStore.designMode}
    <div transition:fade|local="{{duration: 1000}}" class="my-auto">
      <MetaShape hudIconInfo={
        {
          ...$PlayerHudStore.icons[iconName],
          progressColor: currentEffect.progressColor,
          progressContrast: currentEffect.progressContrast,
          progressDropShadowAmount: currentEffect.progressDropShadowAmount,
          progressValue: $PlayerHudStore.designMode ?
            $PlayerHudStore.designProgress : $PlayerHudStore.icons[iconName].progressValue,
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
{/each}

{#each Object.entries($ExternalStatusStore) as [iconName, statusIcon] (iconName) }
  <!-- Only show buffs since only buffs will have names in them -->
  {#if statusIcon.name}
    <div transition:fade|local="{{duration: 1000}}" class="my-auto">
      {#if statusIcon.isShowing || $PlayerHudStore.designMode}
        <!-- Future reference when we want to dynamically show buff during duration of buff -->
        <!-- <div transition:fade|local="{{duration: 1000}}" class="my-auto"> -->
          <MetaShape hudIconInfo={statusIcon}/>
        <!-- </div> -->
      {/if}
    </div>
  {/if}
{/each}