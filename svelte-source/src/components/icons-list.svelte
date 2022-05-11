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

  $: {
    let globalIconList = $PlayerHudStore.showingOrder;
    if (isReversed) {
      globalIconList = globalIconList.reverse();
    }
  }

  // <MetaShape hudIconInfo={{...$PlayerHudUIStore.icons[shapeName], progressValue: num, ...optionsForAll, ...options[shapeName]}} />
</script>

{#each iconsToShow.length ? iconsToShow : globalIconList as iconName }
  {@const currentEffect = $PlayerHudStore.designMode ? 0 : $ColorEffectStore.icons[iconName].currentEffect}
  
  {#if ($PlayerHudStore.icons[iconName].isShowing && !iconsToNotShow.includes(iconName)) || $PlayerHudStore.designMode}
    
    <div transition:fade|local="{{duration: 1000}}" class="my-auto">
      <MetaShape hudIconInfo={
        {
          ...$PlayerHudStore.icons[iconName],
          progressColor: $ColorEffectStore.icons[iconName].colorEffects[currentEffect].progressColor,
          progressContrast: $ColorEffectStore.icons[iconName].colorEffects[currentEffect].progressContrast,
          progressDropShadowAmount: $ColorEffectStore.icons[iconName].colorEffects[currentEffect].progressDropShadowAmount,
          progressValue: $PlayerHudStore.designMode ?
            $PlayerHudStore.designProgress : $PlayerHudStore.icons[iconName].progressValue,
          iconColor: $ColorEffectStore.icons[iconName].colorEffects[currentEffect].iconColor,
          iconContrast: $ColorEffectStore.icons[iconName].colorEffects[currentEffect].iconContrast,
          iconDropShadowAmount: $ColorEffectStore.icons[iconName].colorEffects[currentEffect].iconDropShadowAmount,
          outlineColor: $ColorEffectStore.icons[iconName].colorEffects[currentEffect].outlineColor,
          outlineContrast: $ColorEffectStore.icons[iconName].colorEffects[currentEffect].outlineContrast,
          outlineDropShadowAmount: $ColorEffectStore.icons[iconName].colorEffects[currentEffect].outlineDropShadowAmount,
          innerColor: $ColorEffectStore.icons[iconName].colorEffects[currentEffect].innerColor,
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