<script lang="ts">
  import Button from '../atoms/button.svelte';
  import ColorPicker from '../atoms/color-picker.svelte';
  import { shapes, iconNames } from '../../types/types';
  import { saveUIData } from '../../utils/eventHandler';
  import PlayerHudUIStore from '../../stores/playerStatusHudStore';
  import ColorEffectStore from '../../stores/colorEffectStore';
  import Select from '../atoms/select.svelte';
  import Switch from '../atoms/switch.svelte';
  import Panel from '../atoms/panel.svelte';
  import NumberInput from '../atoms/number-input.svelte';
  import { faGlobe } from '@fortawesome/free-solid-svg-icons';
  import Fa from 'svelte-fa';

  let group = '';

  let iconPanelColors: Array<string> = [
    "#FFFFFF", "rgb(33, 171, 97)", "#326dbf", "#dd6e14", "#1a7cad", "rgb(220, 6, 6)", 
    "rgb(138, 168, 189)", "rgb(255, 72, 133)", "rgb(185, 255, 40)", "#3FA554", 
    "rgb(182, 72, 255)", "rgb(255, 72, 133)", "#D64763", "rgb(0, 0, 0)"
  ]; 

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
      <Button name="Save Changes" buttonClass={"h-10"} disable={$PlayerHudUIStore.saveUIState == "ready" ? false : true}
        on:click={() => {saveUIData(); $PlayerHudUIStore.saveUIState = "updating"}}
      />
    </div>
  </div>

  <div class="flex justify-center mb-8">
    <div class="w-50">
      <p class="text-lg text-center mb-2">Icon Shape</p>
      <Select valuesArray={shapes} value={$PlayerHudUIStore.globalIconSettings.shape}
        handleSelectFunction={PlayerHudUIStore.updateAllShapes}
      />
    </div>
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

  <div class="mx-4 my-6 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
    <div class="flex flex-col mx-auto">
      <p class="text-base text-center mb-2">Progress Color</p>
      <ColorPicker colorString={$PlayerHudUIStore.globalIconSettings.progressColor}
        updateFunction={(hexColor) => PlayerHudUIStore.updateAllProgressColor(hexColor)}
      />
    </div>
    <div class="flex flex-col mx-auto">
      <p class="text-base text-center mb-2">Icon Color</p>
        <ColorPicker colorString={$PlayerHudUIStore.globalIconSettings.iconColor} updateFunction={(hexColor) => PlayerHudUIStore.updateAllIconColor(hexColor)}/>
    </div>

    <div class="flex flex-col mx-auto">
      <p class="text-base text-center mb-2">Outline Color</p>
      <ColorPicker colorString={$PlayerHudUIStore.globalIconSettings.outlineColor} updateFunction={(hexColor) => PlayerHudUIStore.updateAllOutlineColor(hexColor)}/>
    </div>

  </div>




  <hr>

  {#each iconNames as name, i}
    <Panel name={`${name}`} icon={$PlayerHudUIStore.icons[name].icon} color={iconPanelColors[i]} bind:group>
      <div class="flex justify-center mb-8">
        <div class="w-50">
          <p class="text-lg text-center mb-2">Change Icon Shape</p>
          <Select valuesArray={shapes} value={$PlayerHudUIStore.icons[name].shape}
            handleSelectFunction={(shapeName) => PlayerHudUIStore.updateIconShape(name, shapeName)}
          />
        </div>
      </div>

      <div class="mx-4 mb-8 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 items-end justify-center">
        <div>
          <p class="text-base text-center mb-2">Change Width Size</p>
          <NumberInput min={1} max={200} bind:value={$PlayerHudUIStore.icons[name].width}/>
        </div>
        <div>
          <p class="text-base text-center mb-2">Change Height Size</p>
          <NumberInput min={1} max={200} bind:value={$PlayerHudUIStore.icons[name].height}/>
        </div>

        {#if $PlayerHudUIStore.icons[name].ringSize != null}
          <div>
            <p class="text-base text-center mb-2">Change Ring Size</p>
            <NumberInput min={1} max={25} bind:value={$PlayerHudUIStore.icons[name].ringSize} step={0.5}/>
          </div>
        {/if}

        {#if $PlayerHudUIStore.icons[name].displayOutline != null }
          <div>
            <p class="text-base text-center mb-2">Show Progress Outline</p>
            <Switch center={true} checked={$PlayerHudUIStore.icons[name].displayOutline}
              handleUpdateFunction={(val) => PlayerHudUIStore.updateIconSetting(name, "displayOutline", val)}/>
          </div>
        {/if}

        <div class="h-1/2 w-2/3 flex flex-col mx-auto">
          <p class="text-base text-center mb-2">Change Progress Color</p>
          <ColorPicker colorString={$ColorEffectStore[name].colorEffects[0].color}
            updateFunction={(hexColor) => {
              ColorEffectStore.updateProgressColor(name, 0, hexColor);
            }}
          />
        </div>

        <div>
          <p class="text-base text-center mb-2">Change X-axis Position</p>
          <NumberInput min={-20} max={20} bind:value={$PlayerHudUIStore.icons[name].translateX} step={0.25}/>
        </div>
        <div>
          <p class="text-base text-center mb-2">Change Y-axis Position</p>
          <NumberInput min={-20} max={20} bind:value={$PlayerHudUIStore.icons[name].translateY} step={0.25}/>
        </div>
        <div>
          <p class="text-base text-center mb-2">Change Rotation</p>
          <NumberInput min={0} max={360} bind:value={$PlayerHudUIStore.icons[name].rotateDegree}/>
        </div>
        <div class="h-1/2 w-2/3 flex flex-col mx-auto">
          <p class="text-base text-center mb-2">Change Inner Color</p>
          <ColorPicker colorString={$PlayerHudUIStore.icons[name].outlineColor}
            updateFunction={(hexColor) => PlayerHudUIStore.updateIconSetting(name, "outlineColor", hexColor)}
          />
        </div>

        <div>
          <p class="text-base text-center mb-2">Change Icon X-axis Position</p>
          <NumberInput min={-10} max={10} bind:value={$PlayerHudUIStore.icons[name].iconTranslateX} step={0.01}/>
        </div>
        <div>
          <p class="text-base text-center mb-2">Change Icon Y-axis Position</p>
          <NumberInput min={-10} max={10} bind:value={$PlayerHudUIStore.icons[name].iconTranslateY} step={0.01}/>
        </div>
        <div>
          <p class="text-base text-center mb-2">Change Icon Size</p>
          <NumberInput min={0} max={3} bind:value={$PlayerHudUIStore.icons[name].iconScaling} step={0.01}/>
        </div>
        <div class="h-1/2 w-2/3 flex flex-col mx-auto">
          <p class="text-base text-center mb-2">Change Icon Color</p>
            <ColorPicker colorString={$PlayerHudUIStore.icons[name].iconColor}
              updateFunction={(hexColor) => PlayerHudUIStore.updateIconSetting(name, "iconColor", hexColor)}
            />
        </div>

        {#if $PlayerHudUIStore.icons[name].xAxisRound != null}
        <div>
          <p class="text-base text-center mb-2">Change X-axis Curve</p>
          <NumberInput min={0} max={100} bind:value={$PlayerHudUIStore.icons[name].xAxisRound}/>
        </div>
        {/if}

        {#if $PlayerHudUIStore.icons[name].yAxisRound != null}
        <div>
          <p class="text-base text-center mb-2">Change Y-axis Curve</p>
          <NumberInput min={0} max={100} bind:value={$PlayerHudUIStore.icons[name].yAxisRound}/>
        </div>
        {/if}
      </div>
    </Panel>
    {#if i < iconNames.length-1}
      <hr>
    {/if}
  {/each}
</div>

