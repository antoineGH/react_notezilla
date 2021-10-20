import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Spin, Form, Input, Button, Typography } from 'antd'
import {
	LoadingOutlined,
	PlusOutlined,
	DeleteOutlined,
} from '@ant-design/icons'

export default function ScratchAddForm(props) {
	const {
		isLoadingAddScratch,
		isLoadingDeleteScratch,
		handleAddScratch,
		handleDeleteScratch,
		scratch_title,
		scratch_content,
	} = props
	const { Text } = Typography
	const antIcon = <LoadingOutlined style={{ fontSize: 16 }} spin />

	const validationSchema = Yup.object({
		scratch_title: Yup.string().min(3, 'Too Short').max(200, 'Too Long'),
		scratch_content: Yup.string().min(3, 'Too Short').max(800, 'Too Long'),
	})

	const { handleSubmit, handleChange, handleBlur, values, touched, errors } =
		useFormik({
			initialValues: {
				scratch_title: scratch_title,
				scratch_content: scratch_content,
			},
			validationSchema,
			onSubmit(values) {
				const { scratch_title, scratch_content } = values
				handleAddScratch(scratch_title, scratch_content, false)
			},
		})

	return (
		<>
			<Form onSubmit={handleSubmit} layout='inline'>
				<Form.Item className='form-item'>
					<Input
						id='scratch_title'
						name='scratch_title'
						type='text'
						placeholder='Scratch Title'
						className={
							errors.scratch_title &&
							touched.scratch_title &&
							'error_field'
						}
						onBlur={handleBlur}
						value={values.scratch_title}
						onChange={handleChange}
					/>
				</Form.Item>
				<Form.Item className='form-item'>
					<Input
						id='scratch_content'
						name='scratch_content'
						type='text'
						placeholder='Scratch Content'
						className={
							errors.scratch_content &&
							touched.scratch_content &&
							'error_field'
						}
						onBlur={handleBlur}
						value={values.scratch_content}
						onChange={handleChange}
					/>
				</Form.Item>
				<Form.Item className='form-item'>
					<Button
						type='primary'
						onClick={handleSubmit}
						icon={<PlusOutlined style={{ fontSize: '.8rem' }} />}
						disabled={isLoadingAddScratch}>
						Save
						{isLoadingAddScratch && (
							<Spin size='small' indicator={antIcon} />
						)}
					</Button>
				</Form.Item>
			</Form>
			<Button
				type='primary'
				onClick={handleDeleteScratch}
				icon={<DeleteOutlined style={{ fontSize: '.8rem' }} />}
				disabled={isLoadingDeleteScratch}>
				Clear ScratchPad
				{isLoadingAddScratch && (
					<Spin size='small' indicator={antIcon} />
				)}
			</Button>

			<div className='add-errors'>
				{errors.scratch_title && touched.scratch_title && (
					<Text type='danger'>{errors.scratch_title}</Text>
				)}
				{errors.scratch_content && touched.scratch_content && (
					<Text type='danger'>{errors.scratch_content}</Text>
				)}
			</div>
		</>
	)
}
