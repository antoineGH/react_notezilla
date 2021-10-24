const sortDateAsc = (a, b) => {
	return a.note_id > b.note_id ? 1 : -1
}
const sortDateDesc = (a, b) => {
	return a.note_id < b.note_id ? 1 : -1
}

const sortCompletedAsc = (a, b) => {
	return a.completed === b.completed ? 0 : a.completed ? -1 : 1
}

const sortCompletedDesc = (a, b) => {
	return a.completed === b.completed ? 0 : a.completed ? 1 : -1
}

export const selectSort = (a, b, sort, sortBy) => {
	if (sort && sortBy === 'Status') return sortCompletedAsc(a, b)
	if (!sort && sortBy === 'Status') return sortCompletedDesc(a, b)
	if (sort && sortBy === 'Date') return sortDateAsc(a, b)
	return sortDateDesc(a, b)
}
