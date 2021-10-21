import React from 'react'
import { Row, Col, Typography } from 'antd'

import './NoteComponent.css'

export default function NoteComponent(props) {
	const {
		note,
		// handleToggleNote,
		// isLoadingToggleNote,
		// handleDeleteNote,
		// isLoadingDelete,
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

	return (
		<>
			<Row>
				<Col>
					<Title level={5} className='note-title'>
						{note.note_title}
					</Title>
				</Col>
				<Col>
					<Text className='note-content'>{note.note_content}</Text>
				</Col>
			</Row>
			<Row>
				{note.date_created && (
					<Col className='col-note-date'>
						<Text className='note-date'>
							{getDate(note.date_created)}
						</Text>
					</Col>
				)}
			</Row>
		</>
	)
}
