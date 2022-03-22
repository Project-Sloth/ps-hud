<script lang="ts">
  import type { shapeType, shapePropsType } from "../types/types"
  import CircleRing from './hud-shapes/circle-ring.svelte';
  import CircleWhole from "./hud-shapes/circle-whole.svelte";
  import SquareRing from './hud-shapes/square-ring.svelte';
  import StarRing from './hud-shapes/star-ring.svelte'
  import TriangleRing from './hud-shapes/triangle-ring.svelte';
  import HexagonRing from './hud-shapes/hexagon-ring.svelte';
  import DiamondRing from './hud-shapes/diamond-ring.svelte';
  import SquareCircularFill from './hud-shapes/square-circular-fill.svelte';
  import SquareWhole from './hud-shapes/square-whole.svelte';
  import IconPercentage from "./hud-shapes/icon-percentage.svelte";
  //import Octagon from './components/octagon.svelte';

  export let shapeInfo: shapeType = null;

  let shapeProps: shapePropsType;
  $: {
    shapeProps = (({ shape, ifShowing, ...o }) => o)(shapeInfo);
    if (shapeProps.outlineColor == "") {
      shapeProps.outlineColor = shapeProps.progressColor;
    }
  }
  
</script>

{#if shapeInfo.shape == 'circle-ring'}
  <CircleRing props={shapeProps} />
{:else if shapeInfo.shape == 'circle-whole'}
  <CircleWhole props={shapeProps} />
{:else if shapeInfo.shape == 'square-circular-fill'}
  <SquareCircularFill props={shapeProps} />
{:else if shapeInfo.shape == 'square-ring'}
  <SquareRing props={shapeProps} />
{:else if shapeInfo.shape == 'star-ring'}
  <StarRing props={shapeProps} />
{:else if shapeInfo.shape == 'triangle-ring'}
  <TriangleRing props={shapeProps} />
{:else if shapeInfo.shape == 'hexagon-ring'}
  <HexagonRing props={shapeProps} />
{:else if shapeInfo.shape == 'diamond-ring'}
  <DiamondRing props={shapeProps} />
{:else if shapeInfo.shape == 'square-whole'}
  <SquareWhole props={shapeProps} />
{:else if shapeInfo.shape == 'icon-percentage'}
  <IconPercentage props={shapeProps} />
{/if }