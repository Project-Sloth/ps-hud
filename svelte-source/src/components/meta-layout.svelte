<script lang="ts">
  import type { layoutIconKind } from '../types/types';
  import PlayerHudUIStore from '../stores/playerStatusHudStore';
  import LayoutStore from '../stores/layoutStore';
  import DebugStore from '../stores/debugStore';
  import IconsList from './icons-list.svelte';

  let layout: layoutIconKind = "standard";

  function condtionalHealthBarText(val: number) {
    if (val <= 0) {
      return "Unconscious";
    } else if (val <= 50) {
      return "Injured";
    } else {
      return "Healthy";
    }
  }

  $: {
    layout = $LayoutStore.layout;
  }

</script>

{#if $PlayerHudUIStore.show || DebugStore}
  {#if layout == "center-bottom-row"}
    <div class="absolute bottom-[0.3vw] w-100vw">
      <div class="static flex flex-row mx-auto" style="width: max-content;">
          <div class="flex flex-row"
               style="gap: {$LayoutStore.iconBetweenSpacing+'px'};
                      margin-bottom: {$LayoutStore.yAxisSpacing+'px'};
                      margin-left: {$LayoutStore.xAxisSpacing+'px'};">
            <IconsList />
          </div>
      </div>
    </div>
  {:else if layout == "bottom-right-row"}
    <div
      class="absolute bottom-[0.3vw] right-[0.3vw] flex flex-row"
      style="gap: {$LayoutStore.iconBetweenSpacing+'px'};
             margin-bottom: {$LayoutStore.yAxisSpacing+'px'};
             margin-left: {$LayoutStore.xAxisSpacing+'px'};">
          <IconsList />
    </div>
  {:else if layout == "left-bottom-column"}
    <div class="absolute bottom-[0.3vw] left-[1vh]">
      <div
        class="static flex flex-col"
        style="gap: {$LayoutStore.iconBetweenSpacing+'px'};
               margin-bottom: {$LayoutStore.yAxisSpacing+'px'};
               margin-left: {$LayoutStore.xAxisSpacing+'px'};">
          <IconsList />
      </div>
    </div>
  {:else if layout == "right-bottom-column"}
    <div class="absolute bottom-[0.3vw] right-[1vh]">
      <div
        class="static flex flex-col"
        style="gap: {$LayoutStore.iconBetweenSpacing+'px'};
               margin-bottom: {$LayoutStore.yAxisSpacing+'px'};
               margin-left: {$LayoutStore.xAxisSpacing+'px'};">
          <IconsList />
      </div>
    </div>
  {:else if layout == "top-left-row"}
    <div
      class="absolute top-[0.3vw] left-[0.3vw] flex flex-row"
      style="gap: {$LayoutStore.iconBetweenSpacing+'px'};
             margin-bottom: {$LayoutStore.yAxisSpacing+'px'};
             margin-left: {$LayoutStore.xAxisSpacing+'px'};">
      <IconsList />
    </div>
  {:else if layout == "top-right-row"}
    <div
      class="absolute top-[0.3vw] right-[0.3vw] flex flex-row"
      style="gap: {$LayoutStore.iconBetweenSpacing+'px'};
             margin-bottom: {$LayoutStore.yAxisSpacing+'px'};
             margin-left: {$LayoutStore.xAxisSpacing+'px'};">
      <IconsList />
    </div>
  {:else if layout == "standard"}
    <div
      class="absolute bottom-[0.3vw] left-[0.3vw] flex flex-row standard-layout"
      style="gap: {$LayoutStore.iconBetweenSpacing+'px'};
             margin-bottom: {$LayoutStore.yAxisSpacing+'px'};
             margin-left: {$LayoutStore.xAxisSpacing+'px'};">
      <IconsList />
    </div>
  {/if}
{/if}

<style>
  @media (width: 1280px) and (height: 720px) {
    .standard-layout {
      transform: scale(0.7) !important;
      left: -3vw !important;
      bottom: -1vh !important;
    }
  }
</style>
