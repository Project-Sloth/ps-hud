<script lang="ts">
	import { slide } from 'svelte/transition';
  import Fa from 'svelte-fa';

	export let name = '';
	export let group = null;
	export let icon: any = null;
	export let color: string = "white"
	$: active = group === name;
</script>

<div>
	<button	class="header text-2xl flex-row items-center text-white font-semibold"	on:click={() => {	group = group === name ? '' : name; }}>
		<div class="min-w-8 grid justify-items-center">
			<Fa icon={icon} scale={1} color={color}/>
		</div>
		<p class="ml-3"> {name}</p>
		<i class="icon ml-auto" class:active>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" stroke="white" fill="white">
				<path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
			</svg>
		</i>
	</button>

	{#if active}
		<div class="content" transition:slide>
			<slot />
		</div>
	{/if}
</div>

<style>
	.header {
		display: flex;
		width: 100%;
		cursor: pointer;
		background: none;
		line-height: 1;
		border: none;
		outline: none;
		margin: 0;
		padding: 12px 12px;
		text-align: left;
		outline: none;
	}
	.header:active {
		background: none;
	}
	.icon {
		line-height: 0.5;
		transition: 0.25s linear;
	}
	.active {
		transform: rotate(-180deg);
	}

	.content {
		margin: 0;
		padding: 0 0 16px;
	}
</style>