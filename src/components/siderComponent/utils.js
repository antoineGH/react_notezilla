import React from 'react'
import { Avatar, Typography, Skeleton } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import './SiderComponent.css'

export const renderUserInput = (logged, hasErrorUser, user, mobile) => {
  const { Text } = Typography
  if (logged) {
    if (hasErrorUser) return ''
    else if (user)
      return (
        <>
          <Text className="avatar-username" strong>
            {user['first_name']} {user['last_name']}
          </Text>
        </>
      )
    return null
  } else {
    return (
      <Text className="avatar-username" strong>
        Not Connected
      </Text>
    )
  }
}
export const renderUserAvatar = (logged, user) => {
  if (logged) {
    if (user)
      return (
        <Avatar
          shape="square"
          size="large"
          icon={<UserOutlined />}
          style={{ background: '#404040', borderRadius: '3px' }}
        />
      )
    return (
      <>
        <Skeleton.Input
          style={{
            width: 140,
            height: 32,
            marginLeft: '1.4rem',
          }}
          active
        />
        <Skeleton.Input
          style={{
            marginTop: '2.6rem',
            width: 240,
            height: 32,
            marginBottom: '1.4rem',
          }}
          active
        />
      </>
    )
  } else {
    return <Avatar shape="square" icon={<UserOutlined />} />
  }
}
