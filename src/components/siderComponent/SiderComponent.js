import React from 'react'
import { logout } from '../../utils/authHook'
import { useHistory } from 'react-router'
import { useSelector } from 'react-redux'
import { selectUserHasError, selectUserLogged } from '../../features/user/userSlice'
import { renderUserInput, renderUserAvatar } from './utils'
import Search from '../../features/search/Search'
import { Typography, Menu, Dropdown, Col, Layout, Row } from 'antd'
import { UserOutlined, LogoutOutlined, HomeOutlined, LoginOutlined } from '@ant-design/icons'
import './SiderComponent.css'

export default function SiderComponent(props) {
	const { logged } = props
	const user = useSelector((state) => selectUserLogged(state, logged))
	const hasErrorUser = useSelector(selectUserHasError)
	const history = useHistory()
	const { Sider } = Layout
	const { Text } = Typography

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

	return (
		<Sider className='sider-main'>
			<Dropdown overlay={logged ? menuAuth() : menuUnAuth()}>
				<Row className='row-user-sider'>
					<Col className='col-user-avatar'>{renderUserAvatar(logged, user)}</Col>
					<Col className='col-user-user'>{renderUserInput(logged, hasErrorUser, user)}</Col>
				</Row>
			</Dropdown>
			<Search logged={logged} />
		</Sider>
	)
}
