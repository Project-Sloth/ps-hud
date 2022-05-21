<script lang="ts">
  import CompassHudStore from '../stores/compassHudStore'
  import DebugStore from '../stores/debugStore';
</script>


{#if $CompassHudStore.show || DebugStore}
  <div class="baseplateConainer">
    {#if $CompassHudStore.showStreets}
      <div class="street-container">
          <div class="street2">{$CompassHudStore.street2}</div>
          <div class="street1">{$CompassHudStore.street1}</div>
      </div>
    {/if}

    <div class="baseplate">
      {#if $CompassHudStore.showPointer}
        <div class="pointer">˅</div>
      {/if}
      
      {#if $CompassHudStore.showDegress}
        <div class="degrees"></div>
      {/if}

      {#if $CompassHudStore.showCompass}
        <svg class="bezel" viewBox="{$CompassHudStore.heading - 90} 0 180 5">
            <rect width="3"   stroke="black" fill="white" stroke-width="0.5" stroke-opacity="0.6" height="20" x="-90"/>
            <rect width="3"   stroke="black" fill="white" stroke-width="0.5" stroke-opacity="0.6" height="9"  x="-45"/>
            <rect width="4.5" stroke="black" fill="white" stroke-width="0.5" stroke-opacity="0.6" height="20" x="0"/>
            <rect width="3"   stroke="black" fill="white" stroke-width="0.5" stroke-opacity="0.6" height="9"  x="45"/>
            <rect width="4.5" stroke="black" fill="white" stroke-width="0.5" stroke-opacity="0.6" height="20" x="90"/>
            <rect width="3"   stroke="black" fill="white" stroke-width="0.5" stroke-opacity="0.6" height="9"  x="135"/>
            <rect width="4.5" stroke="black" fill="white" stroke-width="0.5" stroke-opacity="0.6" height="20" x="180"/>
            <rect width="3"   stroke="black" fill="white" stroke-width="0.5" stroke-opacity="0.6" height="9"  x="225"/>
            <rect width="4.5" stroke="black" fill="white" stroke-width="0.5" stroke-opacity="0.6" height="20" x="270"/>
            <rect width="3"   stroke="black" fill="white" stroke-width="0.5" stroke-opacity="0.6" height="9"  x="315"/>
            <rect width="4.5" stroke="black" fill="white" stroke-width="0.5" stroke-opacity="0.6" height="20" x="360"/>
            <rect width="3"   stroke="black" fill="white" stroke-width="0.5" stroke-opacity="0.6" height="9"  x="405"/>
            <rect width="3"   stroke="black" fill="white" stroke-width="0.5" stroke-opacity="0.6" height="20" x="450"/>
        </svg>

        <svg class="bearing" viewBox="{$CompassHudStore.heading - 90} 0 180 1.5">
            <text x="0"   y="1.5" dominant-baseline="middle" text-anchor="middle" fill="yellow">N</text>
            <text x="360" y="1.5" dominant-baseline="middle" text-anchor="middle" fill="yellow">N</text>
            <text x="315" y="-11" dominant-baseline="middle" text-anchor="middle" fill="white" class="bearingText">NW</text>
            <text x="-45" y="-11" dominant-baseline="middle" text-anchor="middle" fill="white" class="bearingText">NW</text>
            <text x="45"  y="-11" dominant-baseline="middle" text-anchor="middle" fill="white" class="bearingText">NE</text>
            <text x="405" y="-11" dominant-baseline="middle" text-anchor="middle" fill="white" class="bearingText">NE</text>
            <text x="90"  y="1.5" dominant-baseline="middle" text-anchor="middle" fill="white">E</text>
            <text x="135" y="-11" dominant-baseline="middle" text-anchor="middle" fill="white" class="bearingText">SE</text>
            <text x="180" y="1.5" dominant-baseline="middle" text-anchor="middle" fill="white">S</text>
            <text x="225" y="-11" dominant-baseline="middle" text-anchor="middle" fill="white" class="bearingText">SW</text>
            <text x="270" y="1.5" dominant-baseline="middle" text-anchor="middle" fill="white">W</text>
        </svg>
      {/if}
    </div>
  </div>
{/if}

<style>
  .baseplateConainer {
    position: absolute;
    margin: 0 auto;
    left: 0;
    right: 0;
    top: -0.8vh;
    width: 150px;
    height: auto;
  }

  .baseplate {
    position: relative;
  }

  .bearingText {
    font-size: 1.4vh!important;
    font-weight: 800!important;
  }

  .street-container {
    position: relative;
    top: 0.5vh;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 1.4vh;
    letter-spacing: 0.7px;
    text-decoration: none;
    font-style: normal;
    font-variant: small-caps;
    text-transform: none;
    font-weight: 800;
    text-shadow: 0 0 1px rgba(0, 0, 0, 0.6), 0 0 1px rgba(0, 0, 0, 0.6), 0 0 1px rgba(0, 0, 0, 0.6), 0 0 1px rgba(0, 0, 0, 0.6);
  }

  .street1 {
    position: absolute;
    margin: 0 auto;
    right: 55%;
    text-align: right!important;
    color: rgb(255, 255, 255);
  }

  .street2 {
    position: absolute;
    margin: 0 auto;
    left: 55%;
    text-align: left!important;
    color: rgb(255, 255, 255);
  }

  .pointer {
    position: absolute;
    margin: 0 auto;
    top: -2%;
    left: 0;
    right: 0;
    font-family: 'Yantramanav', sans-serif;
    color: rgb(255, 255, 255);
    font-size: 2.2vh;
    text-align: center;
    text-shadow: 0 0 1px rgba(0, 0, 0, 0.6), 0 0 1px rgba(0, 0, 0, 0.6), 0 0 1px rgba(0, 0, 0, 0.6), 0 0 1px rgba(0, 0, 0, 0.6);
    z-index: 9999;
  }

  .degrees {
    position: absolute;
    margin: 0 auto;
    top: 80%;
    left: 0;
    right: 0;
    opacity: 0.8;
    font-family: 'Yantramanav', sans-serif;
    color: rgb(255, 255, 255);
    font-size: 1.5vh;
    font-weight: 600;
    text-align: center;
    text-shadow: 0 0 1px rgb(0 0 0 / 60%), 0 0 1px rgb(0 0 0 / 60%), 0 0 1px rgb(0 0 0 / 60%), 0 0 1px rgb(0 0 0 / 60%);
  }

  .bezel {
    position: relative;
    width:100%;
    height: 2vh;
    font-family: 'Yantramanav', sans-serif;
    font-size: 0.35vh;
    font-weight: 700;
    text-shadow: 0 0 1px rgba(0, 0, 0, 0.6), 0 0 1px rgba(0, 0, 0, 0.6), 0 0 1px rgba(0, 0, 0, 0.6), 0 0 1px rgba(0, 0, 0, 0.6);
  }

  .bearing {
    position: relative;
    width:100%;
    top: -0.5vh;
    height: 3.5vh;
    padding-left: 0.12vw;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 2vh;
    letter-spacing: 0.7px;
    text-decoration: none;
    font-style: normal;
    font-variant: small-caps;
    text-transform: none;
    font-weight: 600;
    text-shadow: 0 0 1px rgba(0, 0, 0, 0.6), 0 0 1px rgba(0, 0, 0, 0.6), 0 0 1px rgba(0, 0, 0, 0.6), 0 0 1px rgba(0, 0, 0, 0.6);
  }
</style>