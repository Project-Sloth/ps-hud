<script lang="ts">
  import { fade } from 'svelte/transition';
  import VehicleHudStore from '../stores/vehicleHudStore'

  // TODO see if most of these components can be under the same responsive class div, need to test once this is working
</script>

{#if $VehicleHudStore.show}
  <div class="responsive" id="speedometer">
      <!-- <q-circular-progress class="q-ml-xl" style="transform: rotate(-150deg); opacity: 60%;" :value="speedometer" size="70px" :thickness="0.21" color="gauge" :min="0" :max="100"></q-circular-progress>
      <q-circular-progress class="q-ml-xl" style="transform: rotate(-150deg); left: -50%;" show-value :value="speed" size="70px" :thickness="0.21" color="gauge" :min="0" :max="600"> -->
      <span class="speed">{$VehicleHudStore.speed}</span>
  </div>
  <div class="responsive" id="fuelgauge">
      <!-- <q-circular-progress class="q-ml-xl" style="transform: rotate(-125deg); opacity: 60%;" :value="fuelgauge" size="36px" :thickness="0.21" color="gauge" :min="0" :max="100"></q-circular-progress>
      <q-circular-progress class="q-ml-xl" style="transform: rotate(-125deg); left: -50%;" show-value :value="fuel" size="36px" :thickness="0.21" :style="{color: fuelColor}"> -->
      <!-- <q-icon name="fas fa-gas-pump" style="transform: rotate(125deg);" size="14px" color="white"/> -->
  </div>
  
  {#if $VehicleHudStore.showAltitude}
    <div class="responsive" id="altitudegauge" v-if="showAltitude">
        <!-- <q-circular-progress class="q-ml-xl" style="transform: rotate(-135deg); opacity: 60%;" :value="altitudegauge" size="70px" :thickness="0.21" color="gauge" :min="0" :max="100"></q-circular-progress>
        <q-circular-progress class="q-ml-xl" style="transform: rotate(-135deg); left: -50%;" show-value :value="altitude" size="70px" :thickness="0.21" color="gauge" :min="0" :max="750"> -->
        <span class="altitude">{$VehicleHudStore.altitude}</span>
    </div>
  {/if}

  <div transition:fade|local="{{duration: 1000}}">
    {#if $VehicleHudStore.showSeatBelt}
      <div class="responsive" id="seatbelt">
          <!-- <q-circular-progress class="q-ml-xl" style="transform: rotate(-125deg); opacity: 60%;" size="70px" :thickness="0.21" color="gauge" :min="0" :max="100"></q-circular-progress>
          <q-circular-progress class="q-ml-xl" style="transform: rotate(-125deg); left: -40%;" show-value size="70px" :thickness="0.21" color="gauge" :min="0" :max="750">
          <q-icon name="fas fa-user-slash" style="transform: rotate(125deg);" :value="seatbelt" size="21px" :style="{color: seatbeltColor}"/> -->
      </div>
    {/if}
  </div>
{/if}

<style>
  .responsive {
    position: absolute!important;
  }
  @media (min-width: 800px) {
  .responsive {
    margin-left: 32vh!important;
    transform: scale(1, 1);
    bottom: 6.9vh!important;
  }
  #speedometer {
    position: relative;
    left: 2.5vh!important;
  }
  #fuelgauge {
    position: relative;
    left: 7vh!important;
    bottom: 6.7vh!important;
  }
  #altitudegauge {
    position: relative;
    left: 11vh!important;
  }
  #seatbelt {
    position: relative;
    left: 8.5vh!important;
  }
  .speed {
    font-size: 2vh!important;
  }
  .speed:after {
    font-size: 0.9vh!important;
  }
  .altitude {
    font-size: 2vh!important;
  }
  .altitude:after {
    font-size: 0.9vh!important;
  }
}

@media (width: 3840px) and (height: 2160px) {
  .responsive {
    margin-left: 32.8vh!important;
    transform: scale(1.3, 1.3);
    bottom: 7.6vh!important;
  }
  #speedometer {
    position: relative;
    left: 2.5vh!important;
  }
  #fuelgauge {
    position: relative;
    left: 5.3vh!important;
    bottom: 7.1vh!important;
  }
  #altitudegauge {
    position: relative;
    left: 8.2vh!important;
  }
  #seatbelt {
    position: relative;
    left: 6.5vh!important;
  }
  .speed {
    font-size: 1.2vh!important;
  }
  .speed:after {
    font-size: 0.6vh!important;
  }
  .altitude {
    font-size: 1.2vh!important;
  }
  .altitude:after {
    font-size: 0.6vh!important;
  }
}

