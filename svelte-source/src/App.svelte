<script lang="ts">
  import { onDestroy } from 'svelte';
  import MenuStore from "./stores/menuStore";
  import { EventHandler } from "./utils/eventHandler";
  import MetaLayout from "./components/meta-layout.svelte";
  import Menu from "./components/menu.svelte";
  import DebugStore from './stores/debugStore';
  import PlayerHudStore from './stores/playerStatusHudStore';
  import MapBorder from "./components/map-border-hud.svelte";
  import CompassHud from './components/compass-hud.svelte';
  import MoneyHud from './components/money-hud.svelte';
  import VehicleHud from './components/vehicle-hud.svelte';

  EventHandler();

  // TODO: fix this so this gets made and destoried from design mode
  let interval;

  const moveProgress = () => {
    let isUp: boolean = true;
    interval = setInterval(() => {
      if (isUp) {
        $PlayerHudStore.designProgress += 15
        if ($PlayerHudStore.designProgress > 100) {
          $PlayerHudStore.designProgress = 100;
          isUp = !isUp;
        }
      } else {
        $PlayerHudStore.designProgress -= 15
        if ($PlayerHudStore.designProgress < 0) {
          $PlayerHudStore.designProgress = 0;
          isUp = !isUp;
        }
      }
    }, 1400);
  };

  moveProgress();
  onDestroy(() => clearInterval(interval));

  document.onkeyup = MenuStore.handleKeyUp;
</script>

<svelte:head>
  <link href="https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
  <link href="https://fonts.cdnfonts.com/css/pricedown" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Yantramanav:wght@100;300;400;500;700;900&display=swap" rel="stylesheet">
</svelte:head>

<main class="{DebugStore ? 'bg-dark-300' :'bg-transparent'} min-h-screen">
  {#if !$MenuStore.isCineamticModeChecked }
    <CompassHud />
    <MoneyHud />
    <MetaLayout />
    <VehicleHud />
    <MapBorder />
  {/if}
  <Menu />
</main>