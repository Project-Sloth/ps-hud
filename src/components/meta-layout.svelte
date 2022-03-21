<script lang="ts">
  import PlayerHudStore from '../stores/playerHudStore';
  import IconsList from './icons-list.svelte';

  export let layout: "standard" | "left-bottom-column" | "right-column" | "bottom-center" | "bottom-right" | "top-left-row" = "right-column";
  export let spaceBetween: number = 0;
</script>


{#if $PlayerHudStore.show || true}
  {#if layout == "bottom-center"}
    <div class="absolute bottom-[0.3vw] w-100vw">
      <div
        class="static flex flex-row mx-auto" 
        style="width: max-content; gap: {spaceBetween+'em'};">
          <IconsList />
      </div>
    </div>
  {:else if layout == "bottom-right"}
    <div
      class="absolute bottom-[0.3vw] right-[3vh] flex flex-row"
      style="gap: {spaceBetween+'em'};">
          <IconsList isReversed/>
    </div>
  {:else if layout == "left-bottom-column"}
    <div class="absolute bottom-[0.3vw]">
      <div
        class="static flex flex-col ml-1" 
        style="gap: {spaceBetween+'em'};">
          <IconsList isReversed/>
      </div>
    </div>
  {:else if layout == "right-column"}
    <div class="absolute bottom-[0.3vw] right-[0.25rem] overflow-hidden">
      <div
        class="static flex flex-col" 
        style="gap: {spaceBetween+'em'};">
          <IconsList isReversed/>
      </div>
    </div>
  {:else if layout == "top-left-row"}
    <div 
      class="absolute top-[0.3vw] left-[0.3vh] flex flex-row"
      style="gap: {spaceBetween+'em'};">
      <IconsList />
    </div>
  {:else}
    <div 
      class="absolute bottom-[0.3vw] left-[3vh] flex flex-row"
      style="gap: {spaceBetween+'em'};">
      <IconsList />
    </div>
  {/if}
{/if}

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