@media (width: 3440px) and (height: 1440px) {
  .responsive {
    margin-left: 33vh!important;
    transform: scale(1.3, 1.3);
    bottom: 7.6vh!important;
  }
  #speedometer {
    position: relative;
    left: 2.5vh!important;
  }
  #fuelgauge {
    position: relative;
    left: 6.4vh!important;
    bottom: 6.85vh!important;
  }
  #altitudegauge {
    position: relative;
    left: 11.2vh!important;
  }
  #seatbelt {
    position: relative;
    left: 8.8vh!important;
  }
  .speed {
    font-size: 1.4vh!important;
  }
  .speed:after {
    font-size: 0.7vh!important;
  }
  .altitude {
    font-size: 1.4vh!important;
  }
  .altitude:after {
    font-size: 0.7vh!important;
  }
}

@media (width: 2560px) and (height: 1440px) {
  .responsive {
    margin-left: 33.5vh!important;
    transform: scale(1.3, 1.3);
    bottom: 7.2vh!important;
  }
  #speedometer {
    position: relative;
    left: 2.5vh!important;
  }
  #fuelgauge {
    position: relative;
    left: 6.3vh!important;
    bottom: 6.5vh!important;
  }
  #altitudegauge {
    position: relative;
    left: 11vh!important;
  }
  #seatbelt {
    position: relative;
    left: 8.8vh!important;
  }
  .speed {
    font-size: 1.4vh!important;
  }
  .speed:after {
    font-size: 0.7vh!important;
  }
  .altitude {
    font-size: 1.4vh!important;
  }
  .altitude:after {
    font-size: 0.7vh!important;
  }
}

@media (width: 1920px) and (height: 1440px) {
  .responsive {
    margin-left: 32vh!important;
    transform: scale(1.2, 1.2);
    bottom: 7.4vh!important;
  }
  #speedometer {
    position: relative;
    left: 2.5vh!important;
  }
  #fuelgauge {
    position: relative;
    left: 6.3vh!important;
    bottom: 6.9vh!important;
  }
  #altitudegauge {
    position: relative;
    left: 10vh!important;
  }
  #seatbelt {
    position: relative;
    left: 8vh!important;
  }
  .speed {
    font-size: 1.6vh!important;
  }
  .speed:after {
    font-size: 0.7vh!important;
  }
  .altitude {
    font-size: 1.6vh!important;
  }
  .altitude:after {
    font-size: 0.7vh!important;
  }
}

@media (width: 1920px) and (height: 1200px) {
  .responsive {
    margin-left: 31.5vh!important;
    transform: scale(1, 1);
    bottom: 6.4vh!important;
  }
  #speedometer {
    position: relative;
    left: 2.5vh!important;
  }
  #fuelgauge {
    position: relative;
    left: 6.6vh!important;
    bottom: 6.05vh!important;
  }
  #altitudegauge {
    position: relative;
    left: 10vh!important;
  }
  #seatbelt {
    position: relative;
    left: 8vh!important;
  }
  .speed {
    font-size: 1.8vh!important;
  }
  .speed:after {
    font-size: 0.8vh!important;
  }
  .altitude {
    font-size: 1.8vh!important;
  }
  .altitude:after {
    font-size: 0.8vh!important;
  }
}

@media (width: 1920px) and (height: 1080px) {
  .responsive {
    margin-left: 32vh!important;
    transform: scale(1, 1);
    bottom: 6.9vh!important;
  }
  #speedometer {
    position: relative;
    left: 2.5vh!important;
  }
  #fuelgauge {
    position: relative;
    left: 7.2vh!important;
    bottom: 6.6vh!important;
  }
  #altitudegauge {
    position: relative;
    left: 11vh!important;
  }
  #seatbelt {
    position: relative;
    left: 8.5vh!important;
  }
  .speed {
    font-size: 2vh!important;
  }
  .speed:after {
    font-size: 1.2vh!important;
  }
  .altitude {
    font-size: 2vh!important;
  }
  .altitude:after {
    font-size: 0.9vh!important;
  }
}

@media (width: 1280px) and (height: 720px) {
  .responsive {
    margin-left: 30vh!important;
    transform: scale(0.65, 0.65);
    bottom: 4.7vh!important;
  }
  #speedometer {
    position: relative;
    left: 2.5vh!important;
  }
  #fuelgauge {
    position: relative;
    left: 8.6vh!important;
    bottom: 5.2vh!important;
  }
  #altitudegauge {
    position: relative;
    left: 11vh!important;
  }
  #seatbelt {
    position: relative;
    left: 8.5vh!important;
  }
  .speed {
    font-size: 3vh!important;
  }
  .speed:after {
    font-size: 1.4vh!important;
  }
  .altitude {
    font-size: 3vh!important;
  }
  .altitude:after {
    font-size: 1.4vh!important;
  }
}
</style>