import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Spin, Form, Input, Button, Typography, Switch, Row, Col } from 'antd'
import { LoadingOutlined, RightOutlined } from '@ant-design/icons'
import './NoteAddForm.css'

export default function NoteAddForm(props) {
  const { isLoadingAddNote, handleAddNote } = props
  const { Text, Title } = Typography
  const { TextArea } = Input
  const antIcon = <LoadingOutlined style={{ fontSize: 16 }} spin />

  const validationSchema = Yup.object({
    note_title: Yup.string().min(3, 'Too Short').max(200, 'Too Long'),
    note_content: Yup.string().min(3, 'Too Short').max(800, 'Too Long'),
    completed: Yup.boolean(),
  })

  const [isCompleted, setIsCompleted] = useState(false)

  const { handleSubmit, handleChange, handleBlur, values, touched, errors } =
    useFormik({
      initialValues: {
        note_title: '',
        note_content: '',
      },
      validationSchema,
      onSubmit(values) {
        const { note_title, note_content } = values
        handleAddNote(note_title, note_content, isCompleted)
        values.note_title = ''
        values.note_content = ''
        setIsCompleted(false)
      },
    })
  return (
    <>
      <div className="container-addnote">
        <Title
          level={5}
          style={{ padding: 0, paddingTop: '.5rem', margin: 0 }}
          className="title-section"
        >
          ADD NOTES
          <RightOutlined
            style={{
              fontSize: '1rem',
              color: 'var(--green)',
              paddingLeft: '.3rem',
            }}
          />
        </Title>
        <Form onSubmit={handleSubmit}>
          <Row
            className="row-addnote-top"
            style={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <Col className="col-addnote-topleft">
              <Form.Item className="form-item">
                <Input
                  style={{ minWidth: '350px' }}
                  id="note_title"
                  name="note_title"
                  type="text"
                  placeholder="Note Title"
                  className={
                    errors.note_title && touched.note_title && 'error_field'
                  }
                  onBlur={handleBlur}
                  value={values.note_title}
                  onChange={handleChange}
                />
                <div className="div-error-input">
                  {errors.note_title && touched.note_title && (
                    <Text type="danger">{errors.note_title}</Text>
                  )}
                </div>
              </Form.Item>
            </Col>
            <Col className="col-addnote-topright">
              {' '}
              <Form.Item className="form-item">
                <Switch
                  tabIndex="-1"
                  id="completed"
                  name="completed"
                  type="text"
                  onChange={() => setIsCompleted(!isCompleted)}
                  checked={isCompleted}
                  loading={isLoadingAddNote}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row></Row>

          <Form.Item className="form-item">
            <TextArea
              style={{ resize: 'none' }}
              rows={7}
              id="note_content"
              name="note_content"
              type="text"
              placeholder="Note Content"
              className={
                'note-content' &&
                errors.note_content &&
                touched.note_content &&
                'error_field'
              }
              onBlur={handleBlur}
              value={values.note_content}
              onChange={handleChange}
            />{' '}
            <div className="div-error-input">
              {errors.note_content && touched.note_content && (
                <Text type="danger">{errors.note_content}</Text>
              )}
            </div>
          </Form.Item>

          <Form.Item className="form-item button-add-form">
            <Button
              id="new-note"
              type="primary"
              onClick={() => handleSubmit()}
              disabled={isLoadingAddNote}
            >
              Add Note
              {isLoadingAddNote && <Spin size="small" indicator={antIcon} />}
            </Button>
          </Form.Item>
        </Form>
      </div>

      <div className="add-errors"></div>
    </>
  )
}
