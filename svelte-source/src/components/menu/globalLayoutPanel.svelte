<script lang="ts">
  import Select from '../atoms/select.svelte';
  import Panel from '../atoms/panel.svelte';
  import NumberInput from '../atoms/numberInput.svelte';
  import { faTableColumns } from '@fortawesome/free-solid-svg-icons';
  import { iconLayouts } from '../../types/types';
  import LayoutStore from '../../stores/layoutStore';
  import LocaleStore from '../../stores/localeStore';

  export let group: string = "";
</script>


<Panel name={$LocaleStore.layouts.global_status_layout_settings} icon={faTableColumns} color={"white"} bind:group>
  <div class="text-sm flex flex-col text-[#e8e8e8]">
    <div class="flex justify-center mb-4">
      <div class="w-55">
        <p class="text-lg text-center mb-2">{$LocaleStore.layouts.icon_layout}</p>
        <Select valuesArray={iconLayouts} labelArray={$LocaleStore.layouts.layoutNames} value={$LayoutStore.layout} handleSelectFunction={LayoutStore.updateLayout}/>
      </div>
    </div>

    <div class="mx-4 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 items-end mb-8">
      <div>
        <p class="text-base text-center mb-2">{$LocaleStore.layouts.between_icon_spacing}</p>
        <NumberInput min={-100} max={200} bind:value={$LayoutStore.iconBetweenSpacing}/>
      </div>
      <div>
        <p class="text-base text-center mb-2">{$LocaleStore.layouts.y_axis_spacing}</p>
        <NumberInput min={-100} max={500} bind:value={$LayoutStore.yAxisSpacing}/>
      </div>
      <div>
        <p class="text-base text-center mb-2">{$LocaleStore.layouts.x_axis_spacing}</p>
        <NumberInput min={-100} max={500} bind:value={$LayoutStore.xAxisSpacing}/>
      </div>
    </div>
  </div>
</Panel>
<hr>