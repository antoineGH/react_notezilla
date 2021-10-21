import React, { useState } from 'react'
import { Input } from 'antd'
import './SearchBarComponent.css'
import { SearchOutlined } from '@ant-design/icons'

export default function SearchBarComponent(props) {
	const { handleSearch } = props
	const [searchParam, setSearchParam] = useState('')
	const { Search } = Input

	return (
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
	)
}
