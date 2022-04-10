<script lang="ts">
  import ColorPicker from '../atoms/color-picker.svelte';
  import { shapes, iconNames } from '../../types/types'
  import PlayerHudUIStore from '../../stores/playerHudUIStore'
  import Select from '../atoms/select.svelte'
  import NumberInput from '../atoms/number-input.svelte';

  function capFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

</script>

<div class="text-sm flex flex-col text-[#e8e8e8]">
  <div class="my-3 text-2xl text-white">
    <p>Global Icons Settings</p>
  </div>

  <div class="flex justify-center mb-8">
    <div class="w-50">
      <p class="text-lg text-center">Change Icon Shape</p>
      <Select valuesArray={shapes} value={$PlayerHudUIStore.globalIconSettings.shape}
        handleSelectFunction={PlayerHudUIStore.updateAllShapes}
      />
    </div>
  </div>

  <div class="mx-4 mb-8 grid grid-cols-4 gap-6">
    <div>
      <p class="text-base text-center mb-2">Change Width Size</p>
      <NumberInput min={1} max={200} bind:value={$PlayerHudUIStore.globalIconSettings.width}
        handleUpdateFunction={PlayerHudUIStore.updateAllWidth}
      />
    </div>
    <div>
      <p class="text-base text-center mb-2">Change Height Size</p>
      <NumberInput min={1} max={200} bind:value={$PlayerHudUIStore.globalIconSettings.height}
        handleUpdateFunction={PlayerHudUIStore.updateAllHeight}
      />
    </div>

    {#if $PlayerHudUIStore.globalIconSettings.ringSize != null}
      <div>
        <p class="text-base text-center mb-2">Change Ring Size</p>
        <NumberInput min={1} max={25} bind:value={$PlayerHudUIStore.globalIconSettings.ringSize} step={0.5}
          handleUpdateFunction={PlayerHudUIStore.updateAllRingSize}
        />
      </div>
    {/if}

    <div class="h-1/2 w-2/3 flex flex-col mx-auto">
      <p class="text-base text-center mb-2">Change Progress Color</p>
      <ColorPicker color={$PlayerHudUIStore.globalIconSettings.progressColor} updateFunction={(hexColor) => PlayerHudUIStore.updateAllProgressColor(hexColor)}/>
    </div>
    <div>
      <p class="text-base text-center mb-2">Change X-axis Position</p>
      <NumberInput min={-20} max={20} bind:value={$PlayerHudUIStore.globalIconSettings.translateX} step={0.25}
        handleUpdateFunction={PlayerHudUIStore.updateAllTranslateX}
      />
    </div>
    <div>
      <p class="text-base text-center mb-2">Change Y-axis Position</p>
      <NumberInput min={-20} max={20} bind:value={$PlayerHudUIStore.globalIconSettings.translateY} step={0.25}
        handleUpdateFunction={PlayerHudUIStore.updateAllTranslateY}
      />
    </div>
    <div>
      <p class="text-base text-center mb-2">Change Rotation</p>
      <NumberInput min={0} max={360} bind:value={$PlayerHudUIStore.globalIconSettings.rotateDegree}
        handleUpdateFunction={PlayerHudUIStore.updateAllRotateDegree}
      />
    </div>
    <div class="h-1/2 w-2/3 flex flex-col mx-auto">
      <p class="text-base text-center mb-2">Change Inner Color</p>
      <ColorPicker color={$PlayerHudUIStore.globalIconSettings.innerColor} updateFunction={(hexColor) => PlayerHudUIStore.updateAllInnerColor(hexColor)}/>
    </div>
    <div>
      <p class="text-base text-center mb-2">Change Icon X-axis Position</p>
      <NumberInput min={-10} max={10} bind:value={$PlayerHudUIStore.globalIconSettings.iconTranslateX} step={0.01}
        handleUpdateFunction={PlayerHudUIStore.updateAllTranslateIconX}
      />
    </div>
    <div>
      <p class="text-base text-center mb-2">Change Icon Y-axis Position</p>
      <NumberInput min={-10} max={10} bind:value={$PlayerHudUIStore.globalIconSettings.iconTranslateY} step={0.01}
        handleUpdateFunction={PlayerHudUIStore.updateAllTranslateIconY}
      />
    </div>
    <div>
      <p class="text-base text-center mb-2">Change Icon Size</p>
      <NumberInput min={0} max={3} bind:value={$PlayerHudUIStore.globalIconSettings.iconScaling} step={0.01}
        handleUpdateFunction={PlayerHudUIStore.updateAllIconScale}
      />
    </div>
    <div class="h-1/2 w-2/3 flex flex-col mx-auto">
      <p class="text-base text-center mb-2">Change Icon Color</p>
        <ColorPicker color={$PlayerHudUIStore.globalIconSettings.iconColor} updateFunction={(hexColor) => PlayerHudUIStore.updateAllIconColor(hexColor)}/>
    </div>

    {#if $PlayerHudUIStore.globalIconSettings.xAxisRound != null}
    <div>
      <p class="text-base text-center mb-2">Change X-axis Curve</p>
      <NumberInput min={0} max={100} bind:value={$PlayerHudUIStore.globalIconSettings.xAxisRound}
        handleUpdateFunction={PlayerHudUIStore.updateAllRoundXAxis}
      />
    </div>
    {/if}

    {#if $PlayerHudUIStore.globalIconSettings.yAxisRound != null}
    <div>
      <p class="text-base text-center mb-2">Change Y-axis Curve</p>
      <NumberInput min={0} max={100} bind:value={$PlayerHudUIStore.globalIconSettings.yAxisRound}
        handleUpdateFunction={PlayerHudUIStore.updateAllRoundYAxis}
      />
    </div>
    {/if}
  </div>

  <hr>

  {#each iconNames as name}
    <div class="mt-6 text-2xl text-white">
      <p>{capFirstLetter(name)} Icon Settings</p>
    </div>
    
    <div class="flex justify-center mb-8">
      <div class="w-50">
        <p class="text-lg text-center">Change Icon Shape</p>
        <Select valuesArray={shapes} value={$PlayerHudUIStore.icons[name].shape}
          handleSelectFunction={(shapeName) => PlayerHudUIStore.updateIconShape(name, shapeName)}
        />
      </div>
    </div>

    <div class="mx-4 mb-8 grid grid-cols-4 gap-6">
      <div>
        <p class="text-base text-center mb-2">Change Width Size</p>
        <NumberInput min={1} max={200} bind:value={$PlayerHudUIStore.icons[name].width}
          handleUpdateFunction={(width) => PlayerHudUIStore.updateIconSetting(name, "width", width)}
        />
      </div>
      <div>
        <p class="text-base text-center mb-2">Change Height Size</p>
        <NumberInput min={1} max={200} bind:value={$PlayerHudUIStore.icons[name].height}
          handleUpdateFunction={(height) => PlayerHudUIStore.updateIconSetting(name, "height", height)}
        />
      </div>

      {#if $PlayerHudUIStore.icons[name].ringSize != null}
        <div>
          <p class="text-base text-center mb-2">Change Ring Size</p>
          <NumberInput min={1} max={25} bind:value={$PlayerHudUIStore.icons[name].ringSize} step={0.5}
            handleUpdateFunction={(ringSize) => PlayerHudUIStore.updateIconSetting(name, "ringSize", ringSize)}
          />
        </div>
      {/if}

      <div class="h-1/2 w-2/3 flex flex-col mx-auto">
        <p class="text-base text-center mb-2">Change Progress Color</p>
        <ColorPicker color={$PlayerHudUIStore.icons[name].progressColor}
          updateFunction={(hexColor) => PlayerHudUIStore.updateIconSetting(name, "progressColor", hexColor)}
        />
      </div>
      <div>
        <p class="text-base text-center mb-2">Change X-axis Position</p>
        <NumberInput min={-20} max={20} bind:value={$PlayerHudUIStore.icons[name].translateX} step={0.25}
          handleUpdateFunction={(translateX) => PlayerHudUIStore.updateIconSetting(name, "translateX", translateX)}
        />
      </div>
      <div>
        <p class="text-base text-center mb-2">Change Y-axis Position</p>
        <NumberInput min={-20} max={20} bind:value={$PlayerHudUIStore.icons[name].translateY} step={0.25}
          handleUpdateFunction={(translateY) => PlayerHudUIStore.updateIconSetting(name, "translateY", translateY)}
        />
      </div>
      <div>
        <p class="text-base text-center mb-2">Change Rotation</p>
        <NumberInput min={0} max={360} bind:value={$PlayerHudUIStore.icons[name].rotateDegree}
          handleUpdateFunction={(rotateDegree) => PlayerHudUIStore.updateIconSetting(name, "rotateDegree", rotateDegree)}
        />
      </div>
      <div class="h-1/2 w-2/3 flex flex-col mx-auto">
        <p class="text-base text-center mb-2">Change Inner Color</p>
        <ColorPicker color={$PlayerHudUIStore.icons[name].innerColor}
          updateFunction={(hexColor) => PlayerHudUIStore.updateIconSetting(name, "innerColor", hexColor)}
        />
      </div>
      <div>
        <p class="text-base text-center mb-2">Change Icon X-axis Position</p>
        <NumberInput min={-10} max={10} bind:value={$PlayerHudUIStore.icons[name].iconTranslateX} step={0.01}
          handleUpdateFunction={(iconTranslateX) => PlayerHudUIStore.updateIconSetting(name, "iconTranslateX", iconTranslateX)}
        />
      </div>
      <div>
        <p class="text-base text-center mb-2">Change Icon Y-axis Position</p>
        <NumberInput min={-10} max={10} bind:value={$PlayerHudUIStore.icons[name].iconTranslateY} step={0.01}
          handleUpdateFunction={(iconTranslateY) => PlayerHudUIStore.updateIconSetting(name, "iconTranslateY", iconTranslateY)}
        />
      </div>
      <div>
        <p class="text-base text-center mb-2">Change Icon Size</p>
        <NumberInput min={0} max={3} bind:value={$PlayerHudUIStore.icons[name].iconScaling} step={0.01}
          handleUpdateFunction={(iconScaling) => PlayerHudUIStore.updateIconSetting(name, "iconScaling", iconScaling)}
        />
      </div>
      <div class="h-1/2 w-2/3 flex flex-col mx-auto">
        <p class="text-base text-center mb-2">Change Icon Color</p>
          <ColorPicker color={$PlayerHudUIStore.icons[name].iconColor}
            updateFunction={(hexColor) => PlayerHudUIStore.updateIconSetting(name, "iconColor", hexColor)}
          />
      </div>

      {#if $PlayerHudUIStore.icons[name].xAxisRound != null}
      <div>
        <p class="text-base text-center mb-2">Change X-axis Curve</p>
        <NumberInput min={0} max={100} bind:value={$PlayerHudUIStore.icons[name].xAxisRound}
          handleUpdateFunction={(xAxisRound) => PlayerHudUIStore.updateIconSetting(name, "xAxisRound", xAxisRound)}
        />
      </div>
      {/if}

      {#if $PlayerHudUIStore.icons[name].yAxisRound != null}
      <div>
        <p class="text-base text-center mb-2">Change Y-axis Curve</p>
        <NumberInput min={0} max={100} bind:value={$PlayerHudUIStore.icons[name].yAxisRound}
          handleUpdateFunction={(yAxisRound) => PlayerHudUIStore.updateIconSetting(name, "yAxisRound", yAxisRound)}
        />
      </div>
      {/if}
    </div>
    <hr>
  {/each}
</div>

