<script lang="ts">
  import { iconLayouts } from '../../types/types'
  import PlayerHudUIStore from '../../stores/playerStatusHudStore'
  import Select from '../atoms/select.svelte'
  import { faGlobe } from '@fortawesome/free-solid-svg-icons';
  import Fa from 'svelte-fa';
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
      <Select valuesArray={iconLayouts} value={$PlayerHudUIStore.layout} handleSelectFunction={PlayerHudUIStore.updateLayout}/>
    </div>
  </div>
</div>