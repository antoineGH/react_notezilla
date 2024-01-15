import React, { useState } from 'react'
import { Drawer, Button } from 'antd'
import { MenuOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import {
  selectUserHasError,
  selectUserLogged,
} from '../../features/user/userSlice'
import { logout } from '../../utils/authHook'
import { useLocation } from 'react-router'
import get from 'lodash/get'
import { renderUserAvatar, renderUserInput } from '../siderComponent/utils'
import { Menu, Row, Col } from 'antd'
import Search from '../../features/search/Search'
import {
  UserOutlined,
  LogoutOutlined,
  HomeOutlined,
  LoginOutlined,
  BulbOutlined,
} from '@ant-design/icons'
import './TopBarComponent.css'

export default function TopBarComponent(props) {
  const { logged, runTour, setRunTour } = props
  const [visible, setVisible] = useState(false)
  const user = useSelector(state => selectUserLogged(state, logged))
  const hasErrorUser = useSelector(selectUserHasError)
  const navigate = useNavigate()
  const location = useLocation()

  const pushCloseSlider = path => {
    setVisible(false)
    navigate(path)
  }

  const logoutCloseSlider = () => {
    setVisible(false)
    logout()
  }

  const setRunTourSlider = () => {
    setVisible(false)
    setRunTour(!runTour)
  }

  const menuAuth = () => {
    return (
      <Menu
        className="menu-slider"
        theme="dark"
        defaultSelectedKeys={['1']}
        mode="inline"
        style={{ marginTop: '2.5rem' }}
      >
        <Menu.Item
          key="1"
          onClick={() => pushCloseSlider('/')}
          icon={<HomeOutlined />}
        >
          Dashboard
        </Menu.Item>
        <Menu.Item
          key="2"
          onClick={() => pushCloseSlider('/user')}
          icon={<UserOutlined />}
        >
          Edit Account
        </Menu.Item>
        {get(location, 'pathname') === '/note' && (
          <Menu.Item key="4" onClick={setRunTourSlider} icon={<BulbOutlined />}>
            Start Tour
          </Menu.Item>
        )}
        <Menu.Item
          key="3"
          onClick={logoutCloseSlider}
          icon={<LogoutOutlined />}
        >
          Logout
        </Menu.Item>
      </Menu>
    )
  }

  const menuUnAuth = () => {
    return (
      <Menu
        className="menu-slider"
        theme="dark"
        defaultSelectedKeys={['1']}
        mode="inline"
        style={{ marginTop: '2rem' }}
      >
        <Menu.Item
          key="1"
          onClick={() => navigate('/login')}
          icon={<LoginOutlined />}
        >
          Login
        </Menu.Item>
        <Menu.Item
          key="2"
          onClick={() => navigate('/register')}
          icon={<UserOutlined />}
        >
          Register
        </Menu.Item>
      </Menu>
    )
  }

  return (
    <nav className="navbar">
      <Button
        className="menu"
        type="primary"
        icon={<MenuOutlined />}
        onClick={() => setVisible(true)}
      />
      <Drawer
        className="container-drawer"
        placement="left"
        onClose={() => setVisible(false)}
        open={visible}
      >
        <Row className="row-user-sider">
          <Col className="col-user-avatar">
            {renderUserAvatar(logged, user)}
          </Col>
          <Col className="col-user-user">
            {renderUserInput(logged, hasErrorUser, user, true)}
          </Col>
        </Row>
        <Search logged={logged} />
        {logged ? menuAuth() : menuUnAuth()}
      </Drawer>
    </nav>
  )
}
