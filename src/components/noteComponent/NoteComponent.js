import React from 'react'

export default function NoteComponent(props) {
	const {
		note,
		// handleToggleNote,
		// isLoadingToggleNote,
		// handleDeleteNote,
		// isLoadingDelete,
	} = props

	return (
		<div>
			{note.note_id} {note.note_title} {note.note_content}{' '}
			{note.date_created}
		</div>
	)
}
