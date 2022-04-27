<script lang="ts">
  import Button from '../atoms/button.svelte'
  import Checkbox from '../atoms/checkbox.svelte'
  import QBCoreLogo from '../atoms/qbcore-logo.svelte'
  import Switch from '../atoms/switch.svelte'
  import MenuStore from '../../stores/menuStore';
  import { fetchNui } from '../../utils/eventHandler';
</script>

<div class="text-sm flex flex-col text-[#e8e8e8]">
  <div class="mx-4 mb-5 mt-3">
    <div class="float-right w-[25%]">
      <QBCoreLogo />
    </div>
    <div class="-mx-4 mb-4 text-2xl text-white">
      <p>Reset HUD </p>
    </div>
    <Button name="Reset Settings"/>
    <p class="text-base">If you want to reset your settings back to default; click this shiny button!</p>
    <p class="text-base">(you will have to relog for your menu to reset changes successfully)</p>
  
    <Button name="Reset Hud"/>
    <p class="text-base">If your hud is acting up, give it a good ol' reset! Or you can do /resethud</p>
  </div>

  <hr>

  <div class="my-3 text-xl text-white">
    <p>Options</p>
  </div>
  <div class="mx-4 mb-4 flex flex-col">
    <Checkbox bind:value={$MenuStore.isOutMapChecked}
      primaryText={"Show Minimap Only in Vehicle"}
      secondaryText={"Disabling this will always keep your minimap on your screen"}
      on:click={() => { fetchNui("showOutMap") }}
    />
    <Checkbox bind:value={$MenuStore.isOutCompassChecked}
      primaryText={"Show Compass Only in Vehicle"}
      secondaryText={"Disabling this will always keep your compass on your screen"}
      on:click={() => { fetchNui("showOutCompass") }}
    />
    <Checkbox bind:value={$MenuStore.isCompassFollowChecked}
      primaryText={"Show Compass Follow Cam"}
      secondaryText={"Disabling this will make it so you can no longer use your mouse to rotate the compass around"}
      on:click={() => { fetchNui("showFollowCompass") }}
    />
  </div>

  <hr>

  <div class="my-3 text-xl text-white">
    <p>Notifications</p>
  </div>

  <div class="mx-4 mb-4 flex flex-col">
    <Checkbox bind:value={$MenuStore.isOpenMenuSoundsChecked}
      primaryText={"Menu Sound Effect Enabled"} on:click={() => {fetchNui("openMenuSounds")}}
    />
    <Checkbox bind:value={$MenuStore.isResetSoundsChecked}
      primaryText={"Reset Hud Sound Effects Enabled"} on:click={() => { fetchNui("resetHudSounds") }}
    />
    <Checkbox bind:value={$MenuStore.isListSoundsChecked}
      primaryText={"GUI Sound Effects Enabled"} on:click={() => { fetchNui("checklistSounds") }}
    />
    <Checkbox bind:value={$MenuStore.isMapNotifyChecked}
      primaryText={"Map Notifications Enabled"} on:click={() => { fetchNui("showMapNotif") }}
    />
    <Checkbox bind:value={$MenuStore.isLowFuelAlertChecked}
      primaryText={"Low Fuel Alert Enabled"} on:click={() => { fetchNui("showFuelAlert") }}
    />
    <Checkbox bind:value={$MenuStore.isCinematicNotifyChecked}
      primaryText={"Cinematic Mode Notifications"} on:click={() => { fetchNui("showCinematicNotif") }}
    />
  </div>

  <hr>

  <div class="my-3 text-xl text-white">
    <p>Status</p>
  </div>
  <div class="mx-4 mb-4 flex flex-col">
    <Checkbox bind:value={$MenuStore.isStaticHealthChecked}
      primaryText={"Show Health Always"} on:click={() => { fetchNui("dynamicHealth") }}
    />
    <Checkbox bind:value={$MenuStore.isStaticArmorChecked}
      primaryText={"Show Armor Always"} on:click={() => { fetchNui("dynamicArmor") }}
    />
    <Checkbox bind:value={$MenuStore.isStaticHungerChecked}
      primaryText={"Show Hunger Always"} on:click={() => { fetchNui("dynamicHunger") }}
    />
    <Checkbox bind:value={$MenuStore.isStaticThirstChecked}
      primaryText={"Show Thirst Always"} on:click={() => { fetchNui("dynamicThirst") }}
    />
    <Checkbox bind:value={$MenuStore.isStaticStressChecked}
      primaryText={"Show Stress Always"} on:click={() => { fetchNui("dynamicStress") }}
    />
    <Checkbox bind:value={$MenuStore.isStaticOxygenChecked}
      primaryText={"Show Oxygen Always"} on:click={() => { fetchNui("dynamicOxygen") }}
    />
  </div>

  <hr>

  <div class="my-3 text-xl text-white">
    <p>Vehicle</p>
  </div>
  <div class="mx-4 mb-4 flex flex-col">
    <Switch text="Speedometer FPS Synced" on:click={() => { fetchNui("changeFPS") }}/>
    <p class="font-semibold text-base">
      Synced FPS option will result in less optimization, but keep your speedometer in real time, however, it will also be more demanding on your machine.
    </p>
    <Switch text="Minimap Square" on:click={() => { fetchNui("ToggleMapShape") }}/>
    <p class="font-semibold text-base">
      Whether it's square or circle you desire, you have the ability to choose!
    </p>
    <Checkbox bind:value={$MenuStore.isHideMapChecked}
      primaryText={"Minimap Enabled"} on:click={() => { fetchNui("HideMap") }}
    />
    <Checkbox bind:value={$MenuStore.isToggleMapBordersChecked}
      primaryText={"Minimap Borders Enabled"} on:click={() => { fetchNui("ToggleMapBorders") }}
    />
    <Checkbox bind:value={$MenuStore.isStaticEngineChecked}
      primaryText={"Show Engine Always"} on:click={() => { fetchNui("dynamicEngine") }}
    />
    <Checkbox bind:value={$MenuStore.isStaticNitroChecked}
      primaryText={"Show Nitro Always"} on:click={() => { fetchNui("dynamicNitro") }}
    />
  </div>

  <hr>

  <div class="my-3 text-xl text-white">
    <p>Compass</p>
  </div>
  <div class="mx-4 mb-4 flex flex-col">
    <Switch text="Compass FPS Optimized" on:click={() => { fetchNui("changeCompassFPS") }}/>
    <p class="font-semibold text-base mb-1">
      Synced FPS option will result in less optimization, but keep your compass in real time, however, it will also be more demanding on your machine.
    </p>
    <Checkbox bind:value={$MenuStore.isShowCompassChecked}
      primaryText={"Compass Enabled"} on:click={() => { fetchNui("showCompassBase") }}
      secondaryText={"Disabling this will make it so you can't see the compass navigation"}
    />
    <Checkbox bind:value={$MenuStore.isShowStreetsChecked}
      primaryText={"Show Street Names Enabled"} on:click={() => { fetchNui("showStreetsNames") }}
      secondaryText={"Disabling this will make it so you can't see the street names / locations"}
    />
    <Checkbox bind:value={$MenuStore.isPointerShowChecked}
      primaryText={"Show Compass Pointer Enabled"} on:click={() => { fetchNui("showPointerIndex") }}
      secondaryText={"Disabling this will make it so you can't see your pointer index to pinpoint your exact cardinal directions"}
    />
    <Checkbox bind:value={$MenuStore.isDegreesShowChecked}
      primaryText={"Show Compass Degrrees Enabled"} on:click={() => { fetchNui("showDegreesNum") }}
      secondaryText={"Disabling this will make it so you can't see your exact degrees"}
    />
  </div>

  <hr>

  <div class="my-3 text-xl text-white">
    <p>Cinematic Mode</p>
  </div>
  <div class="mx-4 mb-4 flex flex-col gap-5">
    <Checkbox bind:value={$MenuStore.isCineamticModeChecked}
      primaryText={"Enabled"} on:click={() => { fetchNui("cinematicMode") }}
    />
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