import React, { useState } from 'react'
import { Drawer, Button } from 'antd'
import { MenuOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router'
import { useSelector } from 'react-redux'
import { selectUserHasError, selectUserLogged } from '../../features/user/userSlice'
import { logout } from '../../utils/authHook'
import { renderUserAvatar, renderUserInput } from '../siderComponent/utils'
import { Typography, Menu, Row, Col } from 'antd'
import Search from '../../features/search/Search'
import { UserOutlined, LogoutOutlined, HomeOutlined, LoginOutlined } from '@ant-design/icons'
import './TopBarComponent.css'

export default function TopBarComponent(props) {
	const { logged } = props
	const [visible, setVisible] = useState(false)
	const user = useSelector((state) => selectUserLogged(state, logged))
	const hasErrorUser = useSelector(selectUserHasError)
	const history = useHistory()
	const { Text } = Typography

	const pushCloseSlider = (path) => {
		setVisible(false)
		history.push(path)
	}

	const logoutCloseSlider = () => {
		setVisible(false)
		logout()
	}

	const menuAuth = () => {
		return (
			<Menu className='menu-navbar'>
				<Menu.Item
					onClick={() => pushCloseSlider('/')}
					className='submenu-navbar'
					key='1'
					icon={<HomeOutlined style={{ fontSize: '1.2rem' }} />}>
					<Text strong>Home</Text>
				</Menu.Item>
				<Menu.Divider />
				<Menu.Item
					onClick={() => pushCloseSlider('/user')}
					className='submenu-navbar'
					key='2'
					icon={<UserOutlined style={{ fontSize: '1.2rem' }} />}>
					<Text strong>Edit User</Text>
				</Menu.Item>
				<Menu.Divider />
				<Menu.Item
					onClick={logoutCloseSlider}
					className='submenu-navbar'
					key='3'
					icon={<LogoutOutlined style={{ fontSize: '1.2rem' }} />}>
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
					icon={<LoginOutlined style={{ fontSize: '1.2rem' }} />}>
					<Text strong>Login</Text>
				</Menu.Item>
				<Menu.Divider />
				<Menu.Item
					onClick={() => history.push('/register')}
					className='submenu-navbar'
					key='2'
					icon={<UserOutlined style={{ fontSize: '1.2rem' }} />}>
					<Text strong>Register</Text>
				</Menu.Item>
			</Menu>
		)
	}

	return (
		<nav className='navbar'>
			<Button className='menu' type='primary' icon={<MenuOutlined />} onClick={() => setVisible(true)} />
			<Drawer className='container-drawer' placement='left' onClose={() => setVisible(false)} visible={visible}>
				<Row className='row-user-sider'>
					<Col className='col-user-avatar'>{renderUserAvatar(logged, user)}</Col>
					<Col className='col-user-user'>{renderUserInput(logged, hasErrorUser, user, true)}</Col>
				</Row>
				<Search logged={logged} />
				{logged ? menuAuth() : menuUnAuth()}
			</Drawer>
		</nav>
	)
}
