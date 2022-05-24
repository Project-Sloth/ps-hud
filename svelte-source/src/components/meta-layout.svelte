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


  // options={
  //         {
  //           health: { height: 50, width: 250, text: "Healthy", progressColor: "red",
  //           conditionalText: condtionalHealthBarText, shape: "horizontal-bar" },
  //           armor:  { height: 50, width: 75, shape: "horizontal-bar" }
  //         }}

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


<!-- {:else if layout == "esx-hud-hard-to-let-go"}
<div 
    <div 
<div 
  class="absolute bottom-[0.3vw] left-[3vh] flex flex-row"
  style="">
  <div class="flex flex-row mr-4 gap-1">
    <IconsList iconsToShow={["health", "armor"]}
    options={{
      
    }}
      />
  </div>
  <div class="flex flex-row gap-2">
    <IconsList iconsToNotShow={["health", "armor"]} optionsForAll={{
      ringSize: 2, height: 50, width: 50, iconScaling: 0.40 }} />
  </div>
</div> -->


<!-- <div class="mt-auto mb-3">
  <div class="flex flex-row">
    <div class="flex flex-col ml-2 mr-5">
      <div class="flex flex-row">
      <div class="flex flex-col gap-2">
        <Diamond progress={$progress} progressColor={armedStrokeColor} innerColor={"#403e3e"}/>
        <Diamond progress={$progress} progressColor={stressStrokeColor} innerColor={"#403e3e"}/>
        <Diamond progress={$progress} progressColor={hungerStrokeColor} innerColor={"#403e3e"}/>
        <Diamond progress={$progress} progressColor={healthStrokeColor} innerColor={"#403e3e"}/>
      </div>
      <div class="flex flex-col my-[-35px] mx-[-20px] gap-2">
        <Diamond progress={$progress} progressColor={nosStrokeColor} innerColor={"#403e3e"}/>
        <Diamond progress={$progress} progressColor={parachuteStrokeColor} innerColor={"#403e3e"}/>
        <Diamond progress={$progress} progressColor={thirstStrokeColor} innerColor={"#403e3e"}/>
        <Diamond progress={$progress} progressColor={armorStrokeColor} innerColor={"#403e3e"}/>
      </div>
      </div>
    </div>

    <div class="flex flex-col mt-auto">
      <div class="flex flex-row">
        <div class="flex flex-col mt-8">
          <Hexagon progress={$progress} icon={iconColorList[2].icon} innerColor={"#292626"}/>
          <Hexagon progress={$progress} icon={iconColorList[5].icon} innerColor={"#292626"}/>
        </div>
        <div class="mx-[-15px]">
          <Hexagon progress={$progress} icon={iconColorList[0].icon} innerColor={"#292626"}/>
          <Hexagon progress={$progress} icon={iconColorList[1].icon} innerColor={"#292626"}/>
        </div>
        <div class="flex flex-col mt-8">
          <Hexagon progress={$progress} icon={iconColorList[3].icon} innerColor={"#292626"}/>
          <Hexagon progress={$progress} icon={iconColorList[4].icon} innerColor={"#292626"}/>
        </div>
      </div>
    </div>

    <div class="flex flex-col mt-auto">
      <div class="flex flex-row">
        <div class="flex flex-col mt-8">
          <Hexagon progress={$progress} icon={iconColorList[2].icon} iconColor={"#dd6e14"} innerColor={"#292626"}/>
          <Hexagon progress={$progress} icon={iconColorList[5].icon} iconColor={iconColorList[5].color} innerColor={"#292626"}/>
        </div>
        <div class="mx-[-15px]">
          <Hexagon progress={$progress} icon={iconColorList[0].icon} innerColor={"#292626"}/>
          <Hexagon progress={$progress} icon={iconColorList[1].icon} innerColor={"#292626"}/>
        </div>
        <div class="flex flex-col mt-8">
          <Hexagon progress={$progress} icon={iconColorList[3].icon} innerColor={"#292626"}/>
          <Hexagon progress={$progress} icon={iconColorList[4].icon} innerColor={"#292626"}/>
        </div>
      </div>
    </div>
  </div>
</div> -->