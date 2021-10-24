import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectSearch, setSearch } from '../../features/search/searchSlice'
import { checkExists, resetOptions } from './utils'
import { AutoComplete, Row, Col, Button } from 'antd'
import './SearchBarComponent.css'
import { SearchOutlined, CloseOutlined } from '@ant-design/icons'

export default function SearchBarComponent(props) {
	const { handleSearch, handleResetSearch, notes } = props
	const dispatch = useDispatch()
	const [value, setValue] = useState('')
	const [options, setOptions] = useState([])
	const searchParam = useSelector(selectSearch)

	useEffect(() => {
		notes.forEach((note) => {
			setOptions((previousState) => {
				return [...previousState, { value: note.note_title }]
			})
		})
		// eslint-disable-next-line
	}, [])

	useEffect(() => {
		if (value.length === 0) {
			dispatch(setSearch(''))
		}
	}, [value, dispatch])

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
		<>
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
			{searchParam && (
				<Row className='row-delete-search'>
					<Col>
						<Button id='button-delete-search' type='primary' onClick={handleResetSearch}>
							{searchParam}
							<CloseOutlined />
						</Button>
					</Col>
				</Row>
			)}
		</>
	)
}
