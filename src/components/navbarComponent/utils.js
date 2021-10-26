import { Skeleton } from 'antd'
import toTitle from '../../utils/toTitle'

export const renderGreetUser = (isLoadingUser, user) => {
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
		return `${greetingMessage()}, ${toTitle(user['first_name'])}!`
	}
	return greetingMessage()
}

export const getDate = () => {
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
	const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

	const date_now = new Date(Date.now())
	let day = date_now.getDay()
	day = days[day].toUpperCase()
	let month = date_now.getMonth()
	month = months[month].toUpperCase()
	const year = date_now.getFullYear()
	const day_date = ('0' + date_now.getDate()).slice(-2)
	return `${day}, ${month} ${day_date}, ${year}`
}

export const greetingMessage = () => {
	const date_now = new Date(Date.now())
	const hours = date_now.getHours()
	const message = hours < 12 ? 'Good Morning' : hours < 18 ? 'Good Afternoon' : 'Good Evening'
	return message
}
