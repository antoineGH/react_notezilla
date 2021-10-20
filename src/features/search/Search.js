import React from 'react'
import { useDispatch } from 'react-redux'
import { setSearch } from './searchSlice'
import SearchBarComponent from '../../components/searchbarComponent/SearchBarComponent'

export default function Search(props) {
	const { logged } = props
	const dispatch = useDispatch()

	const handleSearch = (searchParam) => {
		dispatch(setSearch(searchParam))
	}

	return (
		<>
			{logged ? <SearchBarComponent handleSearch={handleSearch} /> : null}
		</>
	)
}
