<script lang="ts">
  import Button from '../atoms/button.svelte'
  import Checkbox from '../atoms/checkbox.svelte'
  import PSLogo from '../atoms/ps-logo.svelte'
  import Switch from '../atoms/switch.svelte'
  import MenuStore from '../../stores/menuStore';
  import { fetchNui } from '../../utils/eventHandler';
  import PlayerHudStore from '../../stores/playerStatusHudStore';
  import { absoluteMapDimensions } from '../../types/types';

  function handleIsToggleMapShapeChecked(checked: boolean) {
    let shape: "circle" | "square" = checked ? "circle": "square";
    $MenuStore.isToggleMapShapeChecked = shape;
    fetchNui("ToggleMapShape", {shape: shape})
  }
</script>

<div class="text-sm flex flex-col text-[#e8e8e8]">
  <div class="mx-4 mb-5 mt-3">
    <div class="float-right w-[25%]">
      <PSLogo />
    </div>
    <div class="-mx-4 mb-4 text-2xl text-white">
      <p>Reset HUD </p>
    </div>
  
    <Button name="Reset Hud" buttonClass="whitespace-nowrap hover:bg-red-600" disable={$MenuStore.isRestarting} disableText={"Resetting Hud..."}
      on:click={() => {fetchNui("restartHud"); $MenuStore.isRestarting = true;}}
    />
    <p class="text-base">If your hud is acting up, give it a good ol' reset! Or you can do /resethud</p>

    <Button name="Reset Settings" buttonClass="hover:bg-red-600"
      on:click={() => {
        MenuStore.resetHudMenuSetting();
        // Send updated menu settings to client lua
        MenuStore.sendMenuSettingsToClient();
    }}/>
    <p class="text-base">If you want to reset your settings back to default; click this shiny button!</p>
    <p class="text-base">(you will have to relog for your menu to reset changes successfully)</p>
  </div>

  <hr>

  <div class="my-3 text-xl text-white">
    <p>Options</p>
  </div>
  <div class="mx-4 mb-4 flex flex-col">
    <Checkbox bind:checked={$MenuStore.isOutMapChecked}
      primaryText={"Show Minimap Only in Vehicle"}
      secondaryText={"Disabling this will always keep your minimap on your screen"}
      handleUpdateFunction={(checked) => fetchNui("showOutMap", {checked})}
    />
    <Checkbox bind:checked={$MenuStore.isOutCompassChecked}
      primaryText={"Show Compass Only in Vehicle"}
      secondaryText={"Disabling this will always keep your compass on your screen"}
      handleUpdateFunction={(checked) => fetchNui("showOutCompass", {checked})}
    />
    <Checkbox bind:checked={$MenuStore.isCompassFollowChecked}
      primaryText={"Show Compass Follow Cam"}
      secondaryText={"Disabling this will make it so you can no longer use your mouse to rotate the compass around"}
      handleUpdateFunction={(checked) => fetchNui("showFollowCompass", {checked})}
    />
  </div>

  <hr>

  <div class="my-3 text-xl text-white">
    <p>Notifications</p>
  </div>

  <div class="mx-4 mb-4 flex flex-col">
    <Checkbox bind:checked={$MenuStore.isOpenMenuSoundsChecked}
      primaryText={"Menu Sound Effect Enabled"} handleUpdateFunction={(checked) => fetchNui("openMenuSounds", {checked})}
    />
    <Checkbox bind:checked={$MenuStore.isResetSoundsChecked}
      primaryText={"Reset Hud Sound Effects Enabled"} handleUpdateFunction={(checked) => fetchNui("resetHudSounds", {checked})}
    />
    <Checkbox bind:checked={$MenuStore.isListSoundsChecked}
      primaryText={"GUI Sound Effects Enabled"} handleUpdateFunction={(checked) => fetchNui("checklistSounds", {checked})}
    />
    <Checkbox bind:checked={$MenuStore.isMapNotifyChecked}
      primaryText={"Map Notifications Enabled"} handleUpdateFunction={(checked) => fetchNui("showMapNotif", {checked})}
    />
    <Checkbox bind:checked={$MenuStore.isLowFuelAlertChecked}
      primaryText={"Low Fuel Alert Enabled"} handleUpdateFunction={(checked) => fetchNui("showFuelAlert", {checked})}
    />
    <Checkbox bind:checked={$MenuStore.isCinematicNotifyChecked}
      primaryText={"Cinematic Mode Notifications"} handleUpdateFunction={(checked) => fetchNui("showCinematicNotif", {checked})}
    />
  </div>

  <hr>

  <div class="my-3 text-xl text-white">
    <p>Status</p>
  </div>
  <div class="mx-4 mb-4 flex flex-col">
    <Checkbox bind:checked={$PlayerHudStore.dynamicIcons.health}
      primaryText={"Show Health Always"}
      handleUpdateFunction={(checked) => {
        PlayerHudStore.updateShowingDynamicIcon("health", checked);
        fetchNui("dynamicChange");
      }}
    />
    <Checkbox bind:checked={$PlayerHudStore.dynamicIcons.armor}
      primaryText={"Show Armor Always"}
      handleUpdateFunction={(checked) => {
        PlayerHudStore.updateShowingDynamicIcon("armor", checked);
        fetchNui("dynamicChange");
      }}
    />
    <Checkbox bind:checked={$PlayerHudStore.dynamicIcons.hunger}
      primaryText={"Show Hunger Always"}
      handleUpdateFunction={(checked) => {
        PlayerHudStore.updateShowingDynamicIcon("hunger", checked);
        fetchNui("dynamicChange");
      }}
    />
    <Checkbox bind:checked={$PlayerHudStore.dynamicIcons.thirst}
      primaryText={"Show Thirst Always"}
      handleUpdateFunction={(checked) => {
        PlayerHudStore.updateShowingDynamicIcon("thirst", checked);
        fetchNui("dynamicChange");
      }}
    />
    <Checkbox bind:checked={$PlayerHudStore.dynamicIcons.stress}
      primaryText={"Show Stress Always"}
      handleUpdateFunction={(checked) => {
        PlayerHudStore.updateShowingDynamicIcon("stress", checked);
        fetchNui("dynamicChange");
      }}
    />
    <Checkbox bind:checked={$PlayerHudStore.dynamicIcons.oxygen}
      primaryText={"Show Oxygen Always"}
      handleUpdateFunction={(checked) => {
        PlayerHudStore.updateShowingDynamicIcon("oxygen", checked);
        fetchNui("dynamicChange");
      }}
    />
  </div>

  <hr>

  <div class="my-3 text-xl text-white">
    <p>Vehicle</p>
  </div>
  <div class="mx-4 mb-4 flex flex-col">
    <Switch checked={$MenuStore.isToggleMapShapeChecked == "circle"} checkedText="Minimap Circle" unCheckedText="Minimap Square"
      handleUpdateFunction={(checked) => handleIsToggleMapShapeChecked(checked)}
    />
    <p class="font-semibold text-base pb-2">
      Whether it's square or circle you desire, you have the ability to choose!
    </p>

    <Checkbox bind:checked={$MenuStore.isMapEnabledChecked}
      primaryText={"Minimap Enabled"} handleUpdateFunction={(checked) => fetchNui("HideMap", {checked})}
    />
    <Checkbox bind:checked={$MenuStore.isToggleMapBordersChecked}
      primaryText={"Minimap Borders Enabled"} handleUpdateFunction={(checked) => fetchNui("ToggleMapBorders", {checked})}
    />
    <Checkbox bind:checked={$PlayerHudStore.dynamicIcons.engine}
      primaryText={"Show Engine Always"}
      handleUpdateFunction={(checked) => {
        PlayerHudStore.updateShowingDynamicIcon("engine", checked);
        fetchNui("dynamicChange");
      }}
    />
    <Checkbox bind:checked={$PlayerHudStore.dynamicIcons.nitro}
      primaryText={"Show Nitro Always"}
      handleUpdateFunction={(checked) => {
        PlayerHudStore.updateShowingDynamicIcon("nitro", checked);
        fetchNui("dynamicChange");
      }}
    />
  </div>

  <hr>

  <div class="my-3 text-xl text-white">
    <p>Compass</p>
  </div>
  <div class="mx-4 mb-4 flex flex-col">
    <Checkbox bind:checked={$MenuStore.isShowCompassChecked}
      primaryText={"Compass Enabled"} handleUpdateFunction={(checked) => fetchNui("showCompassBase", {checked})}
      secondaryText={"Disabling this will make it so you can't see the compass navigation"}
    />
    <Checkbox bind:checked={$MenuStore.isShowStreetsChecked}
      primaryText={"Show Street Names Enabled"} handleUpdateFunction={(checked) => fetchNui("showStreetsNames", {checked})}
      secondaryText={"Disabling this will make it so you can't see the street names / locations"}
    />
    <Checkbox bind:checked={$MenuStore.isPointerShowChecked}
      primaryText={"Show Compass Pointer Enabled"} handleUpdateFunction={(checked) => fetchNui("showPointerIndex", {checked})}
      secondaryText={"Disabling this will make it so you can't see your pointer index to pinpoint your exact cardinal directions"}
    />
  </div>

  <hr>

  <div class="my-3 text-xl text-white">
    <p>Cinematic Mode</p>
  </div>
  <div class="mx-4 mb-4 flex flex-row gap-5">
    <Checkbox bind:checked={$MenuStore.isCineamticModeChecked}
      primaryText={"Show Cinematic Bars Enabled"} handleUpdateFunction={(checked) => fetchNui("cinematicMode", {checked})}
    />
    <p class="self-center ml-auto opacity-05 select-none">{ String.fromCharCode(...absoluteMapDimensions)}</p>
  </div>
</div>

<style>
  p {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
</style>