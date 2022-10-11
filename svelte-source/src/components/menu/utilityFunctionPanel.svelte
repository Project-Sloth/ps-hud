<script lang="ts">
  import Button from '../atoms/button.svelte';
  import Panel from '../atoms/panel.svelte';
  import { faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons';
  import ColorEffectStore from '../../stores/colorEffectStore';
  import LocaleStore from '../../stores/localeStore';

  export let group: string = "";
</script>


<Panel name={$LocaleStore.utilityFunctions.utility_functions} icon={faScrewdriverWrench} color={"white"} bind:group>
  <div class="flex flex-row mx-4">
    <Button name={$LocaleStore.utilityFunctions.copy_progress_colors} buttonClass={"h-15 w-55"}
      on:click={() => {ColorEffectStore.updateIconColorToProgressColor()}}
    />
  </div>
</Panel>
<hr>