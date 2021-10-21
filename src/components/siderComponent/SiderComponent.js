import React from 'react'
import { logout } from '../../utils/authHook'
import { useHistory } from 'react-router'
import { useSelector } from 'react-redux'
import {
	selectUserHasError,
	selectUserIsLoading,
	selectUserLogged,
} from '../../features/user/userSlice'
import Search from '../../features/search/Search'
import { Avatar, Typography, Menu, Dropdown, Skeleton, Col, Layout } from 'antd'
import {
	UserOutlined,
	LogoutOutlined,
	HomeOutlined,
	LoginOutlined,
	CaretDownOutlined,
} from '@ant-design/icons'
import './SiderComponent.css'

export default function SiderComponent(props) {
	const { logged } = props
	const history = useHistory()
	const { Sider } = Layout
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
					icon={<HomeOutlined style={{ fontSize: '1rem' }} />}>
					<Text strong>Home</Text>
				</Menu.Item>
				<Menu.Item
					onClick={() => history.push('/user')}
					className='submenu-navbar'
					key='2'
					icon={<UserOutlined style={{ fontSize: '1rem' }} />}>
					<Text strong>Edit User</Text>
				</Menu.Item>
				<Menu.Divider />
				<Menu.Item
					onClick={logout}
					className='submenu-navbar'
					key='3'
					icon={<LogoutOutlined style={{ fontSize: '1rem' }} />}>
					<Text strong>Logout</Text>
				</Menu.Item>
			</Menu>
		)
	}

	const menuUnAuth = () => {
		return (
			<Menu className='menu-navbar'>
				<Menu.Item
					onClick={() => history.push('/login')}
					className='submenu-navbar'
					key='1'
					icon={<LoginOutlined style={{ fontSize: '1rem' }} />}>
					<Text strong>Login</Text>
				</Menu.Item>
				<Menu.Divider />
				<Menu.Item
					onClick={() => history.push('/register')}
					className='submenu-navbar'
					key='2'
					icon={<UserOutlined style={{ fontSize: '1rem' }} />}>
					<Text strong>Register</Text>
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
		<Sider className='sider-main'>
			<Dropdown overlay={logged ? menuAuth() : menuUnAuth()}>
				<span className='container-avatar'>
					{logged ? (
						renderUserAvatar()
					) : (
						<Avatar shape='square' icon={<UserOutlined />} />
					)}
					<Text className='avatar-username' strong>
						{logged ? renderUserInput() : 'Not Connected'}{' '}
						<CaretDownOutlined style={{ fontSize: '.6rem' }} />
					</Text>
				</span>
			</Dropdown>
			<Search logged={logged} />
		</Sider>
	)
}
