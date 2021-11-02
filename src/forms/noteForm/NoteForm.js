import React, { useState, useEffect, useMemo, useRef } from 'react'
import debounce from 'lodash/debounce'

import { useFormik } from 'formik'
import * as Yup from 'yup'
import { getDate } from '../../components/noteComponent/utils'
import {
  Row,
  Col,
  Form,
  Input,
  Typography,
  Switch,
  Tooltip,
  Button,
} from 'antd'
import { SyncOutlined, CloseOutlined } from '@ant-design/icons'
import './NoteForm.css'

export default function NoteForm(props) {
  const {
    note,
    isLoadingToggleNote,
    isLoadingUdpateNote,
    handleSaveNote,
    handleUpdateNote,
    handleDeleteNote,
    isLoadingDelete,
  } = props

  const { Text } = Typography
  const { TextArea } = Input
  const note_id = note?.note_id

  const validationSchema = Yup.object({
    note_title: Yup.string().min(2, 'Too Short').max(200, 'Too Long'),
    note_content: Yup.string().min(2, 'Too Short').max(800, 'Too Long'),
  })

  const [isCompleted, setIsCompleted] = useState(note?.completed)
  const [sync, setSync] = useState(false)
  const title = useRef()
  const content = useRef()
  const completed = useRef()

  useEffect(() => {
    if (isLoadingUdpateNote) {
      setSync(true)
      setTimeout(() => {
        setSync(false)
      }, 1000)
    }
  }, [isLoadingUdpateNote])

  const { handleSubmit, handleChange, handleBlur, values, touched, errors } =
    useFormik({
      enableReinitialize: true,
      initialValues: {
        note_title: note?.note_title,
        note_content: note?.note_content,
      },
      validationSchema,
      onSubmit(values) {
        const { note_title, note_content } = values
        handleSaveNote(note_title, note_content, isCompleted)
      },
    })

  const debounceHandleUpdateNote = useMemo(
    () =>
      debounce(
        () =>
          handleUpdateNote(
            note_id,
            title.current.props.value,
            content.current.resizableTextArea.props.value,
            completed.current.ariaChecked,
          ),
        1200,
      ),
    [], // eslint-disable-line
  )
  return (
    <>
      <>
        <Form onSubmit={handleSubmit} onChange={debounceHandleUpdateNote}>
          <Row className="row-notesub-title">
            <Col className="col-notesub-title" span={19}>
              <Input
                bordered={false}
                ref={title}
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
            </Col>
            <Col
              span={1}
              style={{
                height: '2rem',
                alignItems: 'center',
                display: 'flex',
              }}
            >
              <Tooltip title="Auto Save">
                <SyncOutlined
                  spin={sync}
                  style={{ fontSize: '1rem', color: 'rgb(115, 115, 115)' }}
                />
              </Tooltip>
            </Col>
            <Col offset={1} className="col-notesub-delete">
              <Tooltip title="Delete Note">
                <Button
                  id="btn-cross"
                  className="btn-closetodo"
                  style={{ border: 'none' }}
                  onClick={() => handleDeleteNote(note.note_id)}
                  loading={isLoadingDelete}
                  icon={<CloseOutlined />}
                ></Button>
              </Tooltip>
            </Col>
          </Row>
          <Col span={24} className="col-note-content">
            <TextArea
              bordered={false}
              style={{ resize: 'none' }}
              ref={content}
              rows={15}
              id="note_content"
              name="note_content"
              type="text"
              placeholder="Note Content"
              className={
                errors.note_content && touched.note_content && 'error_field'
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
          </Col>

          <Row>
            <Col span={17} className="col-note-date">
              <Text className="note-date">{getDate(note.date_created)}</Text>
            </Col>
            <Col offset={3} className="col-note-switch">
              <Switch
                ref={completed}
                id="completed"
                name="completed"
                onChange={() => setIsCompleted(!isCompleted)}
                defaultChecked={note.completed}
                disabled={isLoadingToggleNote}
              />
            </Col>
          </Row>
        </Form>
      </>
    </>
  )
}
