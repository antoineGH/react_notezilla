import React from 'react'
import { summaryContent, summaryTitle, getDate } from './utils'
import { Row, Col, Typography, Switch, Button } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import './NoteComponent.css'

export default function NoteComponent(props) {
	const {
		note,
		handleToggleNote,
		isLoadingToggleNote,
		handleDeleteNote,
		isLoadingDelete,
	} = props
	const { Title, Text } = Typography

	return (
		<>
			<>
				<Row className='row-note-top'>
					<Row className='row-notesub-title'>
						<Col className='col-notesub-title' span={20}>
							<Title level={5} className='note-title'>
								{summaryTitle(note.note_title)}
							</Title>
						</Col>
						<Col span={4} className='col-notesub-delete'>
							<Button
								className='btn-closetodo'
								onClick={() => handleDeleteNote(note.note_id)}
								loading={isLoadingDelete}
								icon={<CloseOutlined />}></Button>
						</Col>
					</Row>
					<Col className='col-note-content'>
						<Text className='note-content'>
							{summaryContent(note.note_content)}
						</Text>
					</Col>
				</Row>
				<Row>
					<Col span={12} className='col-note-date'>
						<Text className='note-date'>
							{getDate(note.date_created)}
						</Text>
					</Col>
					<Col span={11} className='col-note-switch'>
						<Switch
							id='completed'
							name='completed'
							onChange={() =>
								handleToggleNote(note.note_id, !note.completed)
							}
							defaultChecked={note.completed}
							disabled={isLoadingToggleNote}
						/>
					</Col>
				</Row>
			</>
		</>
	)
}
