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
  import LocaleStore from '../../stores/localeStore';

  export let group: string = "";

  const { globalIconSettings } = PlayerHudUIStore;

</script>


<Panel name={$LocaleStore.statusIcons.global_status_icons_settings} icon={faGlobe} color={"white"} bind:group>
  <div class="flex justify-center mb-8">
    <div class="w-50">
      <p class="text-lg text-center mb-2">{$LocaleStore.statusIcons.icon_shape}</p>
      <Select valuesArray={shapes} value={$globalIconSettings.shape} labelArray={$LocaleStore.statusIcons.shapes}
        handleSelectFunction={(shapeName) => {
          PlayerHudUIStore.updateAllShapes(shapeName);
          ColorEffectStore.updateAllIconShapeEditableColor(shapeName);
        }}
      />
    </div>
  </div>

  <div class="mx-8">
    <p class="text-xl font-bold">{$LocaleStore.statusIcons.global_size_position_section}</p>
    <hr class="mb-6">
  </div>

  <div class="mx-4 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 items-end">
    <div>
      <p class="text-base text-center mb-2">{$LocaleStore.statusIcons.width_size}</p>
      <NumberInput min={1} max={200} bind:value={$globalIconSettings.width}
        handleUpdateFunction={PlayerHudUIStore.updateAllWidth}
      />
    </div>
    <div>
      <p class="text-base text-center mb-2">{$LocaleStore.statusIcons.height_size}</p>
      <NumberInput min={1} max={200} bind:value={$globalIconSettings.height}
        handleUpdateFunction={PlayerHudUIStore.updateAllHeight}
      />
    </div>

    {#if $globalIconSettings.ringSize != null}
      <div>
        <p class="text-base text-center mb-2">{$LocaleStore.statusIcons.ring_size}</p>
        <NumberInput min={1} max={25} bind:value={$globalIconSettings.ringSize} step={0.5}
          handleUpdateFunction={PlayerHudUIStore.updateAllRingSize}
        />
      </div>
    {/if}

    {#if $globalIconSettings.displayOutline != null }
      <div>
        <p class="text-base text-center mb-2">{$LocaleStore.statusIcons.show_progress_outline}</p>
        <Switch center={true} bind:checked={$globalIconSettings.displayOutline}
          handleUpdateFunction={(checked) => PlayerHudUIStore.updateAllDisplayOutline(checked)}/>
      </div>
    {/if}

    <div>
      <p class="text-base text-center mb-2">{$LocaleStore.statusIcons.x_axis_position}</p>
      <NumberInput min={-20} max={20} bind:value={$globalIconSettings.translateX} step={0.25}
        handleUpdateFunction={PlayerHudUIStore.updateAllTranslateX}
      />
    </div>
    <div>
      <p class="text-base text-center mb-2">{$LocaleStore.statusIcons.y_axis_position}</p>
      <NumberInput min={-20} max={20} bind:value={$globalIconSettings.translateY} step={0.25}
        handleUpdateFunction={PlayerHudUIStore.updateAllTranslateY}
      />
    </div>
    <div>
      <p class="text-base text-center mb-2">{$LocaleStore.statusIcons.rotation}</p>
      <NumberInput min={0} max={360} bind:value={$globalIconSettings.rotateDegree}
        handleUpdateFunction={PlayerHudUIStore.updateAllRotateDegree}
      />
    </div>
    <div>
      <p class="text-base text-center mb-2">{$LocaleStore.statusIcons.icon_x_axis_position}</p>
      <NumberInput min={-10} max={10} bind:value={$globalIconSettings.iconTranslateX} step={0.01}
        handleUpdateFunction={PlayerHudUIStore.updateAllTranslateIconX}
      />
    </div>
    <div>
      <p class="text-base text-center mb-2">{$LocaleStore.statusIcons.icon_y_axis_position}</p>
      <NumberInput min={-10} max={10} bind:value={$globalIconSettings.iconTranslateY} step={0.01}
        handleUpdateFunction={PlayerHudUIStore.updateAllTranslateIconY}
      />
    </div>
    <div>
      <p class="text-base text-center mb-2">{$LocaleStore.statusIcons.icon_size}</p>
      <NumberInput min={0} max={3} bind:value={$globalIconSettings.iconScaling} step={0.01}
        handleUpdateFunction={PlayerHudUIStore.updateAllIconScale}
      />
    </div>

    {#if $globalIconSettings.xAxisRound != null}
    <div>
      <p class="text-base text-center mb-2">{$LocaleStore.statusIcons.x_axis_curve}</p>
      <NumberInput min={0} max={100} bind:value={$globalIconSettings.xAxisRound}
        handleUpdateFunction={PlayerHudUIStore.updateAllRoundXAxis}
      />
    </div>
    {/if}

    {#if $globalIconSettings.yAxisRound != null}
    <div>
      <p class="text-base text-center mb-2">{$LocaleStore.statusIcons.y_axis_curve}</p>
      <NumberInput min={0} max={100} bind:value={$globalIconSettings.yAxisRound}
        handleUpdateFunction={PlayerHudUIStore.updateAllRoundYAxis}
      />
    </div>
    {/if}
  </div>

  <!-- Colors Section -->
  <div class="mx-8 mt-8">
    <p class="text-xl font-bold">{$LocaleStore.statusIcons.global_color_section}</p>
    <hr>
  </div>

  <div class="mx-4 mt-6 mb-10 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
    <div class="flex flex-col mx-auto">
      <p class="text-base text-center mb-2">{$LocaleStore.statusIcons.progress_color}</p>
      <ColorPicker colorString={$ColorEffectStore.globalColorSettings.progressColor}
        updateFunction={(hexColor) => ColorEffectStore.updateAllDefaultEffectColorSetting("progressColor", hexColor)}
      />
    </div>
    <div>
      <p class="text-base text-center mb-2">{$LocaleStore.statusIcons.progress_contrast}</p>
      <NumberInput min={0} max={300} bind:value={$ColorEffectStore.globalColorSettings.progressContrast}
        handleUpdateFunction={(contrastAmount) => ColorEffectStore.updateAllDefaultEffectColorSetting("progressContrast", contrastAmount)}
      />
    </div>
    <div>
      <p class="text-base text-center mb-2">{$LocaleStore.statusIcons.progress_shadow}</p>
      <NumberInput min={0} max={20} bind:value={$ColorEffectStore.globalColorSettings.progressDropShadowAmount}
        handleUpdateFunction={(dropAmount) => ColorEffectStore.updateAllDefaultEffectColorSetting("progressDropShadowAmount", dropAmount)}
      />
    </div>
  
    <div class="flex flex-col mx-auto">
      <p class="text-base text-center mb-2">{$LocaleStore.statusIcons.icon_color}</p>
        <ColorPicker colorString={$ColorEffectStore.globalColorSettings.iconColor}
          updateFunction={(hexColor) => ColorEffectStore.updateAllDefaultEffectColorSetting("iconColor", hexColor)}
        />
    </div>
    <div>
      <p class="text-base text-center mb-2">{$LocaleStore.statusIcons.icon_contrast}</p>
      <NumberInput min={0} max={300} bind:value={$ColorEffectStore.globalColorSettings.iconContrast}
        handleUpdateFunction={(contrastAmount) => ColorEffectStore.updateAllDefaultEffectColorSetting("iconContrast", contrastAmount)}
      />
    </div>
    <div>
      <p class="text-base text-center mb-2">{$LocaleStore.statusIcons.icon_shadow}</p>
      <NumberInput min={0} max={20} bind:value={$ColorEffectStore.globalColorSettings.iconDropShadowAmount}
        handleUpdateFunction={(dropAmount) => ColorEffectStore.updateAllDefaultEffectColorSetting("iconDropShadowAmount", dropAmount)}
      />
    </div>

    <div class="flex flex-col mx-auto">
      <p class="text-base text-center mb-2">{$LocaleStore.statusIcons.outline_color}</p>
      <ColorPicker colorString={$ColorEffectStore.globalColorSettings.outlineColor}
        updateFunction={(hexColor) => ColorEffectStore.updateAllDefaultEffectColorSetting("outlineColor", hexColor)}
      />
    </div>
    <div>
      <p class="text-base text-center mb-2">{$LocaleStore.statusIcons.outline_contrast}</p>
      <NumberInput min={0} max={300} bind:value={$ColorEffectStore.globalColorSettings.outlineContrast}
        handleUpdateFunction={(contrastAmount) => ColorEffectStore.updateAllDefaultEffectColorSetting("outlineContrast", contrastAmount)}
      />
    </div>
    <div>
      <p class="text-base text-center mb-2">{$LocaleStore.statusIcons.outline_shadow}</p>
      <NumberInput min={0} max={20} bind:value={$ColorEffectStore.globalColorSettings.outlineDropShadowAmount}
        handleUpdateFunction={(dropAmount) => ColorEffectStore.updateAllDefaultEffectColorSetting("outlineDropShadowAmount", dropAmount)}
      />
    </div>

    {#if $ColorEffectStore.globalColorSettings.editableColors.innerColor}
      <div class="flex flex-col mx-auto">
        <p class="text-base text-center mb-2">{$LocaleStore.statusIcons.inner_color}</p>
          <ColorPicker colorString={$ColorEffectStore.globalColorSettings.innerColor}
            updateFunction={(hexColor) => ColorEffectStore.updateAllDefaultEffectColorSetting("innerColor", hexColor)}
          />
      </div>
    {/if}
  </div>
</Panel>
<hr>