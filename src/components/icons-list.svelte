<script lang="ts">
  import PlayerHudStore from '../stores/playerStatusHudStore';
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

{#each iconsToShow.length ? iconsToShow : globalIconList as shapeName }
  {#if ($PlayerHudStore.icons[shapeName].isShowing && !iconsToNotShow.includes(shapeName)) || $PlayerHudStore.designMode}
    <div transition:fade|local="{{duration: 1000}}" class="my-auto">
      <MetaShape hudIconInfo={{...$PlayerHudStore.icons[shapeName],progressValue: $PlayerHudStore.designMode ?
        $PlayerHudStore.designProgress : $PlayerHudStore.icons[shapeName].progressValue}}/>
    </div>
  {/if}
{/each}