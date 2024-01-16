import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import toTitle from '../../utils/toTitle'
import {
  Spin,
  Card,
  Typography,
  Button,
  Avatar,
  Input,
  Form,
  Modal,
  Col,
  Row,
} from 'antd'
import { LoadingOutlined, UserOutlined } from '@ant-design/icons'
import './UserAccountForm.css'

export default function UserAccountForm(props) {
  const { user, handleUpdateAccount, handleDeleteAccount, isDisabled } = props

  const [isModalVisible, setIsModalVisible] = useState(false)

  const { Title, Text } = Typography
  const antIcon = <LoadingOutlined style={{ fontSize: 16 }} spin />

  const regexPassword = /^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,24}$/
  const regexNoSpecial = /^[a-zA-Z. ]*$/
  const validationSchema = Yup.object({
    first_name: Yup.string()
      .min(2, 'Too Short')
      .max(12, 'Too Long')
      .matches(regexNoSpecial, 'No Special Character'),
    last_name: Yup.string()
      .min(2, 'Too Short')
      .max(12, 'Too Long')
      .matches(regexNoSpecial, 'No Special Character'),
    password: Yup.string()
      .min(6, 'Too Short')
      .max(12, 'Too Long')
      .matches(regexPassword, 'Password should mix characters and numbers'),
    confirm_password: Yup.string()
      .min(6, 'Too Short')
      .max(12, 'Too Long')
      .oneOf([Yup.ref('password'), null], 'Password must match'),
  })

  const { handleSubmit, handleChange, handleBlur, values, touched, errors } =
    useFormik({
      initialValues: {
        first_name: toTitle(user['first_name']),
        last_name: toTitle(user['last_name']),
        password: '',
        confirm_password: '',
      },
      validationSchema,
      onSubmit(values) {
        const { first_name, last_name, password } = values
        handleUpdateAccount(first_name, last_name, password)
      },
    })

  const handleOk = () => {
    setIsModalVisible(false)
    handleDeleteAccount()
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  return (
    <>
      <Card
        className="profile-picture-card"
        style={{ maxWidth: 550 }}
        cover={<Avatar shape="square" size={86} icon={<UserOutlined />} />}
      >
        <Row className="row-container-userinfo">
          <Col>
            <Title
              level={5}
              style={{ padding: 0, margin: 0 }}
              className="username-title"
            >
              {user['first_name']} {user['last_name']}
            </Title>
          </Col>
        </Row>
        <Row className="row-container-userinfo">
          <Col>
            <Text strong>{user['email']}</Text>
          </Col>
        </Row>
        <hr style={{ marginTop: '1rem' }} />
        <Row>
          <Col>
            <Title level={5} className="detail-title">
              Update Details
            </Title>
          </Col>
        </Row>
        <Form onSubmit={handleSubmit} layout="vertical">
          <Row>
            <Col className="col-user-input">
              <Form.Item label="First Name">
                <Input
                  id="first_name"
                  name="first_name"
                  type="text"
                  placeholder="First Name"
                  className={
                    errors.first_name && touched.first_name && 'error_field'
                  }
                  onBlur={handleBlur}
                  value={values.first_name}
                  onChange={handleChange}
                />
                <div className="errors">
                  {errors.first_name && touched.first_name && (
                    <Text type="danger">{errors.first_name}</Text>
                  )}
                </div>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col className="col-user-input">
              <Form.Item label="Last Name">
                <Input
                  id="last_name"
                  name="last_name"
                  type="text"
                  placeholder="Last Name"
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
          </Row>
          <Row>
            <Col className="col-user-input">
              <Form.Item label="Password">
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
            <Col className="col-user-input">
              <Form.Item label="Confirm Password">
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
          </Row>
          <Row className="row-user-button">
            <Col className="col-user-button">
              <Button
                id="udpate-user"
                type="primary"
                onClick={() => handleSubmit()}
                disabled={isDisabled}
                style={{
                  borderRadius: '3px',
                }}
              >
                Update {isDisabled && <Spin size="small" indicator={antIcon} />}
              </Button>
            </Col>
          </Row>
          <Row>
            <Col className="col-user-button" style={{ marginTop: '.7rem' }}>
              <Button type="link" onClick={() => setIsModalVisible(true)}>
                <Text type="secondary">Delete my account</Text>
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>

      <Modal
        id="modal-delete-account"
        title="Delete Account"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Delete"
      >
        Are you sure to delete account ?
      </Modal>
    </>
  )
}
