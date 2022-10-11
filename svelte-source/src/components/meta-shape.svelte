<script lang="ts">
  import type { optionalHudIconMetaShapeType, shapePropsType, shapekind } from '../types/types'
  import Badge from './shapes/badge.svelte';
  import CircleCircleFill from './shapes/circle-circle-fill.svelte';
  import CircleRing from './shapes/circle-ring.svelte';
  import CircleRingWhole from './shapes/circle-ring-whole.svelte';
  import CircleWhole from './shapes/circle-whole.svelte';
  import CircleSquareFill from './shapes/circle-square-fill.svelte';
  import DiamondRing from './shapes/diamond-ring.svelte';
  import DiamondWhole from './shapes/diamond-whole.svelte';
  import PillRing from './shapes/pill-ring.svelte';
  import PillWhole from './shapes/pill-whole.svelte';
  import HorizontalBar from './shapes/horizontal-bar.svelte';
  import SquareRing from './shapes/square-ring.svelte';
  import StarRing from './shapes/star-ring.svelte'
  import TriangleRing from './shapes/triangle-ring.svelte';
  import HexagonRing from './shapes/hexagon-ring.svelte';
  import HexagonSquareFill from './shapes/hexagon-whole.svelte';
  import SquareCircularFill from './shapes/square-circular-fill.svelte';
  import SquareWhole from './shapes/square-whole.svelte';
  import IconPercentage from './shapes/icon-percentage.svelte';
  import Icon from './shapes/icon.svelte';

  export let hudIconInfo: optionalHudIconMetaShapeType = {};

  let shapeProps: shapePropsType;
  $: {
    shapeProps = (({ shape, isShowing, dynamicShow, ...o }) => o)(hudIconInfo);
  }

  let componentObj: {[key in shapekind]: any} = {
    "badge": Badge,
    "circle-circle-fill": CircleCircleFill,
    "circle-ring": CircleRing,
    "circle-ring-whole": CircleRingWhole,
    "circle-whole": CircleWhole,
    "circle-square-fill": CircleSquareFill,
    "diamond-ring": DiamondRing,
    "diamond-whole": DiamondWhole,
    "pill-ring": PillRing,
    "pill-whole": PillWhole,
    "horizontal-bar": HorizontalBar,
    "square-ring": SquareRing,
    "star-ring": StarRing,
    "triangle-ring": TriangleRing,
    "hexagon-ring": HexagonRing,
    "hexagon-whole": HexagonSquareFill,
    "square-circular-fill": SquareCircularFill,
    "square-whole": SquareWhole,
    "icon-percentage": IconPercentage,
  }
  
</script>

<svelte:component this={componentObj[hudIconInfo.shape]} {...shapeProps}/>

<!-- {:else if hudIconInfo.shape == "icon"}
  <Icon {...shapeProps} /> -->