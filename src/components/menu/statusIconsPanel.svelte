<script lang="ts">
  import { shapes, layouts } from '../../types/types'
  import PlayerHudUIStore from '../../stores/playerHudUIStore'
  import type { shapekind, layoutkind } from '../../types/types'
  import Select from '../atoms/select.svelte'
  //let shapes = ["random1", "random2", "random3"]
  let selectedShape: shapekind = shapes[0];
 
  let value: shapekind = $PlayerHudUIStore.icons.health.shape;

  function handleShapeUpdate(shape: shapekind) {
    console.log("Called handle shap updated with", shape);
    selectedShape = shape;
    PlayerHudUIStore.updateAllShapes(shape);
  }

  function handleLayoutUpdate(layout: layoutkind) {
    PlayerHudUIStore.updateLayout(layout);
  }
</script>

<div class="w-72 text-white font-bold">
  <Select valuesArray={shapes} handleSelectFunction={handleShapeUpdate}/>
  <Select valuesArray={layouts} handleSelectFunction={handleLayoutUpdate}/>
</div>





<!-- <p class="">Customize Icon Settings</p>
<Select label="Customize Shape Setting" items={[...shapes]} handleFunction={handleShapeUpdate}/>
<Select label="Customize Layout Setting" items={[...layouts]} handleFunction={handleLayoutUpdate}/> -->
