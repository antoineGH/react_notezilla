import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { authFetch } from '../../utils/authHook'
import { openNotificationWithIcon } from '../../utils/notification'
import toTitle from '../../utils/toTitle'

// Slice Reducer
////////////////////////////////

const initialValue = {
	value: [],
	isLoadingNotes: false,
	hasErrorNotes: false,
	isLoadingAdd: false,
	hasErrorAddNote: false,
	isLoadingToggleNote: false,
	hasErrorToggleNote: false,
	isLoadingDeleteNote: false,
	hasErrorDeleteNote: false,
}

export const loadNotes = createAsyncThunk('notes/getAllNotes', async () => {
	const data = await authFetch(`http://127.0.0.1:5000/api/notes`)
	const json = await data.json()
	if (json.hasOwnProperty('message')) {
		if (json['message'] === 'Notes not found') {
			return { notes: [] }
		}
	}
	return json
})

export const addNote = createAsyncThunk('notes/addNote', async (args) => {
	const { note_title, note_content, isCompleted } = args
	const note = { note_title, note_content, completed: isCompleted }
	const data = await authFetch('http://127.0.0.1:5000/api/notes', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(note),
	})
	const json = await data.json()
	if (json.note.hasOwnProperty('note_id')) {
		openNotificationWithIcon(
			'success',
			'Note Added',
			`Note '${toTitle(
				json.note.note_title
			)}' has been added to your account.`
		)
	} else {
		openNotificationWithIcon(
			'error',
			'Note Not Added',
			'Error Adding Note to your account.'
		)
	}
	return json
})

export const deleteNote = createAsyncThunk(
	'notes/deleteNote',
	async (note_id) => {
		const data = await authFetch(
			`http://127.0.0.1:5000/api/note/${note_id}`,
			{
				method: 'DELETE',
			}
		)
		const json = await data.json()
		if (json) {
			openNotificationWithIcon(
				'success',
				'Note Deleted',
				'Note has been deleted'
			)
		} else {
			openNotificationWithIcon(
				'error',
				'Error',
				'Note has not been deleted'
			)
		}
		console.log(json)
		return { json, note_id }
	}
)

export const toggleCheck = createAsyncThunk(
	'notes/toggleCheck',
	async (args) => {
		const { note_id, completed } = args
		const note = { completed }
		const data = await authFetch(
			`http://127.0.0.1:5000/api/note/${note_id}`,
			{
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(note),
			}
		)
		const json = await data.json()
		return json
	}
)

export const noteSlice = createSlice({
	name: 'notes',
	initialState: initialValue,
	reducers: {},
	extraReducers: {
		[loadNotes.pending]: (state) => {
			state.isLoadingNotes = true
			state.hasErrorNotes = false
		},
		[loadNotes.fulfilled]: (state, action) => {
			if (action.payload.notes.length < 1) {
				state.value = []
			} else {
				state.value = action.payload.notes
			}
			state.isLoadingNotes = false
			state.hasErrorNotes = false
		},
		[loadNotes.rejected]: (state) => {
			state.isLoadingNotes = false
			state.hasErrorNotes = true
		},
		[addNote.pending]: (state) => {
			state.isLoadingAddNote = true
			state.hasErrorAddNote = false
		},
		[addNote.fulfilled]: (state, action) => {
			state.value.push(action.payload.note)
			state.isLoadingAddNote = false
			state.hasErrorAddNote = false
		},
		[addNote.rejected]: (state) => {
			state.isLoadingAddNote = false
			state.hasErrorAddNote = true
		},
		[toggleCheck.pending]: (state) => {
			state.isLoadingToggleNote = true
			state.hasErrorToggleNote = false
		},
		[toggleCheck.fulfilled]: (state, action) => {
			const indexObject = state.value.findIndex(
				(note) => note.note_id === action.payload.note.note_id
			)
			state.value[indexObject].completed =
				!state.value[indexObject].completed
			state.isLoadingToggleNote = false
			state.hasErrorToggleNote = false
		},
		[toggleCheck.rejected]: (state) => {
			state.isLoadingToggleNote = false
			state.hasErrorToggleNote = true
		},
		[deleteNote.pending]: (state) => {
			state.isLoadingDeleteNote = true
			state.hasErrorDeleteNote = false
		},
		[deleteNote.fulfilled]: (state, action) => {
			const { note_id } = action.payload
			state.value = state.value.filter((note) => note.note_id !== note_id)
			state.isLoadingDeleteNote = false
			state.hasErrorDeleteNote = false
		},
		[deleteNote.rejected]: (state) => {
			state.isLoadingDeleteNote = false
			state.hasErrorDeleteNote = true
		},
	},
})

// Selectors
////////////////////////////////

export const selectNotes = (state) => state.notes.value
export const selectIsLoadingNotes = (state) => state.notes.isLoadingNotes
export const selectHasErrorNotes = (state) => state.notes.hasErrorNotes
export const selectIsLoadingAddNote = (state) => state.notes.isLoadingAddNote
export const selecthasErrorAddNote = (state) => state.notes.hasErrorAddNote
export const selectIsLoadingDeleteNote = (state) =>
	state.notes.isLoadingDeleteNote
export const selectIsLoadingToggleNote = (state) =>
	state.notes.isLoadingToggleNote
export default noteSlice.reducer
