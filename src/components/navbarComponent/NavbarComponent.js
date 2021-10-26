import React from 'react'
import { useSelector } from 'react-redux'
import { selectUserIsLoading, selectUser } from '../../features/user/userSlice'
import { getDate, renderGreetUser } from './utils'
import { Col, Layout, Row, Typography } from 'antd'
import './NavbarComponent.css'

export default function NavbarComponent() {
	const user = useSelector(selectUser)
	const isLoadingUser = useSelector(selectUserIsLoading)
	const { Header } = Layout
	const { Text, Title } = Typography

	return (
		<>
			<Header id='header'>
				<Row className='row-navbar-top'>
					<Col span={12} className='col-navbar-left'>
						<Title level={4} id='text-greet'>
							{renderGreetUser(isLoadingUser, user)}
						</Title>
					</Col>
					<Col span={12} className='col-navbar-right'>
						<Text strong id='text-date'>
							{getDate()}
						</Text>
					</Col>
				</Row>
			</Header>
		</>
	)
}
