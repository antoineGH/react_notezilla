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
import { selectSearch } from '../search/searchSlice'
import NoteListComponent from '../../components/noteListComponent/NoteListComponent'
import AddNoteComponent from '../../components/addNoteComponent/AddNoteComponent'
import LastNoteComponent from '../../components/lastNoteComponent/LastNoteComponent'
import Scratch from '../../features/scratch/Scratch'
import { Row, Col } from 'antd'
import './Note.css'

export default function Note() {
	const dispatch = useDispatch()
	const notes = useSelector(selectNotes)
	const searchParam = useSelector(selectSearch)
	const isLoadingDeleteNote = useSelector(selectIsLoadingDeleteNote)
	const isLoadingToggleNote = useSelector(selectIsLoadingToggleNote)

	const [sort, setSort] = useState(false)
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
		if (sort && sortBy === 'Date') return 'Oldest'
		return 'Newest'
	}

	const search = () => {
		const notesSearch = notes.filter((note) => {
			return (
				note.note_title.toLowerCase().includes(searchParam.toLowerCase()) ||
				note.note_content.toLowerCase().includes(searchParam.toLowerCase())
			)
		})
		return notesSearch
	}

	return (
		<div className='container-content'>
			<>
				<Row className='row-listnotes'>
					<Col className='col-listnotes'>
						<NoteListComponent
							notes={searchParam ? search() : notes}
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
					<Col span={8} className='col-addnote'>
						<AddNoteComponent />
					</Col>
					<Col span={8} className='col-scratchpad'>
						<Scratch />
					</Col>
					<Col span={8} className='col-scratchpad'>
						<LastNoteComponent notes={notes} />
					</Col>
				</Row>
			</>
		</div>
	)
}
