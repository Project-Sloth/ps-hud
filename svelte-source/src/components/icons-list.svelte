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

  const { designMode, designProgress, showingOrder, singleIcons } = PlayerHudStore;

  let globalIconList: Array<keyof playerHudIcons> = $showingOrder;
  
  $: editSingleIconName = $ColorEffectStore.globalColorSettings.editSingleIconName;

  $: {
    let globalIconList = $showingOrder;
    if (isReversed) {
      globalIconList = globalIconList.reverse();
    }
  }

  // <MetaShape hudIconInfo={{...$PlayerHudUIStore.icons[shapeName], progressValue: num, ...optionsForAll, ...options[shapeName]}} />
</script>

{#each iconsToShow.length ? iconsToShow : globalIconList as iconName }
  {@const currentEffectIndex = $designMode ? 
    editSingleIconName == iconName ? $ColorEffectStore.globalColorSettings.editSingleIconStage : 0 : $ColorEffectStore.icons[iconName].currentEffect}
  {@const currentEffect = $ColorEffectStore.icons[iconName].colorEffects[currentEffectIndex]}
  {@const buffColorEffect = $ExternalStatusStore[iconName]}

  
  {#if ($singleIcons[iconName].isShowing && !iconsToNotShow.includes(iconName)) || $designMode}
    <div transition:fade|local="{{duration: 1000}}" class="my-auto">
      <MetaShape hudIconInfo={
        {
          ...$singleIcons[iconName],
          progressColor: currentEffect.progressColor,
          progressContrast: currentEffect.progressContrast,
          progressDropShadowAmount: currentEffect.progressDropShadowAmount,
          progressValue: $designMode ?
            $designProgress : $singleIcons[iconName].progressValue,
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
      {#if statusIcon.isShowing || $designMode}
        <!-- Future reference when we want to dynamically show buff during duration of buff -->
        <!-- <div transition:fade|local="{{duration: 1000}}" class="my-auto"> -->
          <MetaShape hudIconInfo={statusIcon}/>
        <!-- </div> -->
      {/if}
    </div>
  {/if}
{/each}