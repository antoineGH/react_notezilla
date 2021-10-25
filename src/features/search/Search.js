import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSearch } from './searchSlice'
import { selectNotes } from '../note/NoteSlice'
import SearchBarComponent from '../../components/searchbarComponent/SearchBarComponent'

export default function Search(props) {
	const { logged } = props
	const dispatch = useDispatch()
	const notes = useSelector(selectNotes)

	const handleSearch = (searchParam) => {
		dispatch(setSearch(searchParam))
	}

	const handleResetSearch = () => {
		dispatch(setSearch(''))
	}

	return (
		<>
			{logged && notes.length >= 1 ? (
				<SearchBarComponent notes={notes} handleSearch={handleSearch} handleResetSearch={handleResetSearch} />
			) : null}
		</>
	)
}
