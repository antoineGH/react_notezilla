import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import createUser from '../../utils/createUser'
import { openNotificationWithIcon } from '../../utils/notification'
import { Spin, Form, Input, Button, Typography, Row, Col, Card } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import './UserRegisterForm.css'

export default function UserRegisterForm() {
  const [isDisabled, setIsDisabled] = useState(false)
  const navigate = useNavigate()
  const { Text } = Typography
  const antIcon = <LoadingOutlined style={{ fontSize: 16 }} spin />

  const regexPassword = /^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,24}$/
  const regexNoSpecial = /^[a-zA-Z. ]*$/
  const validationSchema = Yup.object({
    first_name: Yup.string()
      .min(2, 'Too Short')
      .max(12, 'Too Long')
      .matches(regexNoSpecial, 'No Special Character')
      .required('Required'),
    last_name: Yup.string()
      .min(2, 'Too Short')
      .max(12, 'Too Long')
      .matches(regexNoSpecial, 'No Special Character')
      .required('Required'),
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
    confirm_password: Yup.string()
      .min(6, 'Too Short')
      .max(12, 'Too Long')
      .oneOf([Yup.ref('password'), null], 'Password must match')
      .required('Required'),
  })

  const { handleSubmit, handleChange, handleBlur, values, touched, errors } =
    useFormik({
      initialValues: {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        confirm_password: '',
      },
      validationSchema,
      onSubmit(values) {
        handleRegister(values)
      },
    })

  const handleRegister = values => {
    setIsDisabled(true)
    const email = values.email.toLowerCase()
    const password = values.password
    const first_name = values.first_name.toLowerCase()
    const last_name = values.last_name.toLowerCase()
    createUser(email, password, first_name, last_name)
      .then(response => {
        openNotificationWithIcon(
          'success',
          'Registered successfully',
          `${response.user.first_name} ${response.user.last_name}, Your account has been created. Please use ${response.user.email} to log in.`,
        )
        setTimeout(() => {
          navigate('/login')
        }, 3500)
        setIsDisabled(false)
      })
      .catch(error => {
        console.log(error)
        openNotificationWithIcon('error', 'Error', error.message)
        setIsDisabled(false)
      })
  }

  return (
    <>
      <Form onSubmit={handleSubmit} layout="vertical">
        <Card
          style={{
            position: 'absolute',
            top: '15%',
            left: '46%',
            padding: '0rem',
            paddingBottom: '2rem',
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
            <Col className="col-register-input" style={{ width: '100%' }}>
              <Form.Item label="Email" className="form-item-register">
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

            <Col className="col-register-input" style={{ width: '100%' }}>
              <Form.Item label="Password" className="form-item-register">
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

            <Col className="col-register-input" style={{ width: '100%' }}>
              <Form.Item label="Password" className="form-item-register">
                <Input
                  id="confirm_password"
                  name="confirm_password"
                  type="password"
                  placeholder="Confirm Password"
                  className={
                    errors.confirm_password &&
                    touched.confirm_password &&
                    'error_field'
                  }
                  onBlur={handleBlur}
                  value={values.confirm_password}
                  onChange={handleChange}
                />
                <div className="errors">
                  {errors.confirm_password && touched.confirm_password && (
                    <Text
                      type="danger"
                      style={{
                        fontSize: '.8rem',
                        display: 'flex',
                        justifyContent: 'flex-end',
                      }}
                    >
                      {errors.confirm_password}
                    </Text>
                  )}
                </div>
              </Form.Item>
            </Col>

            <Col className="col-register-input" style={{ width: '100%' }}>
              <Form.Item label="Firstname" className="form-item-register">
                <Input
                  id="first_name"
                  name="first_name"
                  type="text"
                  placeholder="Firstname"
                  className={
                    errors.first_name && touched.first_name && 'error_field'
                  }
                  onBlur={handleBlur}
                  value={values.first_name}
                  onChange={handleChange}
                />
                <div className="errors">
                  {errors.first_name && touched.first_name && (
                    <Text
                      type="danger"
                      style={{
                        fontSize: '.8rem',
                        display: 'flex',
                        justifyContent: 'flex-end',
                      }}
                    >
                      {errors.first_name}
                    </Text>
                  )}
                </div>
              </Form.Item>
            </Col>

            <Col className="col-register-input" style={{ width: '100%' }}>
              <Form.Item label="Lastname" className="form-item-register">
                <Input
                  id="last_name"
                  name="last_name"
                  type="text"
                  placeholder="Lastname"
                  className={
                    errors.last_name && touched.last_name && 'error_field'
                  }
                  onBlur={handleBlur}
                  value={values.last_name}
                  onChange={handleChange}
                />
                <div className="errors">
                  {errors.last_name && touched.last_name && (
                    <Text
                      type="danger"
                      style={{
                        fontSize: '.8rem',
                        display: 'flex',
                        justifyContent: 'flex-end',
                      }}
                    >
                      {errors.last_name}
                    </Text>
                  )}
                </div>
              </Form.Item>
            </Col>

            <Col className="col-register-button">
              <Form.Item
                className="form-item-button"
                style={{ marginTop: '0rem' }}
              >
                <Button
                  id="btn-register"
                  onClick={() => handleSubmit()}
                  type="primary"
                  disabled={isDisabled}
                  style={{
                    borderRadius: '3px',
                  }}
                >
                  Register{' '}
                  {isDisabled && <Spin size="small" indicator={antIcon} />}
                </Button>
              </Form.Item>
            </Col>

            <Col className="col-register-button">
              <Text type="secondary">Already have an account ?</Text>
              <Button
                type="link"
                disabled={isDisabled}
                onClick={() => navigate('/login')}
              >
                Login
              </Button>
            </Col>
          </Row>
        </Card>
      </Form>
    </>
  )
}
