import React from 'react'
import { Row, Col, Typography, Switch } from 'antd'

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

	const getDate = (date) => {
		var months = [
			'Jan',
			'Feb',
			'Mar',
			'Apr',
			'May',
			'Jun',
			'Jul',
			'Aug',
			'Sep',
			'Oct',
			'Nov',
			'Dec',
		]
		var days = [
			'Sunday',
			'Monday',
			'Tuesday',
			'Wednesday',
			'Thursday',
			'Friday',
			'Saturday',
		]
		let formattedTime = ''
		const date_created = new Date(date)
		const date_now = new Date(Date.now())

		let month = months[date_created.getMonth()]
		const day_date = ('0' + date_created.getDate()).slice(-2)
		const day_dateNotFormatted = date_created.getDate()
		const today_dateNotFormatted = date_now.getDate()
		var delta = today_dateNotFormatted - day_dateNotFormatted

		if (delta >= 2) {
			formattedTime = `Last ${days[date_created.getDay()]}`
		} else {
			formattedTime = `${month} ${day_date}`
		}

		return formattedTime
	}

	const summaryTitle = (title) => {
		if (title.length >= 20) {
			return title.slice(0, 20) + '...'
		}
		return title
	}

	const summaryContent = (content) => {
		if (content.length >= 400) {
			return content.slice(0, 400) + '...'
		}
		return content
	}

	return (
		<>
			<Row className='row-note-top'>
				<Col className='col-note-title'>
					<Title level={5} className='note-title'>
						{summaryTitle(note.note_title)}
					</Title>
				</Col>
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
	)
}
