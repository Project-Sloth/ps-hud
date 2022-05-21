<script lang="ts">
	import { ColorPicker, Color } from './color-picker/index'
	const defaultColorString: string = "#03f0b5ff";
	export let colorString: string = defaultColorString;
  export let updateFunction: (colorHex) => void = null;
	let color: Color = Color.hex(colorString);

	$:  {
		// If we are provided an empty string then change it to defaultColorString
		// That way we dont have a false update on loading of the component
		color = Color.hex(colorString != "" ? colorString : defaultColorString);
	}

  $: {
    if (updateFunction && color.toHex) {
			let newColorString: string = color.toHex();
			// Ensure to not update if the colorString is already that color and not the defaultColorString
      if (newColorString != colorString && newColorString != defaultColorString) {
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
				"rgb.a": true,
			},
			selectDimensions: true,
			matrixWidth: 300,
			matrixHeight: 200,
			scrollbarHeight: 20,
	}
</script>
<div class="text-black flex flex-row mx-auto border-2 rounded-[8px] border-gray-600">
		<ColorPicker
			colorString={colorString}
			bind:color={color}
			background={background}

			collapse={true}

			handleWidth={135}
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