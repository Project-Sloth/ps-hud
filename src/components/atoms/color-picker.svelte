<script lang="ts">
	import { ColorPicker, dimensions, Color } from 'svelte-colorpick'
	export let color;
  export let updateFunction: (colorHex) => void = null;

  $: {
    if (updateFunction) {
      if (color.toHex) {
				updateFunction(color.toHex());
      }
    }
  }

	let background = '#fff'
	let settings = {
			selectedDimension: 'hsl.h',
			tabbed: true,
			selectedTab: 'hsl',
			showMatrix: true,
			showSlidersGlobal: true,
			showHex: true,
			showNumeric: true,
			showLabels: true,
			showSliders: {
				"hsl.h": true,
				"hsl.s": true,
				"hsl.l": true,
				"hcl.h": true,
				"hcl.c": true,
				"hcl.l": true,
				"lab.l": true,
				"lab.a": true,
				"lab.b": true,
				"rgb.r": true,
				"rgb.g": true,
				"rgb.b": true,
			},
			selectDimensions: true,
			matrixWidth: 300,
			matrixHeight: 200,
			scrollbarHeight: 20,
	}
</script>
<div class="text-black flex flex-row mx-auto">
  <ColorPicker
    bind:color={color}
    background={background}

    collapse={true}

    handleWidth={165}
    handleHeight={40}

    tabbed={settings.tabbed}
    selectedTab={settings.selectedTab}

    selectedDimension={settings.selectedDimension}

    showMatrix={settings.showMatrix}
    showSliders={settings.showSlidersGlobal && settings.showSliders}
    showHex={settings.showHex}
    showLabels={settings.showLabels}
    showNumeric={settings.showNumeric}
    selectDimensions={settings.selectDimensions}

    matrixWidth={settings.matrixWidth}
    matrixHeight={settings.matrixHeight}
    scrollbarHeight={settings.scrollbarHeight}
  />
</div>