<script lang="ts">
  import Select from 'svelte-select';

  export let valuesArray: ReadonlyArray<any> = [""]
  export let handleSelectFunction: (val) => void;
  export let value: any = null;


  function humanReadableString(str) {
    var i: number, frags = str.split('-');
    for (i=0; i<frags.length; i++) {
      frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
    }
    return {value: str, label: frags.join(' ')};
  }

  let items = valuesArray.map(humanReadableString);
  let itemvalue = items[0];

  $: {
    if (value) {
      let index = items.findIndex((element) => element.value == value);
      if (index) {
        itemvalue = items[index]
      }
    } 
  }

  function handleSelect(event) {
    // Since value can be changed by are parent component we check to ensure what triggered this event was not that event
    // We do this by just returning if the value update is going to result in the same value
    if (event.detail.value === value) {
      return;
    }
    value = event.detail.value;
    handleSelectFunction(event.detail.value);
  }
</script>

<div class="themed text-white text-sm">
  <Select {items} value={itemvalue} on:select={handleSelect} isClearable={false} containerClasses="selectHud"/>
</div>

<style>
  .themed {
    --background: #292929;
    --listBackground: #292929;
    --itemIsActiveBG: var(--silent-hud-primary);
    --itemHoverBG: var(--silent-hud-primary-hover);
    --border: #171717;
  }
  :global(.selectContainer > *) {
    cursor: pointer !important;
  }
  :global(.listItem > *) {
    cursor: pointer !important;
  }
</style>