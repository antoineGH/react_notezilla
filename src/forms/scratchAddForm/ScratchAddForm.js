import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import {
	Row,
	Col,
	Menu,
	Dropdown,
	Form,
	Input,
	Button,
	Typography,
	Tooltip,
} from 'antd'
import {
	SaveOutlined,
	ClearOutlined,
	EllipsisOutlined,
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
	const { TextArea } = Input

	const validationSchema = Yup.object({
		scratch_title: Yup.string().max(200, 'Too Long'),
		scratch_content: Yup.string().max(800, 'Too Long'),
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

	const menu = (
		<Menu>
			<Menu.Item>
				<a onClick={handleSubmit} href='Save'>
					<SaveOutlined style={{ fontSize: '.8rem' }} />
					Save ScratchPad
				</a>
			</Menu.Item>
			<Menu.Item>
				<a onClick={handleDeleteScratch} href='Reset'>
					<ClearOutlined style={{ fontSize: '.8rem' }} />
					Clear ScratchPad
				</a>
			</Menu.Item>
		</Menu>
	)

	return (
		<div className='container-scratchpad'>
			<Form onSubmit={handleSubmit} layout='inline'>
				<Row className='row-scratchpad-top'>
					<Col span={18}>
						<Form.Item className='form-item'>
							<Input
								id='scratch_title'
								name='scratch_title'
								type='text'
								placeholder='SCRATCH PAD'
								className={
									errors.scratch_title &&
									touched.scratch_title &&
									'error_field'
								}
								onBlur={handleBlur}
								value={values.scratch_title}
								onChange={handleChange}
							/>
							{errors.scratch_title && touched.scratch_title && (
								<Text type='danger'>
									{errors.scratch_title}
								</Text>
							)}
						</Form.Item>
					</Col>
					<Col span={6} className='col-scratchpadtop-right'>
						<Tooltip title='More Actions'>
							<Dropdown overlay={menu} placement='bottomRight'>
								<Button
									type='primary'
									disabled={
										isLoadingAddScratch ||
										isLoadingDeleteScratch
									}
									icon={
										<EllipsisOutlined
											style={{ fontSize: '1.5rem' }}
										/>
									}
								/>
							</Dropdown>
						</Tooltip>
					</Col>
				</Row>
				<Row className='row-scratchpad-bottom'>
					<Col className='col-scratchpad-content' span={24}>
						<Form.Item className='form-item'>
							<TextArea
								rows={10}
								id='scratch_content'
								name='scratch_content'
								type='text'
								placeholder='Start writing...'
								className={
									errors.scratch_content &&
									touched.scratch_content &&
									'error_field'
								}
								onBlur={handleBlur}
								value={values.scratch_content}
								onChange={handleChange}
							/>
							{errors.scratch_content &&
								touched.scratch_content && (
									<Text type='danger'>
										{errors.scratch_content}
									</Text>
								)}
						</Form.Item>
					</Col>
				</Row>
			</Form>
		</div>
	)
}
