<script lang="ts">
  export let checked: boolean = true;
  export let checkedText: string = "";
  export let unCheckedText: string = "";
  export let text: string = "";
  export let center: boolean = false;
  export let handleUpdateFunction: (val: boolean) => void = null;

  function handleClick(event) {
    if (handleUpdateFunction) {
      handleUpdateFunction(event.target.checked);
    }
  }
</script>

<label class="switch cursor-pointer flex flex-row pt-2 pb-4 -ml-2 gap-1 select-none">
  <input class="cursor-pointer" style={center ? "margin-left:auto; margin-right:auto;": ''} type="checkbox"
    role="switch" bind:checked={checked} on:click={handleClick}
  >

  {#if checkedText && unCheckedText}
    {#if checked}
      <span class="primary-text">{checkedText}</span>
    {:else}
      <span class="primary-text">{unCheckedText}</span>
    {/if}
  {:else}
    <span class="primary-text">{text}</span>
  {/if}
</label>

<style>
.primary-text {
  font-family: system-ui, sans-serif;
  line-height: 1.1;
  font-size: 1.2em;
}

.switch input[type="checkbox"]:checked::before {
  background-color: var(--ps-hud-secondary);
  filter: brightness(0.55);
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.switch input[type="checkbox"]:checked::after {
  background-color: var(--ps-hud-primary);
}

.switch input[type="checkbox"]:not(:checked)::before {
  right: 20px;
  background-color: var(--ps-hud-secondary);
  filter: brightness(1.2);
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.switch input[type="checkbox"]::before {
  content: '';
  border: solid 1.25px black;
  display: block;
  position: absolute;
  z-index: 2;
  top: -0.30rem;
  width: 1.7rem;
  height: 1.7rem;
  border-radius: 50%;
  -webkit-box-shadow: 2px 2px 5px 0px rgba(0,0,0,0.75);
  -moz-box-shadow: 2px 2px 5px 0px rgba(0,0,0,0.75);
  box-shadow: 2px 2px 5px 0px rgba(0,0,0,0.75);
}

.switch input[type="checkbox"]::after {
  content: '';
  display: block;
  border-radius: 25px;
  width: 2.2rem;
  height: 1.1rem;
  filter: brightness(1.1);
  background-color: rgb(87, 87, 87);
}

.switch input[type="checkbox"] {
  -webkit-appearance: none;
  position: relative;
  margin: 0 1rem;
}

.switch input[type="checkbox"]:disabled::before {
  background-color: darkgrey;
}

.switch input[type="checkbox"]:checked::before {
  -webkit-transform: translateX(20px);
  -ms-transform: translateX(20px);
  transform: translateX(20px);
}
</style>