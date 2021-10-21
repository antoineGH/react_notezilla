import React from 'react'
import NoteComponent from '../noteComponent/NoteComponent'
import { Col } from 'antd'

export default function NoteListComponent(props) {
	const {
		notes,
		handleDeleteNote,
		isLoadingDelete,
		handleToggleNote,
		isLoadingToggleNote,
	} = props

	const renderEmptyNote = () => {
		return (
			<Col className='col-noresult'>
				<p>No results from search</p>
			</Col>
		)
	}

	return (
		<>
			{notes.length >= 1
				? notes.map((note) => {
						return (
							<Col key={note.note_id}>
								<NoteComponent
									note={note}
									handleToggleNote={handleToggleNote}
									isLoadingToggleNote={isLoadingToggleNote}
									handleDeleteNote={handleDeleteNote}
									isLoadingDelete={isLoadingDelete}
								/>
							</Col>
						)
				  })
				: renderEmptyNote()}
		</>
	)
}
