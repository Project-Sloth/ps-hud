<script lang="ts">
  import { iconLayouts } from '../../types/types'
  import PlayerHudUIStore from '../../stores/playerHudUIStore'
  import Select from '../atoms/select.svelte'
</script>


<div class="text-sm flex flex-col text-[#e8e8e8]">
  <div class="my-3 text-2xl text-white">
    <p>Global Layout Settings</p>
  </div>

  <div class="flex justify-center mb-4">
    <div class="w-50">
      <p class="text-lg text-center">Change Icon Layout</p>
      <Select valuesArray={iconLayouts} value={$PlayerHudUIStore.layout} handleSelectFunction={PlayerHudUIStore.updateLayout}/>
    </div>
  </div>
</div>