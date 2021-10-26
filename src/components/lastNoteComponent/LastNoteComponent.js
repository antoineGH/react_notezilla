import React from 'react'
import LastNoteForm from '../../forms/lastNoteForm/LastNoteForm'
import { useSelector, useDispatch } from 'react-redux'
import {
	selectIsLoadingNotes,
	selectHasErrorNotes,
	selectIsLoadingAddNote,
	addNote,
} from '../../features/note/NoteSlice'
import { openNotificationWithIcon } from '../../utils/notification'
import { Skeleton } from 'antd'
import './LastNoteComponent.css'

export default function LastNoteComponent(props) {
	const { notes } = props

	const isLoadingNotes = useSelector(selectIsLoadingNotes)
	const hasErrorNotes = useSelector(selectHasErrorNotes)
	const isLoadingAddNote = useSelector(selectIsLoadingAddNote)
	const dispatch = useDispatch()

	// TODO: Sort Notes by Date to get latest
	const last_note = notes[0]
	const last_note_title = last_note?.note_title
	const last_note_content = last_note?.note_content
	const last_note_completed = last_note?.completed
	const last_note_date = last_note?.date_created

	const handleSaveNote = (note_title, note_content, isCompleted) => {
		if (!note_title || !note_content) {
			openNotificationWithIcon('info', 'No Changes', 'Note was not saved.')
			return
		}
		dispatch(addNote({ note_title, note_content, isCompleted }))
	}

	const renderLastNote = () => {
		if (hasErrorNotes) {
			return ''
		}
		if (isLoadingNotes) {
			return (
				<Skeleton.Input style={{ width: 738, height: 364, borderRadius: '8px' }} active={true} size='large' />
			)
		}
		return (
			<LastNoteForm
				last_note_title={last_note_title}
				last_note_content={last_note_content}
				last_note_completed={last_note_completed}
				last_note_date={last_note_date}
				isLoadingNotes={isLoadingNotes}
				isLoadingAddNote={isLoadingAddNote}
				handleSaveNote={handleSaveNote}
			/>
		)
	}

	return renderLastNote()
}
