<script>
  import Button from '../atoms/button.svelte'
  import Checkbox from '../atoms/checkbox.svelte'
  import QBCoreLogo from '../../assets/qbcore_logo.svg'
  import Switch from '../atoms/switch.svelte'

</script>

<div class="text-sm flex flex-col text-[#e8e8e8]">
  <div class="mx-4 mb-5 mt-3">
    <img class="float-right w-[25%]" alt={"qbcore-logo"} src={QBCoreLogo}/>
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
    <Checkbox
      primaryText={"Show Minimap Only in Vehicle"}
      secondaryText={"Disabling this will always keep your minimap on your screen"}
    />
    <Checkbox
      primaryText={"Show Compass Only in Vehicle"}
      secondaryText={"Disabling this will always keep your compass on your screen"}
    />
    <Checkbox
      primaryText={"Show Compass Follow Cam"}
      secondaryText={"Disabling this will make it so you can no longer use your mouse to rotate the compass around"}
    />
  </div>

  <hr>

  <div class="my-3 text-xl text-white">
    <p>Notifications</p>
  </div>

  <div class="mx-4 mb-4 flex flex-col">
    <Checkbox primaryText={"Menu Sound Effect Enabled"} />
    <Checkbox primaryText={"Reset Hud Sound Effects Enabled"} />
    <Checkbox primaryText={"GUI Sound Effects Enabled"} />
    <Checkbox primaryText={"Map Notifications Enabled"} />
    <Checkbox primaryText={"Low Fuel Alert Enabled"} />
    <Checkbox primaryText={"Cinematic Mode Notifications"} />
  </div>

  <hr>

  <div class="my-3 text-xl text-white">
    <p>Status</p>
  </div>
  <div class="mx-4 mb-4 flex flex-col">
    <Checkbox primaryText={"Show Health Always"} />
    <Checkbox primaryText={"Show Armor Always"} />
    <Checkbox primaryText={"Show Hunger Always"} />
    <Checkbox primaryText={"Show Thirst Always"} />
    <Checkbox primaryText={"Show Stress Always"} />
    <Checkbox primaryText={"Show Oxygen Always"} />
  </div>

  <hr>

  <div class="my-3 text-xl text-white">
    <p>Vehicle</p>
  </div>
  <div class="mx-4 mb-4 flex flex-col">
    <Switch text="Speedometer FPS Synced"/>
    <p class="font-semibold text-base">
      Synced FPS option will result in less optimization, but keep your speedometer in real time, however, it will also be more demanding on your machine.
    </p>
    <Switch text="Minimap Square"/>
    <p class="font-semibold text-base">
      Whether it's square or circle you desire, you have the ability to choose!
    </p>
    <Checkbox primaryText={"Minimap Enabled"} />
    <Checkbox primaryText={"Minimap Borders Enabled"} />
    <Checkbox primaryText={"Show Engine Always"} />
    <Checkbox primaryText={"Show Nitro Always"} />
  </div>

  <hr>

  <div class="my-3 text-xl text-white">
    <p>Compass</p>
  </div>
  <div class="mx-4 mb-4 flex flex-col">
    <Switch text="Compass FPS Optimized"/>
    <p class="font-semibold text-base mb-1">
      Synced FPS option will result in less optimization, but keep your compass in real time, however, it will also be more demanding on your machine.
    </p>
    <Checkbox
      primaryText={"Compass Enabled"}
      secondaryText={"Disabling this will make it so you can't see the compass navigation"}
    />
    <Checkbox
      primaryText={"Show Street Names Enabled"}
      secondaryText={"Disabling this will make it so you can't see the street names / locations"}
    />
    <Checkbox
      primaryText={"Show Compass Pointer Enabled"}
      secondaryText={"Disabling this will make it so you can't see your pointer index to pinpoint your exact cardinal directions"}
    />
    <Checkbox
      primaryText={"Show Compass Degrrees Enabled"}
      secondaryText={"Disabling this will make it so you can't see your exact degrees"}
    />
  </div>

  <hr>

  <div class="my-3 text-xl text-white">
    <p>Cinematic Mode</p>
  </div>
  <div class="mx-4 mb-4 flex flex-col gap-5">
    <Checkbox primaryText={"Enabled"} />
  </div>
</div>