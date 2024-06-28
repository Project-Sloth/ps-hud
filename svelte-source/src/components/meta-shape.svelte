<script lang="ts">
  import type {
    optionalHudIconMetaShapeType,
    shapePropsType,
  } from "../types/types";
  import Badge from "./hud-shapes/badge.svelte";
  import CircleCircleFill from "./hud-shapes/circle-circle-fill.svelte";
  import CircleRing from "./hud-shapes/circle-ring.svelte";
  import CircleRingWhole from "./hud-shapes/circle-ring-whole.svelte";
  import CircleWhole from "./hud-shapes/circle-whole.svelte";
  import CircleSquareFill from "./hud-shapes/circle-square-fill.svelte";
  import DiamondRing from "./hud-shapes/diamond-ring.svelte";
  import DiamondWhole from "./hud-shapes/diamond-whole.svelte";
  import PillRing from "./hud-shapes/pill-ring.svelte";
  import PillWhole from "./hud-shapes/pill-whole.svelte";
  import HorizontalBar from "./hud-shapes/horizontal-bar.svelte";
  import SquareRing from "./hud-shapes/square-ring.svelte";
  import StarRing from "./hud-shapes/star-ring.svelte";
  import TriangleRing from "./hud-shapes/triangle-ring.svelte";
  import HexagonRing from "./hud-shapes/hexagon-ring.svelte";
  import HexagonSquareFill from "./hud-shapes/hexagon-whole.svelte";
  import SquareCircularFill from "./hud-shapes/square-circular-fill.svelte";
  import SquareWhole from "./hud-shapes/square-whole.svelte";
  import IconPercentage from "./hud-shapes/icon-percentage.svelte";
  import SplitRingCircle from "./hud-shapes/split-circle.svelte";
  import InnerCircle from "./hud-shapes/inner-circle.svelte";
  import RotatedSquare from "./hud-shapes/rotated-square.svelte";
  import RegularSquare from "./hud-shapes/regular-square.svelte";
  import CircleFill from "./hud-shapes/circle-fill.svelte";
  import SquareFill from "./hud-shapes/square-fill.svelte";
  import RotatedSquareFill from "./hud-shapes/rotated-square-fill.svelte";
  import Transparent from "./hud-shapes/transparent.svelte";

  export let hudIconInfo: optionalHudIconMetaShapeType = {};

  let shapeProps: shapePropsType;
  $: {
    shapeProps = (({ shape, isShowing, ...o }) => o)(hudIconInfo);
  }
</script>

{#if hudIconInfo.shape == "badge"}
  <Badge {...shapeProps} />
{:else if hudIconInfo.shape == "circle-ring"}
  <CircleRing {...shapeProps} />
{:else if hudIconInfo.shape == "circle-ring-whole"}
  <CircleRingWhole {...shapeProps} />
{:else if hudIconInfo.shape == "circle-circle-fill"}
  <CircleCircleFill {...shapeProps} />
{:else if hudIconInfo.shape == "circle-square-fill"}
  <CircleSquareFill {...shapeProps} />
{:else if hudIconInfo.shape == "circle-whole"}
  <CircleWhole {...shapeProps} />
{:else if hudIconInfo.shape == "diamond-ring"}
  <DiamondRing {...shapeProps} />
{:else if hudIconInfo.shape == "diamond-whole"}
  <DiamondWhole {...shapeProps} />
{:else if hudIconInfo.shape == "horizontal-bar"}
  <HorizontalBar {...shapeProps} />
{:else if hudIconInfo.shape == "square-circular-fill"}
  <SquareCircularFill {...shapeProps} />
{:else if hudIconInfo.shape == "square-ring"}
  <SquareRing {...shapeProps} />
{:else if hudIconInfo.shape == "star-ring"}
  <StarRing {...shapeProps} />
{:else if hudIconInfo.shape == "triangle-ring"}
  <TriangleRing {...shapeProps} />
{:else if hudIconInfo.shape == "hexagon-ring"}
  <HexagonRing {...shapeProps} />
{:else if hudIconInfo.shape == "hexagon-whole"}
  <HexagonSquareFill {...shapeProps} />
{:else if hudIconInfo.shape == "square-whole"}
  <SquareWhole {...shapeProps} />
{:else if hudIconInfo.shape == "icon-percentage"}
  <IconPercentage {...shapeProps} />
  <!-- {:else if hudIconInfo.shape == "icon"}
  <Icon {...shapeProps} /> -->
{:else if hudIconInfo.shape == "pill-ring"}
  <PillRing {...shapeProps} />
{:else if hudIconInfo.shape == "pill-whole"}
  <PillWhole {...shapeProps} />
{:else if hudIconInfo.shape == 'split-circle'}
  <SplitRingCircle {...shapeProps} />
{:else if hudIconInfo.shape == "inner-circle"}
  <InnerCircle {...shapeProps} />
{:else if hudIconInfo.shape == "rotated-square"}
  <RotatedSquare {...shapeProps} />
{:else if hudIconInfo.shape == "regular-square"}
  <RegularSquare {...shapeProps} />
{:else if hudIconInfo.shape == "circle-fill"}
  <CircleFill {...shapeProps} />
{:else if hudIconInfo.shape == "square-fill"}
  <SquareFill {...shapeProps} />
{:else if hudIconInfo.shape == "rotated-square-fill"}
  <RotatedSquareFill {...shapeProps} />
{:else if hudIconInfo.shape == "transparent"}
  <Transparent {...shapeProps} />
{/if}
