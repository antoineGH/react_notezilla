import React, { useState, useMemo, useRef } from 'react'
import debounce from 'lodash/debounce'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { getDate } from '../../components/noteComponent/utils'
import { Row, Col, Form, Input, Button, Typography, Switch, Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import './LastNoteForm.css'

export default function LastNoteForm(props) {
	const { lastNote, isLoadingAddNote, handleSaveNote, handleUpdateNote } = props
	const { Text } = Typography
	const { TextArea } = Input
	const antIcon = <LoadingOutlined style={{ fontSize: 16 }} spin />
	const note_id = lastNote?.note_id

	const validationSchema = Yup.object({
		last_note_title: Yup.string().min(2, 'Too Short').max(200, 'Too Long'),
		last_note_content: Yup.string().min(2, 'Too Short').max(800, 'Too Long'),
	})

	const [isCompleted, setIsCompleted] = useState(lastNote?.completed)
	const title = useRef()
	const content = useRef()
	const completed = useRef()

	const { handleSubmit, handleChange, handleBlur, values, touched, errors } = useFormik({
		enableReinitialize: true,
		initialValues: {
			last_note_title: lastNote?.note_title,
			last_note_content: lastNote?.note_content,
		},
		validationSchema,
		onSubmit(values) {
			const { last_note_title, last_note_content } = values
			handleSaveNote(last_note_title, last_note_content, isCompleted)
		},
	})

	const debounceHandleUpdateNote = useMemo(
		() =>
			debounce(
				() =>
					handleUpdateNote(
						note_id,
						title.current.props.value,
						content.current.resizableTextArea.props.value,
						completed.current.ariaChecked
					),
				1200
			),
		[] // eslint-disable-line
	)

	return (
		<>
			<div className='container-addnote'>
				<Form onSubmit={handleSubmit} onChange={debounceHandleUpdateNote}>
					<Row className='row-lastnote-top'>
						<Col className='col-addnote-topleft' span={16}>
							<Form.Item className='form-item'>
								<Input
									ref={title}
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
							ref={content}
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
							<Text className='note-date'>{getDate(lastNote.date_created)}</Text>
						</Col>
						<Col span={11} className='col-note-switch' style={{ marginRight: '1rem' }}>
							<Switch
								ref={completed}
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
