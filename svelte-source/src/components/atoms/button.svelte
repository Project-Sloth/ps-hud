<script lang="ts">
  export let name: string = "";
  export let buttonClass: string = "";
  export let disable: boolean = false;
</script>

<button class="button bg-[var(--silent-hud-primary)] text-sm text-white py-2 px-4 my-2 rounded w-[150px] uppercase select-none disabled:opacity-25 disabled:cursor-not-allowed {buttonClass}"
  on:click disabled={disable}
>
  <span class="text-black py-3 font-bold">{name}</span>
</button>