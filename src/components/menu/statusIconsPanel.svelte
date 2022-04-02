<script lang="ts">
  import { shapes, layouts } from '../../types/types'
  import { draggable } from '@neodrag/svelte';
  import PlayerHudUIStore from '../../stores/playerHudUIStore'
  import type { shapekind, layoutkind, customizableShapePropsType } from '../../types/types'
  import Select from '../atoms/select.svelte'
  import NumberInput from '../atoms/number-input.svelte';

  // export let height: number = 50;
  // export let icon: any = null;
  // export let iconColor: string = "red";
  // export let iconScaling: number = 0.45;
  // export let iconTranslateX: number = 0;
  // export let iconTranslateY: number = 0;
  // export let innerColor: string = "#212121";
  // export let outlineColor: string = "red";
  // export let outlineColorOpacity: number = 0.4;
  // export let progressColor: string = "red";
  // export let progressValue: number = 100;
  // export let ringSize: number = 4;
  // export let rotateDegree: number = 0;
  // export let translateX: number = 0;
  // export let translateY: number = 0;
  // export let width: number = 50;

  function handleLayoutUpdate(layout: layoutkind) {
    PlayerHudUIStore.updateLayout(layout);
  }
</script>

<div class="text-sm flex flex-col text-[#c6c6c6]">
  <div class="my-3 text-xl text-white">
    <p>Global Icons Settings</p>
  </div>

  <div class="flex justify-center mb-4">
    <div class="w-50">
      <p class="text-lg text-center">Change Icon Shape</p>
      <Select valuesArray={shapes} handleSelectFunction={PlayerHudUIStore.updateAllShapes}/>  
    </div>
  </div>

  <div class="mx-4 mb-4 grid grid-cols-4 gap-6">
    <div>
      <p class="text-base text-center mb-2">Change Width Size</p>
      <NumberInput min={1} max={200} value={50} handleUpdateFunction={PlayerHudUIStore.updateAllWidth}/>
    </div>
    <div>
      <p class="text-base text-center mb-2">Change Height Size</p>
      <NumberInput min={1} max={200} value={50} handleUpdateFunction={PlayerHudUIStore.updateAllHeight}/>
    </div>
    <div>
      <p class="text-base text-center mb-2">Change Ring Size</p>
      <NumberInput min={1} max={25} value={4} step={0.5} handleUpdateFunction={PlayerHudUIStore.updateAllRingSize}/>
    </div>
    <div>
      <p class="text-base text-center mb-2">Change Progress Color</p>
      <div class="bg-orange-800 h-1/2 w-2/3 mx-auto border-white border-2">
      </div>
    </div>
    <div>
      <p class="text-base text-center mb-2">Change X-axis Position</p>
      <NumberInput min={-10} max={10} value={0} step={0.25} handleUpdateFunction={PlayerHudUIStore.updateAllTranslateX}/>
    </div>
    <div>
      <p class="text-base text-center mb-2">Change Y-axis Position</p>
      <NumberInput min={-10} max={10} value={0} step={0.25} handleUpdateFunction={PlayerHudUIStore.updateAllTranslateY}/>
    </div>
    <div>
      <p class="text-base text-center mb-2">Change Rotation</p>
      <NumberInput min={0} max={360} value={0} handleUpdateFunction={PlayerHudUIStore.updateAllRotateDegree}/>
    </div>
    <div>
      <p class="text-base text-center mb-2">Change Track Color</p>
      <div class="bg-orange-800 h-1/2 w-2/3 mx-auto border-white border-2">
      </div>
    </div>
    <div>
      <p class="text-base text-center mb-2">Change Icon X-axis Position</p>
      <NumberInput min={-10} max={10} value={0} step={0.01} handleUpdateFunction={PlayerHudUIStore.updateAllTranslateIconX}/>
    </div>
    <div>
      <p class="text-base text-center mb-2">Change Icon Y-axis Position</p>
      <NumberInput min={-10} max={10} value={0} step={0.01} handleUpdateFunction={PlayerHudUIStore.updateAllTranslateIconY}/>
    </div>
    <div>
      <p class="text-base text-center mb-2">Change Icon Size</p>
      <NumberInput min={0} max={1} value={0.40} step={0.01} handleUpdateFunction={PlayerHudUIStore.updateAllIconScale}/>
    </div>
    <div>
      <p class="text-base text-center mb-2">Change Icon Color</p>
      <div class="bg-orange-800 h-1/2 w-2/3 mx-auto border-white border-2">
      </div>
    </div>
  </div>
  <hr>
  <div>
    <p class="text-base text-center mb-2">Change Ring Size</p>
    <NumberInput min={1} max={25} step={0.5} bind:value={$PlayerHudUIStore.icons.health.ringSize}/>
  </div>
</div>

