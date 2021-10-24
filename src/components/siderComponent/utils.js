import { Avatar, Typography, Skeleton } from 'antd'
import { UserOutlined, CaretDownOutlined } from '@ant-design/icons'
import './SiderComponent.css'

export const renderUserInput = (logged, hasErrorUser, user) => {
	const { Text } = Typography
	if (logged) {
		if (hasErrorUser) return ''
		else if (user)
			return (
				<>
					<Text className='avatar-username' strong>
						{user['first_name']} {user['last_name']}
					</Text>
					<CaretDownOutlined style={{ fontSize: '.8rem', color: 'var(--green)' }} />
				</>
			)
		return (
			<Skeleton.Input
				style={{
					width: 120,
					height: 22,
					marginLeft: '1rem',
				}}
				active
				size={'default'}
			/>
		)
	} else {
		return (
			<Text className='avatar-username' strong>
				Not Connected
			</Text>
		)
	}
}
export const renderUserAvatar = (logged, user) => {
	if (logged) {
		if (user) return <Avatar shape='square' icon={<UserOutlined />} />
		return (
			<Skeleton.Input
				style={{
					width: 32,
					height: 32,
				}}
				active
			/>
		)
	} else {
		return <Avatar shape='square' icon={<UserOutlined />} />
	}
}