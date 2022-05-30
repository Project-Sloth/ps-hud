<script lang="ts">
  export let maxLengh: number = 10;
  export let value = '';
</script>

<input bind:value={value} type="text" class="bg-[var(--ps-hud-primary)] block w-full p-1.5 my-2 text-black text-base
  font-bold rounded-md placeholder-[black] outline-none"
  placeholder="Profile" pattern="[A-Za-z1-9]" max={maxLengh}
>