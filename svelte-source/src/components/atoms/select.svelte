<script lang="ts">
  import Select from 'svelte-select';

  export let valuesArray: ReadonlyArray<any> = [""]
  export let handleSelectFunction: (val) => void = () => null;
  export let value: any = null;
  export let selectedIndex: number = 0;

  function humanReadableString(str) {
    var i: number, frags = str.split('-');
    for (i=0; i<frags.length; i++) {
      frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
    }
    return {value: str, label: frags.join(' ')};
  }

  let items: Array<any>;
  let itemvalue;

  $: {
    items = valuesArray.map(humanReadableString);
    itemvalue = items[0];
  } 

  $: {
    if (value) {
      let index = items.findIndex((element) => element.value == value);
      if (index >= 0) {
        selectedIndex = index;
        itemvalue = items[index]
      }
    } 
  }

  function handleSelect(event) {
    // Since value can be changed by the parent component we check to ensure what triggered this event was not that event
    // We do this by just returning if the value update is going to result in the same value
    if (event.detail.value === value) {
      return;
    }
    value = event.detail.value;
    handleSelectFunction(event.detail.value);
  }
</script>

<div class="themed text-white text-base">
  <Select {items} value={itemvalue} on:select={handleSelect} isClearable={false} containerClasses="selectHud"/>
</div>

<style>
  .themed {
    --background: #292929;
    --listBackground: #292929;
    --itemIsActiveBG: var(--ps-hud-primary);
    --itemHoverBG: var(--ps-hud-primary-hover);
    --border: #171717;
  }
  :global(.selectContainer > *) {
    cursor: pointer !important;
  }
  :global(.listItem > *) {
    cursor: pointer !important;
  }
  :global(.listContainer) {
    z-index: 3 !important;
  }
</style>