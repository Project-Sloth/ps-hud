<script lang="ts">
  import { onMount } from 'svelte';
  import PlayerHudUIStore from '../stores/playerHudUIStore'
  import { shapes, layouts, shapekind, layoutkind } from '../types/types'
  import Select from './atoms/select.svelte';

  export let posX = 0
  export let posY = 0
  
  let scale = 1;

  let parent;
	let parentOffset = {x: 0, y:0}
	
	let moving = false;
  let offsetX
  let offsetY

  onMount(() => {
		let rect = parent.getBoundingClientRect()
		parentOffset = {x: rect.x, y: rect.y}
	})
	
	function onMouseDown(e) {
    // Check for left click
    if (e.button == 0) {
      const rect = e.currentTarget.getBoundingClientRect()
      offsetX = e.pageX - rect.left
      offsetY = e.pageY - rect.top

      moving = true;
      addEventListener('mousemove', onMouseMove)
      addEventListener('mouseup', onMouseUp)
    }
	}
	
	function onMouseMove(e) {
		if (moving) {
      posX = ((e.pageX - offsetX)-parentOffset.x)/scale
      posY = ((e.pageY - offsetY)-parentOffset.y)/scale
		}
	}
	
	function onMouseUp() {
		moving = false;
    removeEventListener('mousemove', onMouseMove)
    removeEventListener('mouseup', onMouseUp)
	}

  function handleShapeUpdate(shape: shapekind) {
    PlayerHudUIStore.updateAllShapes(shape);
  }

  function handleLayoutUpdate(layout: layoutkind) {
    PlayerHudUIStore.updateLayout(layout);
  }

  function handleClick() {
    $PlayerHudUIStore.icons.voice.isShowing = false;
  }

</script>

<style>
	.draggable {
		position: absolute;
    z-index: 100;
	}

  .drag-bar {
    user-select: none;
    cursor: grab;
	}
  .drag-bar:active {
    cursor: grabbing;
  }
	.drag-bar svg {
		opacity: 0.2;
		transition: opacity 0.2s;
	}
	.drag-bar:hover svg {
		opacity: 1;
	}
</style>

<section bind:this={parent} style="top: {posY}px; left: {posX}px;" class="draggable bg-dark-100 rounded-lg shadow-lg text-white">
  <div class="drag-bar" on:mousedown={onMouseDown}>
    <svg role="img" aria-label="drag handle" viewBox="0 0 24 24" height=35 width=35 class="mx-auto">
      <path
        fill="white"
        d="M3,15V13H5V15H3M3,11V9H5V11H3M7,15V13H9V15H7M7,11V9H9V11H7M11,15V13H13V15H11M11,11V9H13V11H11M15,15V13H17V15H15M15,11V9H17V11H15M19,15V13H21V15H19M19,11V9H21V11H19Z"
      />
    </svg>
  </div>
  <div class="p-4 text-white font-semibold flex flex-col gap-2 justify-center">
    <p class="">Customize Icon Settings</p>
    <Select label="Customize Shape Setting" items={[...shapes]} handleFunction={handleShapeUpdate}/>
    <Select label="Customize Layout Setting" items={[...layouts]} handleFunction={handleLayoutUpdate}/>
    <button on:click={handleClick}>Click me</button>
  </div>
</section>

<!-- <svelte:window on:mouseup={onMouseUp} on:mousemove={onMouseMove} /> -->