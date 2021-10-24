import React, { useState, useEffect } from 'react'
import { Input, AutoComplete } from 'antd'
import './SearchBarComponent.css'
import { SearchOutlined } from '@ant-design/icons'

export default function SearchBarComponent(props) {
	const { handleSearch, notes } = props
	const [searchParam, setSearchParam] = useState('')
	const { Search } = Input

	const [value, setValue] = useState('')
	const [options, setOptions] = useState([])

	const checkExists = (str) => {
		if (str.length < value.length) {
			const resetOptions = []
			notes.forEach((note) => {
				resetOptions.push({ value: note.note_title })
			})
			const newValues = []
			Object.values(resetOptions).forEach((value) => {
				if (value.value.includes(str)) {
					newValues.push({ value: value.value })
				}
			})
			return newValues
		}
		if (options) {
			const newValues = []
			Object.values(options).forEach((value) => {
				if (value.value.includes(str)) {
					newValues.push({ value: value.value })
				}
			})
			return newValues
		} else {
			return { value: [] }
		}
	}

	const resetOptions = () => {
		const options = []
		notes.forEach((note) => {
			options.push({ value: note.note_title })
		})
		return options
	}

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
		setOptions(!searchText ? resetOptions() : checkExists(searchText))
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
