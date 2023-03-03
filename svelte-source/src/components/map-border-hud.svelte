<script lang="ts">
  import DebugStore from '../stores/debugStore';
  import VehicleHudStore from '../stores/vehicleHudStore';
</script>

{#if $VehicleHudStore.show || DebugStore}
  <div class="mapborder">
    {#if $VehicleHudStore.showSquareBorder || DebugStore}
      <div class="square" />
    {/if}
    {#if $VehicleHudStore.showCircleBorder}
      <div class="circle" />
    {/if}
  </div>
{/if}

<style>
  .mapborder {
    position: absolute;
    bottom: 7.9%;
    left: 1.3%;
    width: 0%;
    text-align: center;
  }

  .square {
    bottom: 6.30%;
    width: 29vh;
    height: 18.5vh;
    border: 4px solid #bababa;
    position: absolute;
    display: inline-block;
  }

  .circle {
    bottom: 6.9%;
    width: 27vh;
    height: 22.9vh;
    border: 4px solid #bababa;
    position: absolute;
    display: inline-block;
    border-radius: 50%;
  }

  @media (min-width: 800px) {
    .square {
      left: 2.5vh!important;
      bottom: 6%!important;
    }
    .circle {
      left: 3.2vh!important;
      width: 27.6vh!important;
      bottom: 6.9%!important;
    }
  }

  @media (width: 3840px) and (height: 2160px) {
    .square {
      left: 2.4vh!important;
      bottom: 6.1%!important;
      width: 29.3vh!important;
    }
    .circle {
      left: 3.6vh!important;
      width: 27.6vh!important;
      bottom: 6.9%!important;
    }
  }


  @media (width: 3440px) and (height: 1440px) {
    .square {
      left: 2.3vh!important;
      bottom: 6.1%!important;
      width: 29.3vh!important;
    }
    .circle {
      left: 3.5vh!important;
      width: 27.6vh!important;
      bottom: 6.9%!important;
    }
  }


  @media (width: 2560px) and (height: 1440px) {
    .square {
      left: 0.2vw!important;
      bottom: -1.8vh!important;
    }
    .circle {
      left: 0.75vw!important;
      width: 27.6vh!important;
      bottom: -1vh!important;
    }
  }

  @media (width: 2560px) and (height: 1080px) {
    .square {
        left: -0.25vw !important;
        bottom: -1.8vh !important;
    }
    .circle {
        left: 0.15vw !important;
        width: 27.6vh !important;
        bottom: -1vh !important;
    }
}

  @media (width: 1920px) and (height: 1440px) {
    .square {
      left: 0vw!important;
      bottom: -1.9vh!important;
    }
    .circle {
      left: 0.9vw!important;
      width: 27.6vh!important;
      bottom: -1vh!important;
    }
  }

  @media (width: 1920px) and (height: 1200px) {
    .square {
      left: 0.1vw!important;
      bottom: -2vh!important;
    }
    .circle {
      left: 0.8vw!important;
      width: 27.6vh!important;
      bottom: -1vh!important;
    }
  }

  @media (width: 1920px) and (height: 1080px) {
    .square {
      left: 0.1vw!important;
      bottom: -2vh!important;
    }
    .circle {
      left: 0.9vw!important;
      width: 27.3vh!important;
      bottom: -1vh!important;
    }
  }

  @media (width: 1280px) and (height: 720px) {
    .square {
      left: 0.1vw!important;
      bottom: -2vh!important;
    }
    .circle {
      left: 0.9vw!important;
      width: 27.6vh!important;
      bottom: -0.9vh!important;
    }
  }
</style>