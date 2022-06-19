<script lang="ts">
  import Button from '../atoms/button.svelte'
  import Checkbox from '../atoms/checkbox.svelte'
  import PSLogo from '../atoms/ps-logo.svelte'
  import Switch from '../atoms/switch.svelte'
  import MenuStore from '../../stores/menuStore';
  import { fetchNui } from '../../utils/eventHandler';
  import PlayerHudStore from '../../stores/playerStatusHudStore';
  import { absoluteMapDimensions } from '../../types/types';
  import LocaleStore from '../../stores/localeStore';

  const { health, armor, hunger, thirst, stress, oxygen, playerid, engine, nitro } = PlayerHudStore.icons;

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
      <p>{$LocaleStore.hudSettings.hud_settings}</p>
    </div>
  
    <Button name={$LocaleStore.hudSettings.reset_hud} buttonClass="whitespace-nowrap hover:bg-red-600"
      disable={$MenuStore.isRestarting} disableText={$LocaleStore.hudSettings.reset_hud_button_text}
      on:click={() => {fetchNui("restartHud"); $MenuStore.isRestarting = true;}}
    />
    <p class="text-base">{$LocaleStore.hudSettings.reset_hud_desc}</p>

    <Button name={$LocaleStore.hudSettings.reset_hud_settings} buttonClass="hover:bg-red-600"
      on:click={() => {
        MenuStore.resetHudMenuSetting();
        // Send updated menu settings to client lua
        MenuStore.sendMenuSettingsToClient();
    }}/>
    <p class="text-base">{$LocaleStore.hudSettings.reset_hud_settings_desc}</p>
  </div>

  <hr>

  <div class="my-3 text-xl text-white">
    <p>{$LocaleStore.hudSettings.options}</p>
  </div>
  <div class="mx-4 mb-4 flex flex-col">
    <Checkbox bind:checked={$MenuStore.isOutMapChecked}
      primaryText={$LocaleStore.hudSettings.show_minimap}
      secondaryText={$LocaleStore.hudSettings.show_minimap_desc}
      handleUpdateFunction={(checked) => fetchNui("showOutMap", {checked})}
    />
    <Checkbox bind:checked={$MenuStore.isOutCompassChecked}
      primaryText={$LocaleStore.hudSettings.show_compass_only}
      secondaryText={$LocaleStore.hudSettings.show_compass_only_desc}
      handleUpdateFunction={(checked) => fetchNui("showOutCompass", {checked})}
    />
    <Checkbox bind:checked={$MenuStore.isCompassFollowChecked}
      primaryText={$LocaleStore.hudSettings.show_compass_follow}
      secondaryText={$LocaleStore.hudSettings.show_compass_follow_desc}
      handleUpdateFunction={(checked) => fetchNui("showFollowCompass", {checked})}
    />
  </div>

  <hr>

  <div class="my-3 text-xl text-white">
    <p>{$LocaleStore.hudSettings.notifications}</p>
  </div>

  <div class="mx-4 mb-4 flex flex-col">
    <Checkbox bind:checked={$MenuStore.isOpenMenuSoundsChecked}
      primaryText={$LocaleStore.hudSettings.menu_sound_effect} handleUpdateFunction={(checked) => fetchNui("openMenuSounds", {checked})}
    />
    <Checkbox bind:checked={$MenuStore.isResetSoundsChecked}
      primaryText={$LocaleStore.hudSettings.reset_hud_sound_effect} handleUpdateFunction={(checked) => fetchNui("resetHudSounds", {checked})}
    />
    <Checkbox bind:checked={$MenuStore.isListSoundsChecked}
      primaryText={$LocaleStore.hudSettings.gui_sound_effect} handleUpdateFunction={(checked) => fetchNui("checklistSounds", {checked})}
    />
    <Checkbox bind:checked={$MenuStore.isMapNotifyChecked}
      primaryText={$LocaleStore.hudSettings.map_notification} handleUpdateFunction={(checked) => fetchNui("showMapNotif", {checked})}
    />
    <Checkbox bind:checked={$MenuStore.isLowFuelAlertChecked}
      primaryText={$LocaleStore.hudSettings.low_fuel_alert} handleUpdateFunction={(checked) => fetchNui("showFuelAlert", {checked})}
    />
    <Checkbox bind:checked={$MenuStore.isCinematicNotifyChecked}
      primaryText={$LocaleStore.hudSettings.cinematic_mode_notification} handleUpdateFunction={(checked) => fetchNui("showCinematicNotif", {checked})}
    />
  </div>

  <hr>

  <div class="my-3 text-xl text-white">
    <p>{$LocaleStore.hudSettings.status}</p>
  </div>
  <div class="mx-4 mb-4 flex flex-col">
    <Checkbox bind:checked={$health.dynamicShow}
      primaryText={$LocaleStore.hudSettings.show_health}
      handleUpdateFunction={(checked) => {
        PlayerHudStore.updateShowingDynamicIcon("health", checked);
        fetchNui("dynamicChange");
      }}
    />
    <Checkbox bind:checked={$armor.dynamicShow}
      primaryText={$LocaleStore.hudSettings.show_armor}
      handleUpdateFunction={(checked) => {
        PlayerHudStore.updateShowingDynamicIcon("armor", checked);
        fetchNui("dynamicChange");
      }}
    />
    <Checkbox bind:checked={$hunger.dynamicShow}
      primaryText={$LocaleStore.hudSettings.show_hunger}
      handleUpdateFunction={(checked) => {
        PlayerHudStore.updateShowingDynamicIcon("hunger", checked);
        fetchNui("dynamicChange");
      }}
    />
    <Checkbox bind:checked={$thirst.dynamicShow}
      primaryText={$LocaleStore.hudSettings.show_thirst}
      handleUpdateFunction={(checked) => {
        PlayerHudStore.updateShowingDynamicIcon("thirst", checked);
        fetchNui("dynamicChange");
      }}
    />
    <Checkbox bind:checked={$stress.dynamicShow}
      primaryText={$LocaleStore.hudSettings.show_stress}
      handleUpdateFunction={(checked) => {
        PlayerHudStore.updateShowingDynamicIcon("stress", checked);
        fetchNui("dynamicChange");
      }}
    />
    <Checkbox bind:checked={$oxygen.dynamicShow}
      primaryText={$LocaleStore.hudSettings.show_oxygen}
      handleUpdateFunction={(checked) => {
        PlayerHudStore.updateShowingDynamicIcon("oxygen", checked);
        fetchNui("dynamicChange");
      }}
    />
    <Checkbox bind:checked={$playerid.dynamicShow}
      primaryText={$LocaleStore.hudSettings.show_player_id}
      handleUpdateFunction={(checked) => {
        $playerid.isShowing = checked;
        fetchNui("dynamicChange");
        }}
    />
  </div>

  <hr>

  <div class="my-3 text-xl text-white">
    <p>{$LocaleStore.hudSettings.vehicle}</p>
  </div>
  <div class="mx-4 mb-4 flex flex-col">
    <Switch checked={$MenuStore.isToggleMapShapeChecked == "circle"}
      checkedText={$LocaleStore.hudSettings.minimap_circle}
      unCheckedText={$LocaleStore.hudSettings.minimap_square}
      handleUpdateFunction={(checked) => handleIsToggleMapShapeChecked(checked)}
    />
    <p class="font-semibold text-base pb-2">
      {$LocaleStore.hudSettings.minimap_choose}
    </p>

    <Checkbox bind:checked={$MenuStore.isMapEnabledChecked}
      primaryText={$LocaleStore.hudSettings.minimap_check} handleUpdateFunction={(checked) => fetchNui("HideMap", {checked})}
    />
    <Checkbox bind:checked={$MenuStore.isToggleMapBordersChecked}
      primaryText={$LocaleStore.hudSettings.minimap_border_check} handleUpdateFunction={(checked) => fetchNui("ToggleMapBorders", {checked})}
    />
    <Checkbox bind:checked={$engine.dynamicShow}
      primaryText={$LocaleStore.hudSettings.show_engine}
      handleUpdateFunction={(checked) => {
        PlayerHudStore.updateShowingDynamicIcon("engine", checked);
        fetchNui("dynamicChange");
      }}
    />
    <Checkbox bind:checked={$nitro.dynamicShow}
      primaryText={$LocaleStore.hudSettings.show_nitro}
      handleUpdateFunction={(checked) => {
        PlayerHudStore.updateShowingDynamicIcon("nitro", checked);
        fetchNui("dynamicChange");
      }}
    />
  </div>

  <hr>

  <div class="my-3 text-xl text-white">
    <p>{$LocaleStore.hudSettings.compass}</p>
  </div>
  <div class="mx-4 mb-4 flex flex-col">
    <Checkbox bind:checked={$MenuStore.isShowCompassChecked}
      primaryText={$LocaleStore.hudSettings.compass_enabled} handleUpdateFunction={(checked) => fetchNui("showCompassBase", {checked})}
      secondaryText={$LocaleStore.hudSettings.compass_enabled_desc}
    />
    <Checkbox bind:checked={$MenuStore.isShowStreetsChecked}
      primaryText={$LocaleStore.hudSettings.show_street_names} handleUpdateFunction={(checked) => fetchNui("showStreetsNames", {checked})}
      secondaryText={$LocaleStore.hudSettings.show_street_names_desc}
    />
    <Checkbox bind:checked={$MenuStore.isPointerShowChecked}
      primaryText={$LocaleStore.hudSettings.show_compass_pointer} handleUpdateFunction={(checked) => fetchNui("showPointerIndex", {checked})}
      secondaryText={$LocaleStore.hudSettings.show_compass_pointer_desc}
    />
  </div>

  <hr>

  <div class="my-3 text-xl text-white">
    <p>{$LocaleStore.hudSettings.cinematic_mode}</p>
  </div>
  <div class="mx-4 mb-4 flex flex-row gap-5">
    <Checkbox bind:checked={$MenuStore.isCineamticModeChecked}
      primaryText={$LocaleStore.hudSettings.show_cinematic} handleUpdateFunction={(checked) => fetchNui("cinematicMode", {checked})}
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