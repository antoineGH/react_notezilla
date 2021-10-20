import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
	deleteNote,
	loadNotes,
	selectHasErrorNotes,
	selectIsLoadingAddNote,
	selectIsLoadingDeleteNote,
	selectIsLoadingToggleNote,
	selectNotes,
	toggleCheck,
} from './NoteSlice'
import NoteListComponent from '../../components/noteListComponent/NoteListComponent'
import AddNoteComponent from '../../components/addNoteComponent/AddNoteComponent'
import Scratch from '../../features/scratch/Scratch'
import { Spin, Col, Button } from 'antd'

export default function Note() {
	const dispatch = useDispatch()
	const notes = useSelector(selectNotes)
	const isLoadingNotes = useSelector(selectIsLoadingAddNote)
	const hasErrorNotes = useSelector(selectHasErrorNotes)
	const isLoadingDeleteNote = useSelector(selectIsLoadingDeleteNote)
	const isLoadingToggleNote = useSelector(selectIsLoadingToggleNote)

	useEffect(() => {
		dispatch(loadNotes())
	}, [dispatch])

	const handleDeleteNote = (note_id) => {
		dispatch(deleteNote(note_id))
	}

	const handleToggleNote = (note_id, completed) => {
		dispatch(toggleCheck({ note_id, completed }))
	}

	const handleTryAgain = () => {
		dispatch(loadNotes())
	}

	return (
		<>
			{hasErrorNotes && (
				<Col>
					<p>Error Fetching the API.</p>
					<Button onClick={handleTryAgain}>Try Again</Button>
				</Col>
			)}
			{isLoadingNotes && (
				<Col>
					<Spin />
				</Col>
			)}
			{!isLoadingNotes ? (
				<>
					<NoteListComponent
						notes={notes}
						handleDeleteNote={handleDeleteNote}
						handleToggleNote={handleToggleNote}
						isLoadingDelete={isLoadingDeleteNote}
						isLoadingToggleNote={isLoadingToggleNote}
					/>
					<AddNoteComponent />
					<Scratch />
				</>
			) : (
				<Col>
					<p>No Notes</p>
				</Col>
			)}
		</>
	)
}
