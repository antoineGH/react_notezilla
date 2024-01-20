import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import requestLogin from '../../utils/requestLogin'
import { login } from '../../utils/authHook'
import { Spin, Form, Input, Button, Typography, Row, Col, Card } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { openNotificationWithIcon } from '../../utils/notification'
import logo from '../../assets/logo.png'
import './UserLoginForm.css'

export default function UserLoginForm() {
  const [isDisabled, setIsDisabled] = useState(false)
  const navigate = useNavigate()
  const { Text } = Typography
  const antIcon = <LoadingOutlined style={{ fontSize: 16 }} spin />

  const regexPassword = /^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,24}$/
  const validationSchema = Yup.object({
    email: Yup.string()
      .min(6, 'Too Short')
      .max(40, 'Too Long')
      .email('Invalid Email')
      .required('Required'),
    password: Yup.string()
      .min(6, 'Too Short')
      .max(12, 'Too Long')
      .matches(regexPassword, 'Password should mix characters and numbers')
      .required('Required'),
  })

  const { handleSubmit, handleChange, handleBlur, values, touched, errors } =
    useFormik({
      initialValues: {
        email: '',
        password: '',
      },
      validationSchema,
      onSubmit(values) {
        handleLogin(values)
      },
    })

  const handleLogin = values => {
    setIsDisabled(true)
    const email = values.email
    const password = values.password
    requestLogin(email, password)
      .then(response => {
        login(response)
        navigate('/')
      })
      .catch(error => {
        openNotificationWithIcon('error', 'Error', 'Wrong Username Password.')
        setIsDisabled(false)
      })
  }

  return (
    <Form onSubmit={handleSubmit} layout="vertical">
      <Card
        style={{
          position: 'absolute',
          top: '15%',
          left: '46%',
          padding: '0rem',
          paddingBottom: '3rem',
          backgroundColor: 'white',
          borderRadius: '5px',
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center',
          margin: 'auto',
          width: '360px',
          boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
        }}
      >
        <Row className="container-form">
          <Row>
            <Col
              className="col-login-input"
              style={{
                width: '100%',
                marginBottom: '1rem',
                paddingRight: '2rem',
              }}
            >
              <img src={logo} alt="Logo" width="60%" />
            </Col>
            <Col className="col-login-input" style={{ width: '252px' }}>
              <Form.Item label="Email" className="form-item-login">
                <Input
                  id="email"
                  name="email"
                  type="text"
                  placeholder="Email"
                  className={errors.email && touched.email && 'error_field'}
                  onBlur={handleBlur}
                  value={values.email}
                  onChange={handleChange}
                />
                <div className="errors">
                  {errors.email && touched.email && (
                    <Text
                      type="danger"
                      style={{
                        fontSize: '.8rem',
                        display: 'flex',
                        justifyContent: 'flex-end',
                      }}
                    >
                      {errors.email}
                    </Text>
                  )}
                </div>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col className="col-login-input" style={{ width: '252px' }}>
              <Form.Item label="Password" className="form-item-login">
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Password"
                  className={
                    errors.password && touched.password && 'error_field'
                  }
                  onBlur={handleBlur}
                  value={values.password}
                  onChange={handleChange}
                />
                <div className="errors">
                  {errors.password && touched.password && (
                    <Text
                      type="danger"
                      style={{
                        fontSize: '.8rem',
                        display: 'flex',
                        justifyContent: 'flex-end',
                      }}
                    >
                      {errors.password}
                    </Text>
                  )}
                </div>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col className="col-login-button">
              <Form.Item
                className="form-item-button"
                style={{ marginTop: '0rem' }}
              >
                <Button
                  id="btn-login"
                  onClick={() => handleSubmit()}
                  type="primary"
                  disabled={isDisabled}
                  style={{
                    borderRadius: '3px',
                  }}
                >
                  Login{' '}
                  {isDisabled && <Spin size="small" indicator={antIcon} />}
                </Button>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col className="col-login-button">
              {' '}
              <Text type="secondary">Don't have an account yet ?</Text>
              <Button
                type="link"
                disabled={isDisabled}
                onClick={() => navigate('/register')}
              >
                Register
              </Button>
            </Col>
          </Row>
        </Row>
      </Card>
    </Form>
  )
}
