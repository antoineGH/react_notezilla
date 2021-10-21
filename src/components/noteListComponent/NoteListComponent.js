import React from 'react'
import NoteComponent from '../noteComponent/NoteComponent'
import { Col, Row, Typography, Input, Menu, Dropdown, Button } from 'antd'
import {
	FilterOutlined,
	CaretUpOutlined,
	CaretDownOutlined,
	RightOutlined,
} from '@ant-design/icons'
import './NoteListComponent.css'

export default function NoteListComponent(props) {
	const {
		notes,
		sort,
		setSort,
		setSortBy,
		sortStatus,
		sortBy,
		handleDeleteNote,
		isLoadingDelete,
		handleToggleNote,
		isLoadingToggleNote,
	} = props
	const { Search } = Input
	const { Title } = Typography

	const sortDateAsc = (a, b) => {
		return a.note_id > b.note_id ? 1 : -1
	}
	const sortDateDesc = (a, b) => {
		return a.note_id < b.note_id ? 1 : -1
	}

	const sortCompletedAsc = (a, b) => {
		return a.completed === b.completed ? 0 : a.completed ? -1 : 1
	}

	const sortCompletedDesc = (a, b) => {
		return a.completed === b.completed ? 0 : a.completed ? 1 : -1
	}

	const selectSort = (a, b) => {
		if (sort && sortBy === 'Status') return sortCompletedAsc(a, b)
		if (!sort && sortBy === 'Status') return sortCompletedDesc(a, b)
		if (sort && sortBy === 'Date') return sortDateAsc(a, b)
		return sortDateDesc(a, b)
	}

	const renderEmptyNote = () => {
		return (
			<Col className='col-noresult'>
				<p>No results from search</p>
			</Col>
		)
	}

	const menu = (
		<Menu>
			<Menu.Item key='1' onClick={() => setSortBy('Date')}>
				Date
			</Menu.Item>
			<Menu.Item key='2' onClick={() => setSortBy('Status')}>
				Status
			</Menu.Item>
		</Menu>
	)

	return (
		<>
			<Row className='row-notelist'>
				<Col className='col-notelist-left' span={20}>
					<Title level={5} className='title-section'>
						NOTES{' '}
						<RightOutlined
							style={{ fontSize: '.8rem', color: 'var(--green)' }}
						/>
					</Title>
				</Col>
				<Col className='col-notelist-right' span={4}>
					OK
				</Col>
			</Row>
			<Row>
				<Col>
					<Dropdown overlay={menu} placement='bottomCenter' arrow>
						<Button>
							<FilterOutlined />
							Sort By {sortBy}
						</Button>
					</Dropdown>
				</Col>
				<Col>
					<Button onClick={() => setSort(!sort)}>
						{sort ? (
							<>
								{sortStatus()} <CaretDownOutlined />
							</>
						) : (
							<>
								{sortStatus()}
								<CaretUpOutlined />
							</>
						)}
					</Button>
				</Col>
			</Row>
			<Row>
				{notes.length >= 1
					? []
							.concat(notes)
							.sort(selectSort)
							.map((note) => {
								return (
									<Col key={note.note_id}>
										<NoteComponent
											note={note}
											handleToggleNote={handleToggleNote}
											isLoadingToggleNote={
												isLoadingToggleNote
											}
											handleDeleteNote={handleDeleteNote}
											isLoadingDelete={isLoadingDelete}
										/>
									</Col>
								)
							})
					: renderEmptyNote()}
			</Row>
		</>
	)
}
