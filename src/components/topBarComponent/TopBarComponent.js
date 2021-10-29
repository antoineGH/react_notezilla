import React, { useState } from 'react'
import { Drawer, Button } from 'antd'
import { MenuOutlined } from '@ant-design/icons'
import './NavBar.css'
import logo from './../../logo.svg'
import { useHistory } from 'react-router'
import { logout } from '../../utils/authHook'
import { Typography, Menu } from 'antd'
import { UserOutlined, LogoutOutlined, HomeOutlined, LoginOutlined } from '@ant-design/icons'
import './TopBarComponent.css'

export default function TopBarComponent(props) {
	const { logged } = props
	const [visible, setVisible] = useState(false)
	const { Text } = Typography
	const history = useHistory()

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
		<nav className='navbar'>
			<Button className='menu' type='primary' icon={<MenuOutlined />} onClick={() => setVisible(true)} />
			<Drawer
				title='Topics'
				placement='left'
				onClick={() => setVisible(false)}
				onClose={() => setVisible(false)}
				visible={visible}>
				{logged ? menuAuth() : menuUnAuth()}
			</Drawer>
			<a href='/'>
				<img src={logo} className='logo' alt='logo' />
			</a>
		</nav>
	)
}
