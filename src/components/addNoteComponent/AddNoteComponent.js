import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addNote, selectIsLoadingAddNote } from '../../features/note/NoteSlice'
import NoteAddForm from '../../forms/noteAddForm/NoteAddForm'
import { openNotificationWithIcon } from '../../utils/notification'

export default function AddNoteComponent() {
	const isLoadingAddNote = useSelector(selectIsLoadingAddNote)
	const dispatch = useDispatch()

	const handleAddNote = (note_title, note_content, isCompleted) => {
		if (!note_title || !note_content) {
			openNotificationWithIcon(
				'info',
				'No Changes',
				'Todo was not saved.'
			)
			return
		}
		dispatch(addNote({ note_title, note_content, isCompleted }))
	}

	return (
		<>
			AddNoteComponent
			<NoteAddForm
				handleAddNote={handleAddNote}
				isLoadingAddNote={isLoadingAddNote}
			/>
		</>
	)
}
