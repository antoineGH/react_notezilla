import React from 'react'
import { logout } from '../../utils/authHook'
import { useHistory } from 'react-router'
import { useSelector } from 'react-redux'
import {
  selectUserHasError,
  selectUserLogged,
} from '../../features/user/userSlice'
import { renderUserInput, renderUserAvatar } from './utils'
import Search from '../../features/search/Search'
import { Typography, Menu, Dropdown, Col, Layout, Row, Button } from 'antd'
import {
  UserOutlined,
  LogoutOutlined,
  HomeOutlined,
  LoginOutlined,
} from '@ant-design/icons'
import './SiderComponent.css'

export default function SiderComponent(props) {
  const { logged, runTour, setRunTour } = props
  const user = useSelector(state => selectUserLogged(state, logged))
  const hasErrorUser = useSelector(selectUserHasError)
  const history = useHistory()
  const { Sider } = Layout
  const { Text } = Typography

  const menuAuth = () => {
    return (
      <Menu className="menu-navbar">
        <Menu.Item
          onClick={() => history.push('/')}
          className="submenu-navbar"
          key="1"
        >
          <Row style={{ display: 'flex', justifyContent: 'center!important' }}>
            <Col span={6}>
              <HomeOutlined style={{ fontSize: '1.1rem' }} />
            </Col>
            <Col span={12}>
              <Text>Home</Text>
            </Col>
          </Row>
        </Menu.Item>
        <Menu.Item
          onClick={() => history.push('/user')}
          className="submenu-navbar"
          key="2"
        >
          <Row style={{ display: 'flex', justifyContent: 'center!important' }}>
            <Col span={6}>
              <UserOutlined style={{ fontSize: '1.1rem' }} />
            </Col>
            <Col span={12}>
              <Text>Edit Account</Text>
            </Col>
          </Row>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item onClick={logout} className="submenu-navbar" key="3">
          <Row style={{ display: 'flex', justifyContent: 'center!important' }}>
            <Col span={6}>
              <LogoutOutlined style={{ fontSize: '1.1rem' }} />
            </Col>
            <Col span={12}>
              <Text>Logout</Text>
            </Col>
          </Row>
        </Menu.Item>
      </Menu>
    )
  }

  const menuUnAuth = () => {
    return (
      <Menu className="menu-navbar">
        <Menu.Item
          onClick={() => history.push('/login')}
          className="submenu-navbar"
          key="1"
        >
          <Row style={{ display: 'flex', justifyContent: 'center!important' }}>
            <Col span={6}>
              <LoginOutlined style={{ fontSize: '1.1rem' }} />
            </Col>
            <Col span={12}>
              <Text>Login</Text>
            </Col>
          </Row>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item
          onClick={() => history.push('/register')}
          className="submenu-navbar"
          key="2"
        >
          <Row style={{ display: 'flex', justifyContent: 'center!important' }}>
            <Col span={6}>
              <UserOutlined style={{ fontSize: '1.1rem' }} />
            </Col>
            <Col span={12}>
              <Text>Register</Text>
            </Col>
          </Row>
        </Menu.Item>
      </Menu>
    )
  }

  return (
    <Sider
      className="sider-main"
      breakpoint={'lg'}
      collapsedWidth={0}
      trigger={null}
    >
      <Dropdown overlay={logged ? menuAuth() : menuUnAuth()}>
        <Row className="row-user-sider">
          <Col className="col-user-avatar">
            {renderUserAvatar(logged, user)}
          </Col>
          <Col className="col-user-user">
            {renderUserInput(logged, hasErrorUser, user, false)}
          </Col>
        </Row>
      </Dropdown>
      <Search logged={logged} />
      {logged && (
        <Button onClick={() => setRunTour(!runTour)}>Start Tour</Button>
      )}
    </Sider>
  )
}
