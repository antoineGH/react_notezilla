import React from 'react'
import { useSelector } from 'react-redux'
import {
	selectUserHasError,
	selectUserIsLoading,
	selectUserLogged,
} from '../../features/user/userSlice'
import { logout } from '../../utils/authHook'
import { useHistory } from 'react-router'
import { Layout } from 'antd'
import { Avatar, Typography, Menu, Dropdown, Skeleton, Col } from 'antd'
import {
	UserOutlined,
	LogoutOutlined,
	HomeOutlined,
	LoginOutlined,
} from '@ant-design/icons'
import './NavbarComponent.css'

export default function NavbarComponent(props) {
	const history = useHistory()
	const { logged } = props
	const { Header } = Layout
	const { Text } = Typography

	const user = useSelector((state) => selectUserLogged(state, logged))
	const isLoadingUser = useSelector(selectUserIsLoading)
	const hasErrorUser = useSelector(selectUserHasError)

	const menuAuth = () => {
		return (
			<Menu className='menu-navbar'>
				<Menu.Item
					onClick={() => history.push('/')}
					className='submenu-navbar'
					key='1'
					icon={<HomeOutlined />}>
					Home
				</Menu.Item>
				<Menu.Item
					onClick={() => history.push('/user')}
					className='submenu-navbar'
					key='2'
					icon={<UserOutlined />}>
					Edit User
				</Menu.Item>
				<Menu.Divider />
				<Menu.Item
					onClick={logout}
					className='submenu-navbar'
					key='3'
					icon={<LogoutOutlined />}>
					Logout
				</Menu.Item>
			</Menu>
		)
	}

	const menuUnauth = () => {
		return (
			<Menu className='menu-navbar'>
				<Menu.Item
					onClick={() => history.push('/login')}
					className='submenu-navbar'
					key='1'
					icon={<LoginOutlined />}>
					Login
				</Menu.Item>
				<Menu.Divider />
				<Menu.Item
					onClick={() => history.push('/register')}
					className='submenu-navbar'
					key='2'
					icon={<UserOutlined />}>
					Register
				</Menu.Item>
			</Menu>
		)
	}

	const renderUserInput = () => {
		if (hasErrorUser) {
			return (
				<Col>
					<p>Error Fetching the API.</p>
				</Col>
			)
		}
		if (isLoadingUser) {
			return (
				<Skeleton.Input
					style={{
						width: 120,
						height: 20,
						marginTop: 22,
					}}
					active
					size={'default'}
				/>
			)
		}
		if (user) {
			return `${user['first_name']} ${user['last_name']}`
		}
	}

	const renderUserAvatar = () => {
		if (hasErrorUser) {
		}
		if (isLoadingUser) {
			return (
				<Skeleton.Input
					style={{
						width: 32,
						height: 32,
						marginTop: 16,
						marginRight: 24,
					}}
					active
					size={'default'}
				/>
			)
		}
		return <Avatar shape='square' icon={<UserOutlined />} />
	}

	return (
		<>
			<Header>
				<>
					<Dropdown overlay={logged ? menuAuth() : menuUnauth()}>
						<span className='container-avatar'>
							<Text className='avatar-username' strong>
								{logged ? renderUserInput() : 'Not Connected'}
							</Text>
							{logged ? (
								renderUserAvatar()
							) : (
								<Avatar
									shape='square'
									icon={<UserOutlined />}
								/>
							)}
						</span>
					</Dropdown>
				</>
			</Header>
		</>
	)
}
