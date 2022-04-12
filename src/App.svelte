<script lang="ts">
  import MetaLayout from "./components/meta-layout.svelte";
  import DragMenu from "./components/menu.svelte";
  import MapBorder from "./components/map-border-hud.svelte";
</script>

<main class="bg-dark-300 min-h-screen">
  <MetaLayout />
  <MapBorder />
  <DragMenu />
</main>