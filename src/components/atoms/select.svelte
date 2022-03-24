<script lang="ts">
  export let selected: any = "";
  export let handleFunction: (val: any) => void = null;
  export let items: Array<any> = [];
  export let label: string = "";
</script>

<div>
  <p>{label}</p>
  <select bind:value={selected} on:change="{(e) => handleFunction(selected)}"
    class="form-select appearance-none block w-full px-3 py-1.5
    text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat
    border border-solid border-gray-300 rounded transition ease-in-out m-0
    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example">
    {#each items as item}
      <option value={item}>
        {item}
      </option>
    {/each}
  </select>
</div>