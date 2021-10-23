import React from 'react'
import { useSelector } from 'react-redux'
import { selectUserIsLoading, selectUser } from '../../features/user/userSlice'
import { Col, Layout, Row } from 'antd'
import { Typography, Skeleton } from 'antd'
import './NavbarComponent.css'

export default function NavbarComponent() {
	const { Header } = Layout
	const { Text, Title } = Typography

	const user = useSelector(selectUser)
	const isLoadingUser = useSelector(selectUserIsLoading)

	const renderGreetUser = () => {
		if (isLoadingUser) {
			return (
				<Skeleton.Input
					style={{
						width: 215,
						height: 28,
						marginTop: 12,
					}}
					active
					size={'default'}
				/>
			)
		} else if (user) {
			return `${greetingMessage()}, ${user['first_name']}!`
		}
		return greetingMessage()
	}

	const getDate = () => {
		var months = [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December',
		]
		const days = [
			'Sunday',
			'Monday',
			'Tuesday',
			'Wednesday',
			'Thursday',
			'Friday',
			'Saturday',
		]

		const date_now = new Date(Date.now())
		let day = date_now.getDay()
		day = days[day].toUpperCase()
		let month = date_now.getMonth()
		month = months[month].toUpperCase()
		const year = date_now.getFullYear()
		const day_date = ('0' + date_now.getDate()).slice(-2)
		return `${day}, ${month} ${day_date}, ${year}`
	}

	const greetingMessage = () => {
		const date_now = new Date(Date.now())
		const hours = date_now.getHours()
		const message =
			hours < 12
				? 'Good Morning'
				: hours < 18
				? 'Good Afternoon'
				: 'Good Evening'
		return message
	}

	return (
		<>
			<Header id='header'>
				<div id='color-overlay'></div>
				<Row className='row-navbar-top'>
					<Col span={12} className='col-navbar-left'>
						<Title level={4} id='text-greet'>
							{renderGreetUser()}
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
