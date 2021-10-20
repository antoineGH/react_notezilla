import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Spin, Form, Input, Button, Typography, Switch } from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'

export default function NoteAddForm(props) {
	const { isLoadingAddNote, handleAddNote } = props
	const { Text } = Typography
	const antIcon = <LoadingOutlined style={{ fontSize: 16 }} spin />

	const validationSchema = Yup.object({
		note_title: Yup.string().min(3, 'Too Short').max(200, 'Too Long'),
		note_content: Yup.string().min(3, 'Too Short').max(800, 'Too Long'),
		completed: Yup.boolean(),
	})

	const [isCompleted, setIsCompleted] = useState(false)

	const { handleSubmit, handleChange, handleBlur, values, touched, errors } =
		useFormik({
			initialValues: {
				note_title: '',
				note_content: '',
			},
			validationSchema,
			onSubmit(values) {
				const { note_title, note_content } = values
				handleAddNote(note_title, note_content, isCompleted)
				values.note_title = ''
				values.note_content = ''
				setIsCompleted(false)
			},
		})
	return (
		<>
			<Form onSubmit={handleSubmit} layout='inline'>
				<Form.Item className='form-item'>
					<Input
						id='note_title'
						name='note_title'
						type='text'
						placeholder='Note Title'
						className={
							errors.note_title &&
							touched.note_title &&
							'error_field'
						}
						onBlur={handleBlur}
						value={values.note_title}
						onChange={handleChange}
					/>
				</Form.Item>
				<Form.Item className='form-item'>
					<Input
						id='note_content'
						name='note_content'
						type='text'
						placeholder='Note Content'
						className={
							errors.note_content &&
							touched.note_content &&
							'error_field'
						}
						onBlur={handleBlur}
						value={values.note_content}
						onChange={handleChange}
					/>
				</Form.Item>
				<Form.Item className='form-item'>
					<Switch
						id='completed'
						name='completed'
						type='text'
						onChange={() => setIsCompleted(!isCompleted)}
						checked={isCompleted}
						loading={isLoadingAddNote}
					/>
				</Form.Item>
				<Form.Item className='form-item'>
					<Button
						type='primary'
						onClick={() => handleSubmit()}
						icon={<PlusOutlined style={{ fontSize: '.8rem' }} />}
						disabled={isLoadingAddNote}>
						Add
						{isLoadingAddNote && (
							<Spin size='small' indicator={antIcon} />
						)}
					</Button>
				</Form.Item>
			</Form>

			<div className='add-errors'>
				{errors.note_title && touched.note_title && (
					<Text type='danger'>{errors.note_title}</Text>
				)}
				{errors.note_content && touched.note_content && (
					<Text type='danger'>{errors.note_content}</Text>
				)}
			</div>
		</>
	)
}
