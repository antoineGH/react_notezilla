import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
	deleteNote,
	loadNotes,
	selectIsLoadingDeleteNote,
	selectIsLoadingToggleNote,
	selectNotes,
	toggleCheck,
} from './NoteSlice'
import NoteListComponent from '../../components/noteListComponent/NoteListComponent'
import AddNoteComponent from '../../components/addNoteComponent/AddNoteComponent'
import Scratch from '../../features/scratch/Scratch'
import { Row, Col } from 'antd'
import './Note.css'

export default function Note() {
	const dispatch = useDispatch()
	const notes = useSelector(selectNotes)
	const isLoadingDeleteNote = useSelector(selectIsLoadingDeleteNote)
	const isLoadingToggleNote = useSelector(selectIsLoadingToggleNote)

	const [sort, setSort] = useState(true)
	const [sortBy, setSortBy] = useState('Date')

	useEffect(() => {
		dispatch(loadNotes())
	}, [dispatch])

	const handleDeleteNote = (note_id) => {
		dispatch(deleteNote(note_id))
	}

	const handleToggleNote = (note_id, completed) => {
		dispatch(toggleCheck({ note_id, completed }))
	}

	const sortStatus = () => {
		if (sort && sortBy === 'Status') return 'Completed'
		if (!sort && sortBy === 'Status') return 'Not Completed'
		if (sort && sortBy === 'Date') return 'Newest'
		return 'Oldest'
	}

	return (
		<div className='container-content'>
			<>
				<Row className='row-listnotes'>
					<Col className='col-listnotes'>
						<NoteListComponent
							notes={notes}
							handleDeleteNote={handleDeleteNote}
							handleToggleNote={handleToggleNote}
							isLoadingDelete={isLoadingDeleteNote}
							isLoadingToggleNote={isLoadingToggleNote}
							sort={sort}
							setSort={setSort}
							sortBy={sortBy}
							setSortBy={setSortBy}
							sortStatus={sortStatus}
						/>
					</Col>
				</Row>
				<Row justify='space-between' className='row-scratchpad-add'>
					<Col span={12} className='col-addnote'>
						<AddNoteComponent />
					</Col>
					<Col span={12} className='col-scratchpad'>
						<Scratch />
					</Col>
				</Row>
				<Row></Row>
			</>
		</div>
	)
}
