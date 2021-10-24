export const checkExists = (str, value, options, notes) => {
	if (str.length < value.length) {
		const resetOptions = []
		notes.forEach((note) => {
			resetOptions.push({ value: note.note_title })
		})
		const newValues = []
		Object.values(resetOptions).forEach((value) => {
			if (value.value.includes(str)) {
				newValues.push({ value: value.value })
			}
		})
		return newValues
	}
	if (options) {
		const newValues = []
		Object.values(options).forEach((value) => {
			if (value.value.includes(str)) {
				newValues.push({ value: value.value })
			}
		})
		return newValues
	} else {
		return { value: [] }
	}
}

export const resetOptions = (notes) => {
	const options = []
	notes.forEach((note) => {
		options.push({ value: note.note_title })
	})
	return options
}
