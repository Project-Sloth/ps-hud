<script lang="ts">
  import { onDestroy } from 'svelte';
  import MenuStore from "./stores/menuStore";
  import { EventHandler } from "./utils/eventHandler";
  import MetaLayout from "./components/meta-layout.svelte";
  import Menu from "./components/menu.svelte";
  import DebugStore from './stores/debugStore';
  import PlayerHudStore from './stores/playerStatusHudStore';
  // import MapBorder from "./components/map-border-hud.svelte";

  EventHandler();

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

<main class="{DebugStore ? 'bg-dark-300' :'bg-transparent'} min-h-screen">
  <MetaLayout />
  <!-- <MapBorder /> -->
  <Menu />
</main>