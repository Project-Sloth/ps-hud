<script lang="ts">
  import { iconLayouts } from '../../types/types';
  import LayoutStore from '../../stores/layoutStore';
  import Select from '../atoms/select.svelte';
  import NumberInput from '../atoms/number-input.svelte';
  import { faGlobe } from '@fortawesome/free-solid-svg-icons';
  import Fa from 'svelte-fa';
  import Button from '../atoms/button.svelte'
  import ExternalStatusStore from '../../stores/externalStatusStore';

  let testVal: number = 0;
</script>


<div class="text-sm flex flex-col text-[#e8e8e8]">
  <div class="my-3 text-2xl text-white flex flex-row">
    <div class="flex-1 flex min-w-min">
      <div>
        <div class="flex flex-row items-center">
            <Fa icon={faGlobe} scale={1}/>
          <p class="ml-3 p-0">Global Layout Settings</p>
        </div>
      </div>
    </div>
  </div>

  <div class="flex justify-center mb-4">
    <div class="w-50">
      <p class="text-lg text-center mb-2">Change Icon Layout</p>
      <Select valuesArray={iconLayouts} value={$LayoutStore.layout} handleSelectFunction={LayoutStore.updateLayout}/>
    </div>
  </div>

  <div class="mx-4 mb-8 grid grid-cols-4 gap-6">
    <div>
      <p class="text-base text-center mb-2">Change Between Icon Spacing</p>
      <NumberInput min={-100} max={1000} bind:value={$LayoutStore.iconBetweenSpacing}/>
    </div>
    <div>
      <p class="text-base text-center mb-2">Change Y-Axis Spacing</p>
      <NumberInput min={-100} max={1000} bind:value={$LayoutStore.yAxisSpacing}/>
    </div>
  </div>
</div>