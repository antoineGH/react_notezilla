import uniqBy from 'lodash/uniqBy'

export const resetOptions = (notes) => {
	const options = []
	notes.forEach((note) => {
		options.push({ value: note.note_title })
	})
	return options
}
