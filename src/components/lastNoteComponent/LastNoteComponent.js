import React, { useState, useEffect } from 'react'
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

const getLastNote = (notes) => {
	return notes
		.map(function (note) {
			return note
		})
		.sort()
		.reverse()[0]
}

export default function LastNoteComponent(props) {
	const { notes } = props
	const [lastNote, setLastNote] = useState(getLastNote(notes))
	const isLoadingNotes = useSelector(selectIsLoadingNotes)
	const hasErrorNotes = useSelector(selectHasErrorNotes)
	const isLoadingAddNote = useSelector(selectIsLoadingAddNote)
	const dispatch = useDispatch()

	useEffect(() => {
		setLastNote(getLastNote(notes))
	}, [notes])

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
		if (isLoadingNotes || !lastNote) {
			return (
				<Skeleton.Input style={{ width: 738, height: 364, borderRadius: '8px' }} active={true} size='large' />
			)
		}

		return (
			<LastNoteForm
				lastNote={lastNote}
				isLoadingNotes={isLoadingNotes}
				isLoadingAddNote={isLoadingAddNote}
				handleSaveNote={handleSaveNote}
			/>
		)
	}

	return renderLastNote()
}
