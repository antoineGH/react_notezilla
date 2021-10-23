import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
	selectIsLoadingNotes,
	selectHasErrorNotes,
	loadNotes,
} from '../../features/note/NoteSlice'

import NoteComponent from '../noteComponent/NoteComponent'
import {
	Col,
	Row,
	Typography,
	Menu,
	Dropdown,
	Button,
	Tooltip,
	Spin,
} from 'antd'
import {
	CaretUpOutlined,
	CaretDownOutlined,
	RightOutlined,
	FileAddOutlined,
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
	const isLoadingNotes = useSelector(selectIsLoadingNotes)
	const hasErrorNotes = useSelector(selectHasErrorNotes)
	const dispatch = useDispatch()
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

	const renderErrorNote = () => {
		return (
			<Row className='row-error-note'>
				<Col className='col-error-render-note'>
					<p>Error retrieving your notes</p>
				</Col>
				<Col className='col-error-render-note'>
					<Button onClick={handleTryAgain}>Try Again</Button>
				</Col>
			</Row>
		)
	}

	const renderLoadingNote = () => {
		return (
			<Row className='row-loading-note'>
				<Col className='col-loading-render-note'>
					<Spin />
				</Col>
			</Row>
		)
	}

	const handleTryAgain = () => {
		dispatch(loadNotes())
	}

	// TODO: Create Function Add Note to open Modal Form to add Note
	// TODO: Implement Pagination with Arrows to browse Notes return from API

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
				<Col className='col-addnote-right' span={4}>
					<Tooltip title='New Note'>
						<Button
							type='primary'
							icon={
								<FileAddOutlined style={{ fontSize: '1rem' }} />
							}
						/>
					</Tooltip>
				</Col>
			</Row>
			<Row>
				<Col>
					<Dropdown overlay={menu} placement='bottomCenter' arrow>
						<Button id='sort-type'>Sort By {sortBy}</Button>
					</Dropdown>
				</Col>
				<Col>
					<Button id='sort-toggle' onClick={() => setSort(!sort)}>
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
			{hasErrorNotes && renderErrorNote()}
			{!isLoadingNotes ? (
				<>
					<Row className='row-notes'>
						{notes.length >= 1
							? []
									.concat(notes)
									.sort(selectSort)
									.map((note) => {
										return (
											<Col
												span={5}
												key={note.note_id}
												className='col-note'>
												<NoteComponent
													note={note}
													handleToggleNote={
														handleToggleNote
													}
													isLoadingToggleNote={
														isLoadingToggleNote
													}
													handleDeleteNote={
														handleDeleteNote
													}
													isLoadingDelete={
														isLoadingDelete
													}
												/>
											</Col>
										)
									})
							: !hasErrorNotes && renderEmptyNote()}
					</Row>
				</>
			) : (
				renderLoadingNote()
			)}
		</>
	)
}
