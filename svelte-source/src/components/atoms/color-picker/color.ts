import * as d3 from 'd3-color'

export default class Color {
	mode
	data
	
	constructor (mode, data) {
		this.mode = mode
		this.data = data
	}
	
	static rgba (rgb) {
		return new Color('rgb', rgb)
	}

	static hex (hex) {
		return new Color('rgb', d3.rgb(hex))
	}

	static hsl (hsl) {
		return new Color('hsl', hsl)
	}

	static hcl (hcl) {
		return new Color('hcl', hcl)
	}

	alter (mode, key, value) {
		// express the current color in the desired mode
		const colMode = this.to(mode)

		// alter the dimension
		let data = JSON.parse(JSON.stringify(colMode.data))

		if (mode === "rgb" && key === "a") {
			data['opacity'] = value;
		} else {
			data[key] = value
		}

		return new Color(mode, data)
	}

	get (mode, dim) {
		// Since a (alpha) is really just opacity under the hood, we need to retrieve the correct data
		if (mode === "rgb" && dim === "a") {
			return this.to(mode).data["opacity"];
		} else {
			return this.to(mode).data[dim]
		}
	}

	tuple () {
		return this.mode.split('').map(k => this.data[k])
	}

	to (mode) {
		if (this.mode === mode) {
			return this
		} else if (this.mode === 'rgb') {
			const tuple = this.tuple()
			const color = d3.rgb(...tuple)
			const colorConverted = d3[mode](color)
			return new Color(mode, colorConverted)
		} else if (mode === 'rgb') {
			const tuple = this.tuple()
			let color = d3[this.mode](...tuple).rgb()

			// clamp within [0, 255]
			color = Object.fromEntries(Object.entries(color).map(([k, v]) => v < 0 ? [k, 0] : (v > 255 ? [k, 255] : [k, v])))

			return new Color('rgb', color)
		} else {
			const colorRgb = this.to('rgb')
			const colorConverted = colorRgb.to(mode)
			return colorConverted
		}
	}

	toHex () {
		const vals = Object.values(this.data)
		const color = d3[this.mode](...vals)
		const hex = color.formatHex8()
		return hex
	}

	isDark () {
		let color = this.to('rgb').data
		return (color.r * 0.299 + color.g * 0.587 + color.b * 0.114) <= 186
	}
}