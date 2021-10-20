import React, { useState } from 'react'
import { Input } from 'antd'

export default function SearchBarComponent(props) {
	const { handleSearch } = props
	const [searchParam, setSearchParam] = useState('')
	const { Search } = Input

	return (
		<Search
			placeholder='Search Todo'
			type='text'
			id='search'
			onSearch={() => handleSearch(searchParam)}
			onChange={(e) => setSearchParam(e.target.value)}
			value={searchParam}
			enterButton
		/>
	)
}
