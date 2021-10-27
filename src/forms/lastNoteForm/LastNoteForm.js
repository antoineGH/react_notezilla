import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { getDate } from '../../components/noteComponent/utils'
import { Row, Col, Form, Input, Button, Typography, Switch, Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import './LastNoteForm.css'

export default function LastNoteForm(props) {
	const {
		last_note_title,
		last_note_content,
		last_note_completed,
		last_note_date,

		isLoadingAddNote,
		handleSaveNote,
	} = props
	const { Text } = Typography
	const { TextArea } = Input
	const antIcon = <LoadingOutlined style={{ fontSize: 16 }} spin />

	const validationSchema = Yup.object({
		last_note_title: Yup.string().min(2, 'Too Short').max(200, 'Too Long'),
		last_note_content: Yup.string().min(2, 'Too Short').max(800, 'Too Long'),
	})

	const [isCompleted, setIsCompleted] = useState(last_note_completed)

	const { handleSubmit, handleChange, handleBlur, values, touched, errors } = useFormik({
		initialValues: {
			last_note_title: last_note_title,
			last_note_content: last_note_content,
		},
		validationSchema,
		onSubmit(values) {
			const { last_note_title, last_note_content } = values
			handleSaveNote(last_note_title, last_note_content, isCompleted)
		},
	})

	return (
		<>
			<div className='container-addnote'>
				<Form onSubmit={handleSubmit}>
					<Row className='row-lastnote-top'>
						<Col className='col-addnote-topleft' span={16}>
							<Form.Item className='form-item'>
								<Input
									id='last_note_title'
									name='last_note_title'
									type='text'
									placeholder='Note Title'
									className={errors.last_note_title && touched.last_note_title && 'error_field'}
									onBlur={handleBlur}
									value={values.last_note_title}
									onChange={handleChange}
								/>
								<div className='div-error-input'>
									{errors.last_note_title && touched.last_note_title && (
										<Text type='danger'>{errors.last_note_title}</Text>
									)}
								</div>
							</Form.Item>
						</Col>
						<Col className='col-addnote-topright col-flex-right' span={7}>
							<Button
								id='new-note'
								className='save-note'
								type='primary'
								onClick={() => handleSubmit()}
								disabled={isLoadingAddNote}>
								Save
								{isLoadingAddNote && <Spin size='small' indicator={antIcon} />}
							</Button>
						</Col>
					</Row>
					<Form.Item className='form-item'>
						<TextArea
							rows={9}
							id='last_note_content'
							name='last_note_content'
							type='text'
							placeholder='Note Content'
							className={errors.last_note_content && touched.last_note_content && 'error_field'}
							onBlur={handleBlur}
							value={values.last_note_content}
							onChange={handleChange}
						/>{' '}
						<div className='div-error-input'>
							{errors.last_note_content && touched.last_note_content && (
								<Text type='danger'>{errors.last_note_content}</Text>
							)}
						</div>
					</Form.Item>

					<Row>
						<Col span={11} className='col-note-date' style={{ marginLeft: '1rem' }}>
							<Text className='note-date'>{getDate(last_note_date)}</Text>
						</Col>
						<Col span={11} className='col-note-switch' style={{ marginRight: '1rem' }}>
							<Switch
								tabIndex='-1'
								id='completed'
								name='completed'
								type='text'
								onChange={() => setIsCompleted(!isCompleted)}
								checked={isCompleted}
								loading={isLoadingAddNote}
							/>
						</Col>
					</Row>
				</Form>
			</div>

			<div className='add-errors'></div>
		</>
	)
}
