import React, { useState, useEffect } from 'react'
import { checkExists, resetOptions } from './utils'
import { Input, AutoComplete, Row, Col, Button } from 'antd'
import './SearchBarComponent.css'
import { SearchOutlined } from '@ant-design/icons'

export default function SearchBarComponent(props) {
	const { handleSearch, notes } = props
	const [searchParam, setSearchParam] = useState('')
	const [value, setValue] = useState('')
	const [options, setOptions] = useState([])
	const { Search } = Input

	useEffect(() => {
		notes.forEach((note) => {
			setOptions((previousState) => {
				return [...previousState, { value: note.note_title }]
			})
		})
		// eslint-disable-next-line
	}, [])

	const onSearch = (searchText) => {
		setOptions(!searchText ? resetOptions(notes) : checkExists(searchText, value, options, notes))
	}

	const onSelect = (data) => {
		handleSearch(data)
	}

	const onChange = (data) => {
		setValue(data)
	}

	return (
		<Row className='row-search-component'>
			<Col span={18}>
				<AutoComplete
					className='search-component'
					id='search-component'
					value={value}
					options={options}
					style={{
						width: 200,
					}}
					onSelect={onSelect}
					onSearch={onSearch}
					onChange={onChange}
					placeholder='Search'
				/>
			</Col>
			<Col span={4}>
				<Button
					id='search-button'
					type='primary'
					onClick={() => handleSearch(value)}
					icon={<SearchOutlined style={{ fontSize: '1rem' }} />}
				/>
			</Col>
		</Row>
	)
}
