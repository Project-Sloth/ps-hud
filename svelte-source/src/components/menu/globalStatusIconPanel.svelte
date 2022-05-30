<script lang="ts">
  import ColorPicker from '../atoms/colorPicker.svelte';
  import NumberInput from '../atoms/numberInput.svelte';
  import Panel from '../atoms/panel.svelte';
  import Select from '../atoms/select.svelte';
  import Switch from '../atoms/switch.svelte';
  import { shapes } from '../../types/types';
  import { faGlobe } from '@fortawesome/free-solid-svg-icons';
  import ColorEffectStore from '../../stores/colorEffectStore';
  import PlayerHudUIStore from '../../stores/playerStatusHudStore';

  export let group: string = "";
</script>


<Panel name={'Global Status Icons Settings'} icon={faGlobe} color={"white"} bind:group>
  <div class="flex justify-center mb-8">
    <div class="w-50">
      <p class="text-lg text-center mb-2">Icon Shape</p>
      <Select valuesArray={shapes} value={$PlayerHudUIStore.globalIconSettings.shape}
        handleSelectFunction={(shapeName) => {
          PlayerHudUIStore.updateAllShapes(shapeName);
          ColorEffectStore.updateAllIconShapeEditableColor(shapeName);
        }}
      />
    </div>
  </div>

  <div class="mx-8">
    <p class="text-xl font-bold">Global Size & Position Section</p>
    <hr class="mb-6">
  </div>

  <div class="mx-4 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 items-end">
    <div>
      <p class="text-base text-center mb-2">Width Size</p>
      <NumberInput min={1} max={200} bind:value={$PlayerHudUIStore.globalIconSettings.width}
        handleUpdateFunction={PlayerHudUIStore.updateAllWidth}
      />
    </div>
    <div>
      <p class="text-base text-center mb-2">Height Size</p>
      <NumberInput min={1} max={200} bind:value={$PlayerHudUIStore.globalIconSettings.height}
        handleUpdateFunction={PlayerHudUIStore.updateAllHeight}
      />
    </div>

    {#if $PlayerHudUIStore.globalIconSettings.ringSize != null}
      <div>
        <p class="text-base text-center mb-2">Ring Size</p>
        <NumberInput min={1} max={25} bind:value={$PlayerHudUIStore.globalIconSettings.ringSize} step={0.5}
          handleUpdateFunction={PlayerHudUIStore.updateAllRingSize}
        />
      </div>
    {/if}

    {#if $PlayerHudUIStore.globalIconSettings.displayOutline != null }
      <div>
        <p class="text-base text-center mb-2">Show Progress Outline</p>
        <Switch center={true} bind:checked={$PlayerHudUIStore.globalIconSettings.displayOutline}
          handleUpdateFunction={(checked) => PlayerHudUIStore.updateAllDisplayOutline(checked)}/>
      </div>
    {/if}

    <div>
      <p class="text-base text-center mb-2">X-axis Position</p>
      <NumberInput min={-20} max={20} bind:value={$PlayerHudUIStore.globalIconSettings.translateX} step={0.25}
        handleUpdateFunction={PlayerHudUIStore.updateAllTranslateX}
      />
    </div>
    <div>
      <p class="text-base text-center mb-2">Y-axis Position</p>
      <NumberInput min={-20} max={20} bind:value={$PlayerHudUIStore.globalIconSettings.translateY} step={0.25}
        handleUpdateFunction={PlayerHudUIStore.updateAllTranslateY}
      />
    </div>
    <div>
      <p class="text-base text-center mb-2">Rotation</p>
      <NumberInput min={0} max={360} bind:value={$PlayerHudUIStore.globalIconSettings.rotateDegree}
        handleUpdateFunction={PlayerHudUIStore.updateAllRotateDegree}
      />
    </div>
    <div>
      <p class="text-base text-center mb-2">Icon X-axis Position</p>
      <NumberInput min={-10} max={10} bind:value={$PlayerHudUIStore.globalIconSettings.iconTranslateX} step={0.01}
        handleUpdateFunction={PlayerHudUIStore.updateAllTranslateIconX}
      />
    </div>
    <div>
      <p class="text-base text-center mb-2">Icon Y-axis Position</p>
      <NumberInput min={-10} max={10} bind:value={$PlayerHudUIStore.globalIconSettings.iconTranslateY} step={0.01}
        handleUpdateFunction={PlayerHudUIStore.updateAllTranslateIconY}
      />
    </div>
    <div>
      <p class="text-base text-center mb-2">Icon Size</p>
      <NumberInput min={0} max={3} bind:value={$PlayerHudUIStore.globalIconSettings.iconScaling} step={0.01}
        handleUpdateFunction={PlayerHudUIStore.updateAllIconScale}
      />
    </div>

    {#if $PlayerHudUIStore.globalIconSettings.xAxisRound != null}
    <div>
      <p class="text-base text-center mb-2">X-axis Curve</p>
      <NumberInput min={0} max={100} bind:value={$PlayerHudUIStore.globalIconSettings.xAxisRound}
        handleUpdateFunction={PlayerHudUIStore.updateAllRoundXAxis}
      />
    </div>
    {/if}

    {#if $PlayerHudUIStore.globalIconSettings.yAxisRound != null}
    <div>
      <p class="text-base text-center mb-2">Y-axis Curve</p>
      <NumberInput min={0} max={100} bind:value={$PlayerHudUIStore.globalIconSettings.yAxisRound}
        handleUpdateFunction={PlayerHudUIStore.updateAllRoundYAxis}
      />
    </div>
    {/if}
  </div>

  <!-- Colors Section -->
  <div class="mx-8 mt-8">
    <p class="text-xl font-bold">Global Color Section</p>
    <hr>
  </div>

  <div class="mx-4 mt-6 mb-10 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
    <div class="flex flex-col mx-auto">
      <p class="text-base text-center mb-2">Progress Color</p>
      <ColorPicker colorString={$ColorEffectStore.globalColorSettings.progressColor}
        updateFunction={(hexColor) => ColorEffectStore.updateAllDefaultEffectColorSetting("progressColor", hexColor)}
      />
    </div>
    <div>
      <p class="text-base text-center mb-2">Progress Contrast</p>
      <NumberInput min={0} max={300} bind:value={$ColorEffectStore.globalColorSettings.progressContrast}
        handleUpdateFunction={(contrastAmount) => ColorEffectStore.updateAllDefaultEffectColorSetting("progressContrast", contrastAmount)}
      />
    </div>
    <div>
      <p class="text-base text-center mb-2">Progress Shadow</p>
      <NumberInput min={0} max={20} bind:value={$ColorEffectStore.globalColorSettings.progressDropShadowAmount}
        handleUpdateFunction={(dropAmount) => ColorEffectStore.updateAllDefaultEffectColorSetting("progressDropShadowAmount", dropAmount)}
      />
    </div>
  
    <div class="flex flex-col mx-auto">
      <p class="text-base text-center mb-2">Icon Color</p>
        <ColorPicker colorString={$ColorEffectStore.globalColorSettings.iconColor}
          updateFunction={(hexColor) => ColorEffectStore.updateAllDefaultEffectColorSetting("iconColor", hexColor)}
        />
    </div>
    <div>
      <p class="text-base text-center mb-2">Icon Contrast</p>
      <NumberInput min={0} max={300} bind:value={$ColorEffectStore.globalColorSettings.iconContrast}
        handleUpdateFunction={(contrastAmount) => ColorEffectStore.updateAllDefaultEffectColorSetting("iconContrast", contrastAmount)}
      />
    </div>
    <div>
      <p class="text-base text-center mb-2">Icon Shadow</p>
      <NumberInput min={0} max={20} bind:value={$ColorEffectStore.globalColorSettings.iconDropShadowAmount}
        handleUpdateFunction={(dropAmount) => ColorEffectStore.updateAllDefaultEffectColorSetting("iconDropShadowAmount", dropAmount)}
      />
    </div>

    <div class="flex flex-col mx-auto">
      <p class="text-base text-center mb-2">Outline Color</p>
      <ColorPicker colorString={$ColorEffectStore.globalColorSettings.outlineColor}
        updateFunction={(hexColor) => ColorEffectStore.updateAllDefaultEffectColorSetting("outlineColor", hexColor)}
      />
    </div>
    <div>
      <p class="text-base text-center mb-2">Outline Contrast</p>
      <NumberInput min={0} max={300} bind:value={$ColorEffectStore.globalColorSettings.outlineContrast}
        handleUpdateFunction={(contrastAmount) => ColorEffectStore.updateAllDefaultEffectColorSetting("outlineContrast", contrastAmount)}
      />
    </div>
    <div>
      <p class="text-base text-center mb-2">Outline Shadow</p>
      <NumberInput min={0} max={20} bind:value={$ColorEffectStore.globalColorSettings.outlineDropShadowAmount}
        handleUpdateFunction={(dropAmount) => ColorEffectStore.updateAllDefaultEffectColorSetting("outlineDropShadowAmount", dropAmount)}
      />
    </div>

    {#if $ColorEffectStore.globalColorSettings.editableColors.innerColor}
      <div class="flex flex-col mx-auto">
        <p class="text-base text-center mb-2">Inner Color</p>
          <ColorPicker colorString={$ColorEffectStore.globalColorSettings.innerColor}
            updateFunction={(hexColor) => ColorEffectStore.updateAllDefaultEffectColorSetting("innerColor", hexColor)}
          />
      </div>
    {/if}
  </div>
</Panel>
<hr>