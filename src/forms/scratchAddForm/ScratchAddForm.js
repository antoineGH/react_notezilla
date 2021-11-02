import React, { useMemo, useRef, useEffect, useState } from 'react'
import debounce from 'lodash/debounce'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import {
  Row,
  Col,
  Menu,
  Dropdown,
  Form,
  Input,
  Button,
  Typography,
  Tooltip,
} from 'antd'
import {
  SaveOutlined,
  ClearOutlined,
  EllipsisOutlined,
  SyncOutlined,
} from '@ant-design/icons'

export default function ScratchAddForm(props) {
  const {
    scratch_title,
    scratch_content,
    isLoadingAddScratch,
    isLoadingDeleteScratch,
    handleAddScratch,
    handleDeleteScratch,
  } = props
  const { Text } = Typography
  const { TextArea } = Input

  const title = useRef()
  const content = useRef()

  const [sync, setSync] = useState(false)

  useEffect(() => {
    if (isLoadingAddScratch) {
      setSync(true)
      setTimeout(() => {
        setSync(false)
      }, 1000)
    }
  }, [isLoadingAddScratch])

  useEffect(
    () => {
      return () => {
        debounceHandleAddScratch.cancel()
      }
    },
    [], // eslint-disable-line
  )

  const debounceHandleAddScratch = useMemo(
    () =>
      debounce(
        () =>
          handleAddScratch(
            title.current.props.value,
            content.current.resizableTextArea.props.value,
            false,
          ),
        1200,
      ),
    [], // eslint-disable-line
  )

  const validationSchema = Yup.object({
    scratch_title: Yup.string().max(200, 'Too Long'),
    scratch_content: Yup.string().max(800, 'Too Long'),
  })

  const { handleSubmit, handleChange, handleBlur, values, touched, errors } =
    useFormik({
      initialValues: {
        scratch_title: scratch_title,
        scratch_content: scratch_content,
      },
      validationSchema,
      onSubmit(values) {
        const { scratch_title, scratch_content } = values
        handleAddScratch(scratch_title, scratch_content, false)
      },
    })

  const onClickSaveScratch = e => {
    e.preventDefault()
    handleSubmit()
  }

  const onClickDeleteScratch = e => {
    e.preventDefault()
    handleDeleteScratch()
  }

  const menu = (
    <Menu className="menu-scratchpad">
      <Menu.Item key="1" className="submenu-scratchpad">
        <a
          onClick={e => onClickSaveScratch(e)}
          href="Save"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Row>
            <Col span={6}>
              <SaveOutlined style={{ fontSize: '1.2rem' }} />
            </Col>
            <Col span={12}>
              <Text>Save ScratchPad</Text>
            </Col>
          </Row>
        </a>
      </Menu.Item>

      <Menu.Item key="3" className="submenu-scratchpad">
        <a
          onClick={e => onClickDeleteScratch(e)}
          href="Reset"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Row>
            <Col span={6}>
              <ClearOutlined style={{ fontSize: '1.2rem' }} />
            </Col>
            <Col span={12}>
              <Text>Clear ScratchPad</Text>
            </Col>
          </Row>
        </a>
      </Menu.Item>
    </Menu>
  )

  return (
    <div className="container-scratchpad">
      <Form
        onSubmit={handleSubmit}
        layout="inline"
        onChange={debounceHandleAddScratch}
      >
        <Row className="row-scratchpad-top">
          <Col xs={20} sm={21} md={21} lg={20} xl={20} xxl={21}>
            <Form.Item className="form-item">
              <Input
                bordered={false}
                ref={title}
                id="scratch_title"
                name="scratch_title"
                type="text"
                placeholder="SCRATCH PAD"
                className={
                  errors.scratch_title && touched.scratch_title && 'error_field'
                }
                onBlur={handleBlur}
                value={values.scratch_title}
                onChange={handleChange}
              />
              {errors.scratch_title && touched.scratch_title && (
                <Text type="danger">{errors.scratch_title}</Text>
              )}
            </Form.Item>
          </Col>
          <Col span={1} className="col-scratchpadtop-right">
            <Tooltip title="More Actions">
              <Dropdown overlay={menu} placement="bottomRight">
                <Button
                  tabIndex="-1"
                  type="primary"
                  disabled={isLoadingAddScratch || isLoadingDeleteScratch}
                  icon={<EllipsisOutlined style={{ fontSize: '1.5rem' }} />}
                />
              </Dropdown>
            </Tooltip>
          </Col>
          <Col offset={1} style={{ display: 'flex', alignItems: 'center' }}>
            <Tooltip title="Auto Save">
              <SyncOutlined
                spin={sync}
                style={{ fontSize: '1rem', color: 'rgb(115, 115, 115)' }}
              />
            </Tooltip>
          </Col>
        </Row>
        <Row className="row-scratchpad-bottom">
          <Col className="col-scratchpad-content" span={24}>
            <Form.Item className="form-item">
              <TextArea
                bordered={false}
                style={{ resize: 'none' }}
                ref={content}
                rows={10}
                id="scratch_content"
                name="scratch_content"
                type="text"
                placeholder="Start writing..."
                className={
                  errors.scratch_content &&
                  touched.scratch_content &&
                  'error_field'
                }
                onBlur={handleBlur}
                value={values.scratch_content}
                onChange={handleChange}
              />
              {errors.scratch_content && touched.scratch_content && (
                <Text type="danger">{errors.scratch_content}</Text>
              )}
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  )
}
