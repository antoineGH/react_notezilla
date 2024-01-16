import React from 'react'
import { useSelector } from 'react-redux'
import { selectUserIsLoading, selectUser } from '../../features/user/userSlice'
import { getDate, renderGreetUser } from './utils'
import { Col, Layout, Row, Typography } from 'antd'
import './NavbarComponent.css'
import { useLocation } from 'react-router-dom'

export default function NavbarComponent() {
  const isUserPage = useLocation().pathname === '/user'
  const user = useSelector(selectUser)
  const isLoadingUser = useSelector(selectUserIsLoading)
  const { Header } = Layout
  const { Text } = Typography

  return (
    <>
      <Header id="header">
        {!isUserPage && (
          <Row className="row-navbar-top">
            <Col
              xs={24}
              md={12}
              className="col-navbar-left"
              style={{ paddingTop: '1.5rem' }}
            >
              <Text strong id="text-greet">
                {renderGreetUser(isLoadingUser, user)}
              </Text>
            </Col>
            <Col
              xs={24}
              md={12}
              className="col-navbar-right"
              style={{ paddingTop: '1.5rem' }}
            >
              <Text strong id="text-date">
                {getDate()}
              </Text>
            </Col>
          </Row>
        )}
      </Header>
    </>
  )
}
