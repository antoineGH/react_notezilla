export const sortDateAsc = (a, b) => {
	return a.note_id > b.note_id ? 1 : -1
}
export const sortDateDesc = (a, b) => {
	return a.note_id < b.note_id ? 1 : -1
}

export const sortCompletedAsc = (a, b) => {
	return a.completed === b.completed ? 0 : a.completed ? -1 : 1
}

export const sortCompletedDesc = (a, b) => {
	return a.completed === b.completed ? 0 : a.completed ? 1 : -1
}
