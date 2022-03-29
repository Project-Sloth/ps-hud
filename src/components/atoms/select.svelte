<script lang="ts">
  import Fa from 'svelte-fa'
  import { faCheck, faSort } from '@fortawesome/free-solid-svg-icons'
  import {
    Listbox, ListboxButton, ListboxOptions, ListboxOption,
  } from "@rgossiaux/svelte-headlessui";

  export let valuesArray: ReadonlyArray<any> = [""]
  export let handleSelectFunction: (val) => void;

  let selectedValue: any = valuesArray[0];
</script>

<Listbox value={selectedValue} on:change={(e) => { handleSelectFunction(e.detail); selectedValue = e.detail }}>
  <ListboxButton class="relative w-full py-2 pl-3 pr-10 text-left bg-[#292929] rounded-lg shadow-md cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
    <span class="block truncate font-semibold">{selectedValue}</span>
    <span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
      <Fa class="w-5 h-5 text-gray-400" icon={faSort} style="color: black;"/>
    </span>
  </ListboxButton>
  <ListboxOptions class="absolute list-none list-item w-72 py-1 mt-1 overflow-auto text-base bg-[#292929] rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
    {#each valuesArray as value}
      <ListboxOption
        value={value}
        class={({ active }) => (`cursor-pointer select-none relative py-2 pl-10 pr-4 ${active ? 'text-amber-900 bg-[var(--silent-hud-primary)]' : 'text-gray-900'}`)}
        let:selected
      >
        <span class="{selected ? 'font-bold' : 'font-semibold'} block truncate text-white">
          {value?.text ? value.text : value}
        </span>
        {#if selected}
          <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
            <Fa class="w-5 h-5 text-gray-400" icon={faCheck} style="color: rgba(217, 119, 6, 1);"/>
          </span>
        {/if}
      </ListboxOption>
    {/each}
  </ListboxOptions>
</Listbox>