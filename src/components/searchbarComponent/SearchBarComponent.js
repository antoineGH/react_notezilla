import React, { useState, useEffect } from 'react'
import { checkExists, resetOptions } from './utils'
import { Input, AutoComplete } from 'antd'
import './SearchBarComponent.css'
import { SearchOutlined } from '@ant-design/icons'

export default function SearchBarComponent(props) {
	const { handleSearch, notes } = props
	const [searchParam, setSearchParam] = useState('')
	const [value, setValue] = useState('')
	const [options, setOptions] = useState([])
	const { Search } = Input

	useEffect(() => {
		console.log('useEffect - Init Note as Option')
		notes.forEach((note) => {
			setOptions((previousState) => {
				return [...previousState, { value: note.note_title }]
			})
		})
		// eslint-disable-next-line
	}, [])

	const onSearch = (searchText) => {
		setOptions(
			!searchText
				? resetOptions(notes)
				: checkExists(searchText, value, options, notes)
		)
	}

	const onSelect = (data) => {
		console.log('onSelect', data)
	}

	const onChange = (data) => {
		setValue(data)
	}

	return (
		<>
			<Search
				className='search-component'
				placeholder='Search'
				type='text'
				id='search'
				icon={<SearchOutlined />}
				onSearch={() => handleSearch(searchParam)}
				onChange={(e) => setSearchParam(e.target.value)}
				value={searchParam}
				enterButton
			/>

			<AutoComplete
				value={value}
				options={options}
				style={{
					width: 200,
				}}
				onSelect={onSelect}
				onSearch={onSearch}
				onChange={onChange}
				placeholder='control mode'
			/>
		</>
	)
}
