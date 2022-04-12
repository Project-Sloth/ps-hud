<script lang="ts">
  import PlayerHudUIStore from '../stores/playerStatusHudStore';
  import type { playerHudIcons, optionalPlayerHudIconsType, optionalHudIconType } from '../types/types';
  import { onDestroy } from 'svelte';
  import { fade } from 'svelte/transition';
  import MetaShape from './meta-shape.svelte';

  export let isReversed: boolean = false;
  export let iconsToShow: Array<keyof playerHudIcons> = [];
  export let iconsToNotShow: Array<keyof playerHudIcons> = [];
  export let options: optionalPlayerHudIconsType = {};
  export let optionsForAll: optionalHudIconType = {};

  let globalIconList: Array<keyof playerHudIcons> = $PlayerHudUIStore.showingOrder;

  $: {
    let globalIconList = $PlayerHudUIStore.showingOrder;
    if (isReversed) {
      globalIconList = globalIconList.reverse();
    }
  }

  let interval;
  let num: number = 0

  const moveProgress = (interval) => {
    let isUp: boolean = true;
    interval = setInterval(() => {
      if (isUp) {
        num += 15
        if (num > 100) {
          num = 100;
          isUp = !isUp;
        }
      } else {
        num -= 15
        if (num < 0) {
          num = 0;
          isUp = !isUp;
        }
      }
    }, 1400);
  };

  moveProgress(interval);
  onDestroy(() => clearInterval(interval));

</script>

{#each iconsToShow.length ? iconsToShow : globalIconList as shapeName }
  {#if $PlayerHudUIStore.icons[shapeName].isShowing && !iconsToNotShow.includes(shapeName)}
    <div transition:fade|local="{{duration: 1000}}" class="my-auto">
      <MetaShape hudIconInfo={{...$PlayerHudUIStore.icons[shapeName], progressValue: num, ...optionsForAll, ...options[shapeName]}} />
    </div>
  {/if}
{/each}