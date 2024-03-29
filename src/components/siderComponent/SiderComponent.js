import React from 'react'
import { logout } from '../../utils/authHook'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import {
  selectUserHasError,
  selectUserLogged,
} from '../../features/user/userSlice'
import { useLocation } from 'react-router'
import get from 'lodash-es/get'
import { renderUserInput, renderUserAvatar } from './utils'
import Search from '../../features/search/Search'
import { Menu, Col, Layout, Row } from 'antd'
import {
  UserOutlined,
  LogoutOutlined,
  HomeOutlined,
  LoginOutlined,
  BulbOutlined,
} from '@ant-design/icons'
import './SiderComponent.css'

export default function SiderComponent(props) {
  const { logged, runTour, setRunTour } = props
  const user = useSelector(state => selectUserLogged(state, logged))
  const hasErrorUser = useSelector(selectUserHasError)
  const navigate = useNavigate()
  const { Sider } = Layout
  const location = useLocation()

  const menuAuth = () => {
    return (
      <Menu
        className="menu-slider"
        theme="dark"
        defaultSelectedKeys={['1']}
        mode="inline"
      >
        <Menu.Item
          key="1"
          onClick={() => navigate('/')}
          icon={<HomeOutlined />}
        >
          Dashboard
        </Menu.Item>
        <Menu.Item
          key="2"
          onClick={() => navigate('/user')}
          icon={<UserOutlined />}
        >
          Edit Account
        </Menu.Item>
        {get(location, 'pathname') === '/note' && (
          <Menu.Item
            key="4"
            onClick={() => setRunTour(!runTour)}
            icon={<BulbOutlined />}
          >
            Start Tour
          </Menu.Item>
        )}
        <Menu.Divider
          style={{
            borderColor: '#404040',
            width: '95%',
            marginLeft: '.3rem',
          }}
        />
        <Menu.Item key="3" onClick={logout} icon={<LogoutOutlined />}>
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
    <Sider
      className="sider-main"
      breakpoint={'lg'}
      collapsedWidth={0}
      trigger={null}
    >
      <Row
        className="row-user-sider"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '1rem',
          marginTop: '1.3rem',
        }}
      >
        <Col className="col-user-avatar">{renderUserAvatar(logged, user)}</Col>
        <Col className="col-user-user">
          {renderUserInput(logged, hasErrorUser, user, false)}
        </Col>
      </Row>

      <Search logged={logged} />
      {logged ? menuAuth() : menuUnAuth()}
    </Sider>
  )
}
