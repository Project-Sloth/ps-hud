<script lang="ts">
  import { fade } from 'svelte/transition';
  import type { hudIconType, shapePropsType } from "../types/types"
  import CircleRing from './hud-shapes/circle-ring.svelte';
  import CircleWhole from "./hud-shapes/circle-whole.svelte";
  import CircleSquareFill from "./hud-shapes/circle-square-fill.svelte";
  import CircleEnd from "./hud-shapes/circle-end.svelte";
  import Cylinder from "./hud-shapes/cylinder.svelte";
  import HorizontalBar from "./hud-shapes/horizontal-bar.svelte";
  import SquareRing from './hud-shapes/square-ring.svelte';
  import StarRing from './hud-shapes/star-ring.svelte'
  import TriangleRing from './hud-shapes/triangle-ring.svelte';
  import HexagonRing from './hud-shapes/hexagon-ring.svelte';
  import HexagonSquareFill from "./hud-shapes/hexagon-square-fill.svelte";
  import DiamondRing from './hud-shapes/diamond-ring.svelte';
  import SquareCircularFill from './hud-shapes/square-circular-fill.svelte';
  import SquareWhole from './hud-shapes/square-whole.svelte';
  import IconPercentage from "./hud-shapes/icon-percentage.svelte";
  //import Octagon from './components/octagon.svelte';

  export let hudIconInfo: hudIconType = null;

  let shapeProps: shapePropsType;
  $: {
    shapeProps = (({ shape, isShowing, name, ...o }) => o)(hudIconInfo);
    if (shapeProps.outlineColor == "") {
      shapeProps.outlineColor = shapeProps.progressColor;
    }
  }
  
</script>

<!-- <div transition:fade|local="{{duration: 1000, delay: 1000}}">
</div> -->
{#if hudIconInfo.shape == 'circle-ring'}
  <CircleRing {...shapeProps} />
{:else if hudIconInfo.shape == 'circle-square-fill'}
  <CircleSquareFill {...shapeProps} />
{:else if hudIconInfo.shape == 'circle-whole'}
  <CircleWhole {...shapeProps} />
{:else if hudIconInfo.shape == 'circle-end'}
  <CircleEnd {...shapeProps} />
{:else if hudIconInfo.shape == 'cylinder'}
  <Cylinder props={shapeProps} />
{:else if hudIconInfo.shape == 'horizontal-bar'}
  <HorizontalBar props={shapeProps} />
{:else if hudIconInfo.shape == 'square-circular-fill'}
  <SquareCircularFill props={shapeProps} />
{:else if hudIconInfo.shape == 'square-ring'}
  <SquareRing {...shapeProps} />
{:else if hudIconInfo.shape == 'star-ring'}
  <StarRing {...shapeProps} />
{:else if hudIconInfo.shape == 'triangle-ring'}
  <TriangleRing {...shapeProps} />
{:else if hudIconInfo.shape == 'hexagon-ring'}
  <HexagonRing props={shapeProps} />
{:else if hudIconInfo.shape == 'hexagon-square-fill'}
  <HexagonSquareFill {...shapeProps} />
{:else if hudIconInfo.shape == 'diamond-ring'}
  <DiamondRing {...shapeProps} />
{:else if hudIconInfo.shape == 'square-whole'}
  <SquareWhole {...shapeProps} />
{:else if hudIconInfo.shape == 'icon-percentage'}
  <IconPercentage {...shapeProps} />
{/if }