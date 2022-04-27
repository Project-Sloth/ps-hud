<script>
	import Color from './color'
	export let color = Color.hex('#00ff00')
	export let id = null
	export let width = null
	$: value = color.toHex()
	function onChange(e) {
		let v = Color.hex(e.target.value)
		if (v.data != null) {
			color = v
		} else {
			e.target.value = value
		}
	}
</script>

<input
	id={id}
	value={value}
	on:change={onChange}
	style='width: {width}px;'
/>

<style>
	input {
		font-family: monospace;
		font-size: 120%;
		margin: 0;
		padding: 5px;
	}
</style>