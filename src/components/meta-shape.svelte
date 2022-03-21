<script lang="ts">
  import type { shapeType } from "../types/types"
  import CircleRing from './hud-shapes/circle-ring.svelte';
  import SquareRing from './hud-shapes/square-ring.svelte';
  import StarRing from './hud-shapes/star-ring.svelte'
  import TriangleRing from './hud-shapes/triangle-ring.svelte';
  import HexagonRing from './hud-shapes/hexagon-ring.svelte';
  import DiamondRing from './hud-shapes/diamond-ring.svelte';
  import CircleWhole from './hud-shapes/circle-whole.svelte';
  import SquareWhole from './hud-shapes/square-whole.svelte';
  //import Octagon from './components/octagon.svelte';
  export let shapeInfo: shapeType = null;

</script>

{#if shapeInfo.shape == 'circle-ring'}
  <CircleRing {...shapeInfo } />
{:else if shapeInfo.shape == 'full-circle'}
  <CircleWhole />
{:else if shapeInfo.shape == 'square-ring'}
  <SquareRing {...shapeInfo } ringSize={shapeInfo.ringSize*2} />
{:else if shapeInfo.shape == 'star-ring'}
  <StarRing {...shapeInfo } />
{:else if shapeInfo.shape == 'triangle-ring'}
  <TriangleRing {...shapeInfo } />
{:else if shapeInfo.shape == 'hexagon-ring'}
  <HexagonRing {...shapeInfo } />
{:else if shapeInfo.shape == 'diamond-ring'}
  <DiamondRing {...shapeInfo } />
{:else if shapeInfo.shape == 'horizontal-bar'}
  <SquareWhole {...shapeInfo } />
{/if }