import React, { useEffect, useState } from 'react'
import { summaryContent, summaryTitle, getDate } from './utils'
import { Row, Col, Typography, Switch, Button, Tooltip } from 'antd'
import { CloseOutlined, SyncOutlined } from '@ant-design/icons'
import './NoteComponent.css'

export default function NoteComponent(props) {
  const {
    note,
    handleToggleNote,
    isLoadingToggleNote,
    isLoadingUdpateNote,
    handleDeleteNote,
    isLoadingDelete,
  } = props
  const { Title, Text } = Typography
  const [sync, setSync] = useState(false)

  useEffect(() => {
    if (isLoadingUdpateNote) {
      setSync(true)
      setTimeout(() => {
        setSync(false)
      }, 1000)
    }
  }, [isLoadingUdpateNote])

  return (
    <>
      <>
        <Row className="row-note-top">
          <Row className="row-notesub-title">
            <Col className="col-notesub-title" span={20}>
              <Title level={5} className="note-title">
                {summaryTitle(note.note_title)}
              </Title>
            </Col>
            <Col span={1}>
              <Tooltip title="Auto Save">
                <SyncOutlined
                  spin={sync}
                  style={{ fontSize: '1rem', color: 'rgb(115, 115, 115)' }}
                />
              </Tooltip>
            </Col>
            <Col offset={1} className="col-notesub-delete">
              <Button
                className="btn-closetodo"
                onClick={() => handleDeleteNote(note.note_id)}
                loading={isLoadingDelete}
                icon={<CloseOutlined />}
              ></Button>
            </Col>
          </Row>
          <Col className="col-note-content">
            <Text className="note-content">
              {summaryContent(note.note_content)}
            </Text>
          </Col>
        </Row>
        <Row>
          <Col span={12} className="col-note-date">
            <Text className="note-date">{getDate(note.date_created)}</Text>
          </Col>
          <Col span={11} className="col-note-switch">
            <Switch
              id="completed"
              name="completed"
              onChange={() => handleToggleNote(note.note_id, !note.completed)}
              defaultChecked={note.completed}
              disabled={isLoadingToggleNote}
            />
          </Col>
        </Row>
      </>
    </>
  )
}
