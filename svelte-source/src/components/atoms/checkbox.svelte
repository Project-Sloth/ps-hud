<script lang="ts">
  export let primaryText: string = "";
  export let secondaryText: string = "";
  export let checked: boolean;
  export let handleUpdateFunction: (val: boolean) => void = null;

  function handleClick(event) {
    if (handleUpdateFunction) {
      handleUpdateFunction(event.target.checked);
    }
  }
</script>


<label class="flex flex-row gap-4 py-3 cursor-pointer select-none {secondaryText ? "items-center" : ""}">
  <input class="cursor-pointer" type="checkbox" name="checkbox" bind:checked={checked} on:click={handleClick}/>
  {#if secondaryText}
    <div class="flex flex-col">
      <span class="primary-text mb-1">{primaryText}</span>
      <span class="secondary-text">{secondaryText}</span>
    </div>
  {:else}
    <span class="primary-text">{primaryText}</span>
  {/if}
</label>

<style>
.primary-text {
  font-family: system-ui, sans-serif;
  line-height: 1.1;
  font-size: 1.2em;
}

.secondary-text {
  font-family: system-ui, sans-serif;
  line-height: 1.1;
  font-size: 1.1em;
}

input[type="checkbox"] {
  /* Add if not using autoprefixer */
  -webkit-appearance: none;
  /* Remove most all native input styles */
  appearance: none;
  /* For iOS < 15 */
  background-color: var(--ps-hud-primary);
  /* Not removed via appearance */
  margin: 0;

  font: inherit;
  color: var(--ps-hud-primary);
  width: 1.6em;
  height: 1.6em;
  border: 0.15em solid var(--ps-hud-primary);
  border-radius: 0.15em;
  transform: translateY(-0.075em);

  display: grid;
  place-content: center;
}

input[type="checkbox"]::before {
  content: "";
  width: 0.5em;
  height: 0.5em;
  clip-path: polygon(37% 69%, 14% 48%, 5% 57%, 38% 86%, 93% 17%, 83% 8%);
  transform: scale(0);
  transform-origin: center;
  transition: 120ms transform ease-in-out;
  box-shadow: inset 0.9em 0.9em black;
  /* Windows High Contrast Mode */
  background-color: CanvasText;
}

input[type="checkbox"]:checked::before {
  transform: scale(3);
}

input[type="checkbox"]:focus {
  outline: max(2px, 0.15em) solid currentColor;
  outline-offset: max(2px, 0.15em);
}
</style>

