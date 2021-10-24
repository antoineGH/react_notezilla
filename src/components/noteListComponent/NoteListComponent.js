import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectIsLoadingNotes, selectHasErrorNotes, loadNotes } from '../../features/note/NoteSlice'
import NoteComponent from '../noteComponent/NoteComponent'
import { selectSort } from './utils'
import { Col, Row, Typography, Menu, Dropdown, Button, Tooltip, Skeleton } from 'antd'
import { CaretUpOutlined, CaretDownOutlined, RightOutlined, FileAddOutlined } from '@ant-design/icons'
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

	const renderEmptyNote = () => {
		return (
			<Row className='row-empty-note'>
				<Col className='col-noresult'>
					<p>No notes</p>
				</Col>
			</Row>
		)
	}

	const renderErrorNote = () => {
		return (
			<Row className='row-error-note'>
				<Col className='col-error-render-note'>
					<p>Error retrieving your notes</p>
				</Col>
				<Col className='col-error-render-note'>
					<Button onClick={handleTryAgain} id='try-again'>
						Try Again
					</Button>
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
						NOTES <RightOutlined style={{ fontSize: '.8rem', color: 'var(--green)' }} />
					</Title>
				</Col>
				<Col className='col-addnote-right' span={4}>
					<Tooltip title='New Note'>
						<Button type='primary' icon={<FileAddOutlined style={{ fontSize: '1rem' }} />} />
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

			<>
				<Row className='row-notes'>
					{isLoadingNotes && (
						<>
							<Col className='col-note' span={5}>
								<Skeleton
									active
									paragraph={{ rows: 11 }}
									style={{
										width: 200,
									}}></Skeleton>
							</Col>
							<Col className='col-note' span={5}>
								<Skeleton
									active
									paragraph={{ rows: 11 }}
									style={{
										width: 200,
									}}></Skeleton>
							</Col>
							<Col className='col-note' span={5}>
								<Skeleton
									active
									paragraph={{ rows: 11 }}
									style={{
										width: 200,
									}}></Skeleton>
							</Col>
							<Col className='col-note' span={5}>
								<Skeleton
									active
									paragraph={{ rows: 11 }}
									style={{
										width: 200,
									}}></Skeleton>
							</Col>
							<Col className='col-note' span={5}>
								<Skeleton
									active
									paragraph={{ rows: 11 }}
									style={{
										width: 200,
									}}></Skeleton>
							</Col>
						</>
					)}

					{notes.length >= 1
						? []
								.concat(notes)
								.sort(selectSort)
								.map((note) => {
									return (
										<Col span={5} key={note.note_id} className='col-note'>
											<NoteComponent
												note={note}
												handleToggleNote={handleToggleNote}
												isLoadingToggleNote={isLoadingToggleNote}
												handleDeleteNote={handleDeleteNote}
												isLoadingDelete={isLoadingDelete}
												isLoadingNotes={isLoadingNotes}
											/>
										</Col>
									)
								})
						: !hasErrorNotes && renderEmptyNote()}
				</Row>
			</>
		</>
	)
}
