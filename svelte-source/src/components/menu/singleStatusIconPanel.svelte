<script lang="ts">
  import ColorPicker from '../atoms/colorPicker.svelte';
  import NumberInput from '../atoms/numberInput.svelte';
  import Panel from '../atoms/panel.svelte';
  import Select from '../atoms/select.svelte';
  import Switch from '../atoms/switch.svelte';
  import { shapes, iconNamesKind, iconNames } from '../../types/types';
  import ColorEffectStore from '../../stores/colorEffectStore';
  import PlayerHudUIStore from '../../stores/playerStatusHudStore';
  import { faUser } from '@fortawesome/free-solid-svg-icons'
  import LocaleStore from '../../stores/localeStore';

  export let group: string = "";

  const singleIconStores = PlayerHudUIStore.singleIcons;

  let iconIndex: number = 0;
  let iconColors: Array<string> = [
    "#FFFFFF", "rgb(33, 171, 97)", "#326dbf", "#dd6e14", "#1a7cad", "rgb(220, 6, 6)", 
    "rgb(138, 168, 189)", "rgb(255, 72, 133)", "rgb(185, 255, 40)", "#3FA554", 
    "rgb(182, 72, 255)", "rgb(255, 72, 133)", "#D64763", "rgb(0, 0, 0)", "#f76205"
  ];
  let singleIconName: iconNamesKind = "voice";
  let singleIcons;
  let stageIndex: number = 0;
  let colorArray: Array<any> = $ColorEffectStore.icons[singleIconName].colorEffects;
  let colorStatesArray: Array<string> = colorArray.map(x => x.name);
  let labelArray: Array<string> = null;
  let currentState: string = colorStatesArray[stageIndex];

  $: $ColorEffectStore.globalColorSettings.editSingleIconStage = stageIndex;
  $: $ColorEffectStore.globalColorSettings.editSingleIconName = singleIconName;

  $: {
    colorArray = $ColorEffectStore.icons[singleIconName].colorEffects;
    colorStatesArray = colorArray.map(x => x.name);
    // voice_state_strings
    labelArray = $LocaleStore.statusIcons[singleIconName+"_state_strings"] || null;
  }

  $: {
    singleIcons = singleIconStores[singleIconName];
  }

</script>

