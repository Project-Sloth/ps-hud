<script lang="ts">
  import Button from '../atoms/button.svelte';
  import ColorPicker from '../atoms/color-picker.svelte';
  import { shapes, iconNamesKind, iconNames } from '../../types/types';
  import { saveUIDataToServer } from '../../utils/eventHandler';
  import PlayerHudUIStore from '../../stores/playerStatusHudStore';
  import ColorEffectStore from '../../stores/colorEffectStore';
  import MenuStore from '../../stores/menuStore';
  import Select from '../atoms/select.svelte';
  import Switch from '../atoms/switch.svelte';
  import NumberInput from '../atoms/number-input.svelte';
  import { faGlobe, faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons';
  import Fa from 'svelte-fa';

  let iconIndex: number = 0;
  let iconColors: Array<string> = [
    "#FFFFFF", "rgb(33, 171, 97)", "#326dbf", "#dd6e14", "#1a7cad", "rgb(220, 6, 6)", 
    "rgb(138, 168, 189)", "rgb(255, 72, 133)", "rgb(185, 255, 40)", "#3FA554", 
    "rgb(182, 72, 255)", "rgb(255, 72, 133)", "#D64763", "rgb(0, 0, 0)"
  ];

  let singleIconName: iconNamesKind = "voice";
  let stageIndex: number = 0;
  let colorArray: Array<any> = $ColorEffectStore.icons[singleIconName].colorEffects;
  let colorStatesArray: Array<string> = colorArray.map(x => x.name);
  let currentState: string = colorStatesArray[stageIndex];

  $: $ColorEffectStore.globalColorSettings.editSingleIconStage = stageIndex;
  $: $ColorEffectStore.globalColorSettings.editSingleIconName = singleIconName;

  $: {
    colorArray = $ColorEffectStore.icons[singleIconName].colorEffects;
    colorStatesArray = colorArray.map(x => x.name);
  }

</script>

<div class="text-sm flex flex-col text-[#e8e8e8] select-none">
  <div class="my-3 text-2xl text-white flex flex-row">
    <div class="flex-1 flex min-w-min">
      <div>
        <div class="flex flex-row items-center">
            <Fa icon={faGlobe} scale={1}/>
          <p class="ml-3 p-0">Global Icons Settings</p>
        </div>
      </div>
    </div>
    <div class="text-base">
      <p>Design Mode</p>
      <Switch center bind:checked={$PlayerHudUIStore.designMode}/>
    </div>
    <div class="flex flex-1 min-w-min justify-end">
      {#if $MenuStore.adminOnly && $MenuStore.isAdmin}
        <Button name="Save Changes To Server" buttonClass={"h-10 w-55 whitespace-nowrap"} disable={$PlayerHudUIStore.saveUIState == "ready" ? false : true}
          on:click={() => { saveUIDataToServer(); $PlayerHudUIStore.saveUIState = "updating" }}
        />
      {/if}
    </div>
  </div>


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
    <p class="text-xl font-bold">Size & Position Section</p>
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
    <p class="text-xl font-bold">Color Section</p>
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

  
  


  <hr>
  <div class="mt-4 text-2xl flex flex-row items-center text-white">
    <div class="min-w-8 flex justify-center">
      <Fa icon={$PlayerHudUIStore.icons[singleIconName].icon} scale={0.9} color={iconColors[iconIndex]}/>
    </div>
    <p class="text-2xl ml-1 p-0">Single Icon Settings</p>
  </div>

  <div class="flex flex-row mb-8 mt-4">
    <div class="flex-1">
      <div class="max-w-50 ml-8">
        <p class="text-lg text-center mb-2">Icon Status To Edit</p>
        <Select valuesArray={iconNames} value={singleIconName}
          handleSelectFunction={(shapeName) => {
            singleIconName = shapeName;
            iconIndex = iconNames.findIndex((element) => element == shapeName);
            stageIndex = 0;
          }}
        />
      </div>
    </div>
    <div class="w-50">
      <p class="text-lg text-center mb-2">Icon Shape</p>
      <Select valuesArray={shapes} bind:value={$PlayerHudUIStore.icons[singleIconName].shape}
        handleSelectFunction={(shapeName) => {
          PlayerHudUIStore.updateIconShape(singleIconName, shapeName);
          ColorEffectStore.updateIconShapeEditableColor(singleIconName, shapeName);
        }}
      />
    </div>
    <div class="flex-1"></div>
  </div>

  <div class="mx-8">
    <p class="text-xl font-bold">Size & Position Section</p>
    <hr class="mb-6">
  </div>

  <div class="mx-4 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 items-end">
    <div>
      <p class="text-base text-center mb-2">Width Size</p>
      <NumberInput min={1} max={200} bind:value={$PlayerHudUIStore.icons[singleIconName].width}
        handleUpdateFunction={(val) => PlayerHudUIStore.updateIconSetting(singleIconName, "width", val)}
      />
    </div>
    <div>
      <p class="text-base text-center mb-2">Height Size</p>
      <NumberInput min={1} max={200} bind:value={$PlayerHudUIStore.icons[singleIconName].height}
        handleUpdateFunction={(val) => PlayerHudUIStore.updateIconSetting(singleIconName, "height", val)}
      />
    </div>

    {#if $PlayerHudUIStore.icons[singleIconName].ringSize != null}
      <div>
        <p class="text-base text-center mb-2">Ring Size</p>
        <NumberInput min={1} max={25} bind:value={$PlayerHudUIStore.icons[singleIconName].ringSize} step={0.5}
          handleUpdateFunction={(val) => PlayerHudUIStore.updateIconSetting(singleIconName, "ringSize", val)}
        />
      </div>
    {/if}

    {#if $PlayerHudUIStore.icons[singleIconName].displayOutline != null }
      <div>
        <p class="text-base text-center mb-2">Show Progress Outline</p>
        <Switch center={true} bind:checked={$PlayerHudUIStore.icons[singleIconName].displayOutline}
          handleUpdateFunction={(checked) => PlayerHudUIStore.updateIconSetting(singleIconName, "displayOutline", checked)}/>
      </div>
    {/if}

    <div>
      <p class="text-base text-center mb-2">X-axis Position</p>
      <NumberInput min={-20} max={20} bind:value={$PlayerHudUIStore.icons[singleIconName].translateX} step={0.25}
        handleUpdateFunction={(val) => PlayerHudUIStore.updateIconSetting(singleIconName, "translateX", val)}
      />
    </div>
    <div>
      <p class="text-base text-center mb-2">Y-axis Position</p>
      <NumberInput min={-20} max={20} bind:value={$PlayerHudUIStore.icons[singleIconName].translateY} step={0.25}
        handleUpdateFunction={(val) => PlayerHudUIStore.updateIconSetting(singleIconName, "translateY", val)}
      />
    </div>
    <div>
      <p class="text-base text-center mb-2">Rotation</p>
      <NumberInput min={0} max={360} bind:value={$PlayerHudUIStore.icons[singleIconName].rotateDegree}
        handleUpdateFunction={(val) => PlayerHudUIStore.updateIconSetting(singleIconName, "rotateDegree", val)}
      />
    </div>
    <div>
      <p class="text-base text-center mb-2">Icon X-axis Position</p>
      <NumberInput min={-10} max={10} bind:value={$PlayerHudUIStore.icons[singleIconName].iconTranslateX} step={0.01}
        handleUpdateFunction={(val) => PlayerHudUIStore.updateIconSetting(singleIconName, "iconTranslateX", val)}
      />
    </div>
    <div>
      <p class="text-base text-center mb-2">Icon Y-axis Position</p>
      <NumberInput min={-10} max={10} bind:value={$PlayerHudUIStore.icons[singleIconName].iconTranslateY} step={0.01}
        handleUpdateFunction={(val) => PlayerHudUIStore.updateIconSetting(singleIconName, "iconTranslateY", val)}
      />
    </div>
    <div>
      <p class="text-base text-center mb-2">Icon Size</p>
      <NumberInput min={0} max={3} bind:value={$PlayerHudUIStore.icons[singleIconName].iconScaling} step={0.01}
        handleUpdateFunction={(val) => PlayerHudUIStore.updateIconSetting(singleIconName, "iconScaling", val)}
      />
    </div>

    {#if $PlayerHudUIStore.icons[singleIconName].xAxisRound != null}
    <div>
      <p class="text-base text-center mb-2">X-axis Curve</p>
      <NumberInput min={0} max={100} bind:value={$PlayerHudUIStore.icons[singleIconName].xAxisRound}
        handleUpdateFunction={(val) => PlayerHudUIStore.updateIconSetting(singleIconName, "xAxisRound", val)}
      />
    </div>
    {/if}

    {#if $PlayerHudUIStore.icons[singleIconName].yAxisRound != null}
    <div>
      <p class="text-base text-center mb-2">Y-axis Curve</p>
      <NumberInput min={0} max={100} bind:value={$PlayerHudUIStore.icons[singleIconName].yAxisRound}
        handleUpdateFunction={(val) => PlayerHudUIStore.updateIconSetting(singleIconName, "yAxisRound", val)}
      />
    </div>
    {/if}
  </div>

  <!-- Colors Section -->
  <div class="mx-8 mt-8">
    <p class="text-xl font-bold">Color Section</p>
    <hr>
  </div>

  {#if colorArray.length > 1}
    <div class="flex flex-row justify-center mt-4">
      <div class="w-50">
        <p class="text-lg text-center mb-2">Icon State</p>
        <Select valuesArray={colorStatesArray} bind:value={currentState} bind:selectedIndex={stageIndex}/>
      </div>
    </div>
  {/if}

  <div class="mx-4 mt-6 mb-10 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">

    <div class="flex flex-col mx-auto">
      <p class="text-base text-center mb-2">Progress Color</p>
      <ColorPicker colorString={$ColorEffectStore.icons[singleIconName].colorEffects[stageIndex].progressColor}
        updateFunction={(hexColor) => ColorEffectStore.updateColorSetting(singleIconName, stageIndex, "progressColor", hexColor)}
      />
    </div>
    <div>
      <p class="text-base text-center mb-2">Progress Contrast</p>
      <NumberInput min={0} max={300} bind:value={$ColorEffectStore.icons[singleIconName].colorEffects[stageIndex].progressContrast}
        handleUpdateFunction={(contrastAmount) => ColorEffectStore.updateColorSetting(singleIconName, stageIndex, "progressContrast", contrastAmount)}
      />
    </div>
    <div>
      <p class="text-base text-center mb-2">Progress Shadow</p>
      <NumberInput min={0} max={20} bind:value={$ColorEffectStore.icons[singleIconName].colorEffects[stageIndex].progressDropShadowAmount}
        handleUpdateFunction={(dropAmount) => ColorEffectStore.updateColorSetting(singleIconName, stageIndex, "progressDropShadowAmount", dropAmount)}
      />
    </div>
    
    <div class="flex flex-col mx-auto">
      <p class="text-base text-center mb-2">Icon Color</p>
        <ColorPicker colorString={$ColorEffectStore.icons[singleIconName].colorEffects[stageIndex].iconColor}
          updateFunction={(hexColor) => ColorEffectStore.updateColorSetting(singleIconName, stageIndex, "iconColor", hexColor)}
        />
    </div>
    <div>
      <p class="text-base text-center mb-2">Icon Contrast</p>
      <NumberInput min={0} max={300} bind:value={$ColorEffectStore.icons[singleIconName].colorEffects[stageIndex].iconContrast}
        handleUpdateFunction={(contrastAmount) => ColorEffectStore.updateColorSetting(singleIconName, stageIndex, "iconContrast", contrastAmount)}
      />
    </div>
    <div>
      <p class="text-base text-center mb-2">Icon Shadow</p>
      <NumberInput min={0} max={20} bind:value={$ColorEffectStore.icons[singleIconName].colorEffects[stageIndex].iconDropShadowAmount}
        handleUpdateFunction={(dropAmount) => ColorEffectStore.updateColorSetting(singleIconName, stageIndex, "iconDropShadowAmount", dropAmount)}
      />
    </div>

    <div class="flex flex-col mx-auto">
      <p class="text-base text-center mb-2">Outline Color</p>
      <ColorPicker colorString={$ColorEffectStore.icons[singleIconName].colorEffects[stageIndex].outlineColor}
        updateFunction={(hexColor) => ColorEffectStore.updateColorSetting(singleIconName, stageIndex, "outlineColor", hexColor)}
      />
    </div>
    <div>
      <p class="text-base text-center mb-2">Outline Contrast</p>
      <NumberInput min={0} max={300} bind:value={$ColorEffectStore.icons[singleIconName].colorEffects[stageIndex].outlineContrast}
        handleUpdateFunction={(contrastAmount) => ColorEffectStore.updateColorSetting(singleIconName, stageIndex, "outlineContrast", contrastAmount)}
      />
    </div>
    <div>
      <p class="text-base text-center mb-2">Outline Shadow</p>
      <NumberInput min={0} max={20} bind:value={$ColorEffectStore.icons[singleIconName].colorEffects[stageIndex].outlineDropShadowAmount}
        handleUpdateFunction={(dropAmount) => ColorEffectStore.updateColorSetting(singleIconName, stageIndex, "outlineDropShadowAmount", dropAmount)}
      />
    </div>

    {#if $ColorEffectStore.icons[singleIconName].editableColors.innerColor}
      <div class="flex flex-col mx-auto">
        <p class="text-base text-center mb-2">Inner Color</p>
          <ColorPicker colorString={$ColorEffectStore.icons[singleIconName].colorEffects[stageIndex].innerColor}
            updateFunction={(hexColor) => ColorEffectStore.updateColorSetting(singleIconName, stageIndex, "innerColor", hexColor)}
          />
      </div>
    {/if}
  </div>

  <hr>
  <!-- Utilies Functions -->
  <div class="flex justify-center my-8">
    <Button name="copy progress colors to icon colors" buttonClass={"h-15 w-55"}
      on:click={() => {ColorEffectStore.updateIconColorToProgressColor()}}
    />
  </div>
</div>
