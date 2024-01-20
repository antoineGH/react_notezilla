import React, { useState, useEffect, useMemo, useRef } from 'react'
import debounce from 'lodash/debounce'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { getDate } from '../../components/noteComponent/utils'
import { Row, Col, Form, Input, Typography, Switch, Tooltip } from 'antd'
import { SyncOutlined, RightOutlined } from '@ant-design/icons'
import './LastNoteForm.css'

export default function LastNoteForm(props) {
  const {
    lastNote,
    isLoadingAddNote,
    handleSaveNote,
    handleUpdateNote,
    isLoadingUdpateNote,
    noteIdUpdated,
  } = props
  const { Text, Title } = Typography
  const { TextArea } = Input
  const note_id = lastNote?.note_id

  const validationSchema = Yup.object({
    last_note_title: Yup.string().min(2, 'Too Short').max(200, 'Too Long'),
    last_note_content: Yup.string().min(2, 'Too Short').max(800, 'Too Long'),
  })

  const [isCompleted, setIsCompleted] = useState(lastNote?.completed)
  const [sync, setSync] = useState(false)
  const title = useRef()
  const content = useRef()
  const completed = useRef()

  useEffect(() => {
    if (isLoadingUdpateNote && noteIdUpdated === lastNote.note_id) {
      setSync(true)
      setTimeout(() => {
        setSync(false)
      }, 1000)
    }
  }, [isLoadingUdpateNote, noteIdUpdated, lastNote.note_id])

  const { handleSubmit, handleChange, handleBlur, values, touched, errors } =
    useFormik({
      enableReinitialize: true,
      initialValues: {
        last_note_title: lastNote?.note_title,
        last_note_content: lastNote?.note_content,
      },
      validationSchema,
      onSubmit(values) {
        const { last_note_title, last_note_content } = values
        handleSaveNote(last_note_title, last_note_content, isCompleted)
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
      <div className="container-addnote">
        <Form onSubmit={handleSubmit} onChange={debounceHandleUpdateNote}>
          <Row style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Col>
              <Title
                level={5}
                style={{ padding: 0, paddingTop: '.5rem', margin: 0 }}
                className="title-section"
              >
                MOST RECENT NOTE{' '}
                <RightOutlined
                  style={{
                    fontSize: '1rem',
                    color: 'var(--green)',
                    paddingLeft: '.3rem',
                  }}
                />
              </Title>
            </Col>
            <Col
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Tooltip title="Auto Save">
                <SyncOutlined
                  spin={sync}
                  style={{ fontSize: '1rem', color: 'rgb(115, 115, 115)' }}
                />
              </Tooltip>
            </Col>
          </Row>
          <Row className="row-lastnote-top">
            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
              <Input
                bordered={false}
                ref={title}
                id="last_note_title"
                name="last_note_title"
                type="text"
                placeholder="Note Title"
                className={
                  errors.last_note_title &&
                  touched.last_note_title &&
                  'error_field'
                }
                onBlur={handleBlur}
                value={values.last_note_title}
                onChange={handleChange}
              />
              <div className="div-error-input">
                {errors.last_note_title && touched.last_note_title && (
                  <Text
                    type="danger"
                    style={{
                      fontSize: '.8rem',
                      display: 'flex',
                      justifyContent: 'flex-end',
                    }}
                  >
                    {errors.last_note_title}
                  </Text>
                )}
              </div>
            </Col>
          </Row>
          <TextArea
            bordered={false}
            style={{ resize: 'none' }}
            ref={content}
            rows={9}
            id="last_note_content"
            name="last_note_content"
            type="text"
            placeholder="Note Content"
            className={
              errors.last_note_content &&
              touched.last_note_content &&
              'error_field'
            }
            onBlur={handleBlur}
            value={values.last_note_content}
            onChange={handleChange}
          />{' '}
          <div className="div-error-input">
            {errors.last_note_content && touched.last_note_content && (
              <Text
                type="danger"
                style={{
                  fontSize: '.8rem',
                  display: 'flex',
                  justifyContent: 'flex-end',
                }}
              >
                {errors.last_note_content}
              </Text>
            )}
          </div>
          <Row style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Col className="col-note-date">
              <Text
                className="note-date"
                style={{ color: '#717171', fontSize: '.85rem' }}
              >
                {getDate(lastNote.date_created)}
              </Text>
            </Col>
            <Col
              className="col-note-switch"
              style={{ display: 'flex', flexDirection: 'row', gap: '.5rem' }}
            >
              <Text style={{ color: '#717171', fontSize: '.85rem' }}>Done</Text>
              <Switch
                ref={completed}
                tabIndex="-1"
                id="completed"
                name="completed"
                type="text"
                onChange={() => setIsCompleted(!isCompleted)}
                checked={isCompleted}
                loading={isLoadingAddNote}
              />
            </Col>
          </Row>
        </Form>
      </div>

      <div className="add-errors"></div>
    </>
  )
}