<Panel name={$LocaleStore.statusIcons.single_status_icon_settings} icon={$singleIcons.icon || faUser} color={iconColors[iconIndex]} bind:group>
  <div class="flex flex-row mb-8 mt-4">
    <div class="flex-1">
      <div class="max-w-50 ml-8">
        <p class="text-lg text-center mb-2">{$LocaleStore.statusIcons.icon_status_to_edit}</p>
        <Select valuesArray={iconNames} value={singleIconName} labelArray={$LocaleStore.statusIcons.statusIconNames}
          handleSelectFunction={(shapeName) => {
            singleIconName = shapeName;
            iconIndex = iconNames.findIndex((element) => element == shapeName);
            stageIndex = 0;
          }}
        />
      </div>
    </div>
    <div class="w-50">
      <p class="text-lg text-center mb-2">{$LocaleStore.statusIcons.icon_shape}</p>
      <Select valuesArray={shapes} bind:value={$singleIcons.shape} labelArray={$LocaleStore.statusIcons.shapes}
        handleSelectFunction={(shapeName) => {
          PlayerHudUIStore.updateIconShape(singleIconName, shapeName);
          ColorEffectStore.updateIconShapeEditableColor(singleIconName, shapeName);
        }}
      />
    </div>
    <div class="flex-1"></div>
  </div>

  <div class="mx-8">
    <p class="text-xl font-bold">{$LocaleStore.statusIcons.single_icon_size_position_section}</p>
    <hr class="mb-6">
  </div>

  <div class="mx-4 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 items-end">
    <div>
      <p class="text-base text-center mb-2">{$LocaleStore.statusIcons.width_size}</p>
      <NumberInput min={1} max={200} bind:value={$singleIcons.width}
        handleUpdateFunction={(val) => PlayerHudUIStore.updateIconSetting(singleIconName, "width", val)}
      />
    </div>
    <div>
      <p class="text-base text-center mb-2">{$LocaleStore.statusIcons.height_size}</p>
      <NumberInput min={1} max={200} bind:value={$singleIcons.height}
        handleUpdateFunction={(val) => PlayerHudUIStore.updateIconSetting(singleIconName, "height", val)}
      />
    </div>

    {#if $singleIcons.ringSize != null}
      <div>
        <p class="text-base text-center mb-2">{$LocaleStore.statusIcons.ring_size}</p>
        <NumberInput min={1} max={25} bind:value={$singleIcons.ringSize} step={0.5}
          handleUpdateFunction={(val) => PlayerHudUIStore.updateIconSetting(singleIconName, "ringSize", val)}
        />
      </div>
    {/if}

    {#if $singleIcons.displayOutline != null }
      <div>
        <p class="text-base text-center mb-2">{$LocaleStore.statusIcons.show_progress_outline}</p>
        <Switch center={true} bind:checked={$singleIcons.displayOutline}
          handleUpdateFunction={(checked) => PlayerHudUIStore.updateIconSetting(singleIconName, "displayOutline", checked)}/>
      </div>
    {/if}

    <div>
      <p class="text-base text-center mb-2">{$LocaleStore.statusIcons.x_axis_position}</p>
      <NumberInput min={-20} max={20} bind:value={$singleIcons.translateX} step={0.25}
        handleUpdateFunction={(val) => PlayerHudUIStore.updateIconSetting(singleIconName, "translateX", val)}
      />
    </div>
    <div>
      <p class="text-base text-center mb-2">{$LocaleStore.statusIcons.y_axis_position}</p>
      <NumberInput min={-20} max={20} bind:value={$singleIcons.translateY} step={0.25}
        handleUpdateFunction={(val) => PlayerHudUIStore.updateIconSetting(singleIconName, "translateY", val)}
      />
    </div>
    <div>
      <p class="text-base text-center mb-2">{$LocaleStore.statusIcons.rotation}</p>
      <NumberInput min={0} max={360} bind:value={$singleIcons.rotateDegree}
        handleUpdateFunction={(val) => PlayerHudUIStore.updateIconSetting(singleIconName, "rotateDegree", val)}
      />
    </div>
    <div>
      <p class="text-base text-center mb-2">{$LocaleStore.statusIcons.icon_x_axis_position}</p>
      <NumberInput min={-10} max={10} bind:value={$singleIcons.iconTranslateX} step={0.01}
        handleUpdateFunction={(val) => PlayerHudUIStore.updateIconSetting(singleIconName, "iconTranslateX", val)}
      />
    </div>
    <div>
      <p class="text-base text-center mb-2">{$LocaleStore.statusIcons.icon_y_axis_position}</p>
      <NumberInput min={-10} max={10} bind:value={$singleIcons.iconTranslateY} step={0.01}
        handleUpdateFunction={(val) => PlayerHudUIStore.updateIconSetting(singleIconName, "iconTranslateY", val)}
      />
    </div>
    <div>
      <p class="text-base text-center mb-2">{$LocaleStore.statusIcons.icon_size}</p>
      <NumberInput min={0} max={3} bind:value={$singleIcons.iconScaling} step={0.01}
        handleUpdateFunction={(val) => PlayerHudUIStore.updateIconSetting(singleIconName, "iconScaling", val)}
      />
    </div>

    {#if $singleIcons.xAxisRound != null}
    <div>
      <p class="text-base text-center mb-2">{$LocaleStore.statusIcons.x_axis_curve}</p>
      <NumberInput min={0} max={100} bind:value={$singleIcons.xAxisRound}
        handleUpdateFunction={(val) => PlayerHudUIStore.updateIconSetting(singleIconName, "xAxisRound", val)}
      />
    </div>
    {/if}

    {#if $singleIcons.yAxisRound != null}
    <div>
      <p class="text-base text-center mb-2">{$LocaleStore.statusIcons.y_axis_curve}</p>
      <NumberInput min={0} max={100} bind:value={$singleIcons.yAxisRound}
        handleUpdateFunction={(val) => PlayerHudUIStore.updateIconSetting(singleIconName, "yAxisRound", val)}
      />
    </div>
    {/if}
  </div>

  <!-- Colors Section -->
  <div class="mx-8 mt-8">
    <p class="text-xl font-bold">{$LocaleStore.statusIcons.single_icon_color_section}</p>
    <hr>
  </div>

  {#if colorArray.length > 1}
    <div class="flex flex-row justify-center mt-4">
      <div class="w-50">
        <p class="text-lg text-center mb-2">{$LocaleStore.statusIcons.icon_state}</p>
        <Select valuesArray={colorStatesArray} labelArray={labelArray} bind:value={currentState} bind:selectedIndex={stageIndex}/>
      </div>
    </div>
  {/if}

  <div class="mx-4 mt-6 mb-10 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">

    <div class="flex flex-col mx-auto">
      <p class="text-base text-center mb-2">{$LocaleStore.statusIcons.progress_color}</p>
      <ColorPicker colorString={$ColorEffectStore.icons[singleIconName].colorEffects[stageIndex].progressColor}
        updateFunction={(hexColor) => ColorEffectStore.updateColorSetting(singleIconName, stageIndex, "progressColor", hexColor)}
      />
    </div>
    <div>
      <p class="text-base text-center mb-2">{$LocaleStore.statusIcons.progress_contrast}</p>
      <NumberInput min={0} max={300} bind:value={$ColorEffectStore.icons[singleIconName].colorEffects[stageIndex].progressContrast}
        handleUpdateFunction={(contrastAmount) => ColorEffectStore.updateColorSetting(singleIconName, stageIndex, "progressContrast", contrastAmount)}
      />
    </div>
    <div>
      <p class="text-base text-center mb-2">{$LocaleStore.statusIcons.progress_shadow}</p>
      <NumberInput min={0} max={20} bind:value={$ColorEffectStore.icons[singleIconName].colorEffects[stageIndex].progressDropShadowAmount}
        handleUpdateFunction={(dropAmount) => ColorEffectStore.updateColorSetting(singleIconName, stageIndex, "progressDropShadowAmount", dropAmount)}
      />
    </div>
    
    <div class="flex flex-col mx-auto">
      <p class="text-base text-center mb-2">{$LocaleStore.statusIcons.icon_color}</p>
        <ColorPicker colorString={$ColorEffectStore.icons[singleIconName].colorEffects[stageIndex].iconColor}
          updateFunction={(hexColor) => ColorEffectStore.updateColorSetting(singleIconName, stageIndex, "iconColor", hexColor)}
        />
    </div>
    <div>
      <p class="text-base text-center mb-2">{$LocaleStore.statusIcons.icon_contrast}</p>
      <NumberInput min={0} max={300} bind:value={$ColorEffectStore.icons[singleIconName].colorEffects[stageIndex].iconContrast}
        handleUpdateFunction={(contrastAmount) => ColorEffectStore.updateColorSetting(singleIconName, stageIndex, "iconContrast", contrastAmount)}
      />
    </div>
    <div>
      <p class="text-base text-center mb-2">{$LocaleStore.statusIcons.icon_shadow}</p>
      <NumberInput min={0} max={20} bind:value={$ColorEffectStore.icons[singleIconName].colorEffects[stageIndex].iconDropShadowAmount}
        handleUpdateFunction={(dropAmount) => ColorEffectStore.updateColorSetting(singleIconName, stageIndex, "iconDropShadowAmount", dropAmount)}
      />
    </div>

    <div class="flex flex-col mx-auto">
      <p class="text-base text-center mb-2">{$LocaleStore.statusIcons.outline_color}</p>
      <ColorPicker colorString={$ColorEffectStore.icons[singleIconName].colorEffects[stageIndex].outlineColor}
        updateFunction={(hexColor) => ColorEffectStore.updateColorSetting(singleIconName, stageIndex, "outlineColor", hexColor)}
      />
    </div>
    <div>
      <p class="text-base text-center mb-2">{$LocaleStore.statusIcons.outline_contrast}</p>
      <NumberInput min={0} max={300} bind:value={$ColorEffectStore.icons[singleIconName].colorEffects[stageIndex].outlineContrast}
        handleUpdateFunction={(contrastAmount) => ColorEffectStore.updateColorSetting(singleIconName, stageIndex, "outlineContrast", contrastAmount)}
      />
    </div>
    <div>
      <p class="text-base text-center mb-2">{$LocaleStore.statusIcons.outline_shadow}</p>
      <NumberInput min={0} max={20} bind:value={$ColorEffectStore.icons[singleIconName].colorEffects[stageIndex].outlineDropShadowAmount}
        handleUpdateFunction={(dropAmount) => ColorEffectStore.updateColorSetting(singleIconName, stageIndex, "outlineDropShadowAmount", dropAmount)}
      />
    </div>

    {#if $ColorEffectStore.icons[singleIconName].editableColors.innerColor}
      <div class="flex flex-col mx-auto">
        <p class="text-base text-center mb-2">{$LocaleStore.statusIcons.inner_color}</p>
          <ColorPicker colorString={$ColorEffectStore.icons[singleIconName].colorEffects[stageIndex].innerColor}
            updateFunction={(hexColor) => ColorEffectStore.updateColorSetting(singleIconName, stageIndex, "innerColor", hexColor)}
          />
      </div>
    {/if}
  </div>
</Panel>
<hr>