import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectIsLoadingNotes,
  selectHasErrorNotes,
  loadNotes,
} from '../../features/note/NoteSlice'
import NoteComponent from '../noteComponent/NoteComponent'
import {
  sortDateAsc,
  sortDateDesc,
  sortCompletedAsc,
  sortCompletedDesc,
} from './utils'
import { Col, Row, Typography, Menu, Dropdown, Button, Skeleton } from 'antd'
import {
  CaretUpOutlined,
  CaretDownOutlined,
  RightOutlined,
} from '@ant-design/icons'
import './NoteListComponent.css'

export default function NoteListComponent(props) {
  const {
    notes,
    sort,
    setSort,
    setSortBy,
    sortStatus,
    sortBy,
    handleDeleteNote,
    isLoadingDelete,
    handleToggleNote,
    isLoadingToggleNote,
  } = props
  const isLoadingNotes = useSelector(selectIsLoadingNotes)
  const hasErrorNotes = useSelector(selectHasErrorNotes)
  const dispatch = useDispatch()
  const { Title } = Typography

  const renderEmptyNote = () => {
    return (
      <Row className="row-empty-note">
        <Col className="col-noresult">
          <p>No notes</p>
        </Col>
      </Row>
    )
  }

  const renderErrorNote = () => {
    return (
      <Row className="row-error-note">
        <Col className="col-error-render-note">
          <p>Error retrieving your notes</p>
        </Col>
        <Col className="col-error-render-note">
          <Button onClick={handleTryAgain} id="try-again">
            Try Again
          </Button>
        </Col>
      </Row>
    )
  }

  const selectSort = (a, b) => {
    if (sort && sortBy === 'Status') return sortCompletedAsc(a, b)
    if (!sort && sortBy === 'Status') return sortCompletedDesc(a, b)
    if (sort && sortBy === 'Date') return sortDateAsc(a, b)
    return sortDateDesc(a, b)
  }

  const handleTryAgain = () => {
    dispatch(loadNotes())
  }

  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={() => setSortBy('Date')}>
        Date
      </Menu.Item>
      <Menu.Item key="2" onClick={() => setSortBy('Status')}>
        Status
      </Menu.Item>
    </Menu>
  )

  return (
    <>
      <Row className="row-notelist">
        <Col className="col-notelist-left" span={24}>
          <Title level={5} className="title-section">
            NOTES{' '}
            <RightOutlined
              style={{
                fontSize: '1rem',
                color: 'var(--green)',
                paddingLeft: '.3rem',
              }}
            />
          </Title>
        </Col>
      </Row>
      <Row style={{ marginBottom: '.6rem' }}>
        <Col>
          <Dropdown overlay={menu} placement="bottomCenter" arrow>
            <Button id="sort-type">Sort By {sortBy}</Button>
          </Dropdown>
        </Col>
        <Col>
          <Button id="sort-toggle" onClick={() => setSort(!sort)}>
            {sort ? (
              <>
                {sortStatus()} <CaretUpOutlined />
              </>
            ) : (
              <>
                {sortStatus()} <CaretDownOutlined />
              </>
            )}
          </Button>
        </Col>
      </Row>
      {hasErrorNotes && renderErrorNote()}

      <>
        <Row className="row-notes">
          {isLoadingNotes &&
            notes.map(note => {
              return (
                <Col
                  className="col-note"
                  xs={24}
                  md={12}
                  lg={8}
                  xl={6}
                  xxl={4}
                  key={note.note_id}
                >
                  <Skeleton
                    active
                    paragraph={{ rows: 11 }}
                    style={{
                      width: 200,
                    }}
                  ></Skeleton>
                </Col>
              )
            })}

          {notes.length >= 1
            ? []
                .concat(notes)
                .sort(selectSort)
                .map(note => {
                  return (
                    <Col
                      xs={24}
                      md={12}
                      lg={8}
                      xl={6}
                      xxl={4}
                      key={note.note_id}
                      className="col-note"
                    >
                      <NoteComponent
                        note={note}
                        handleToggleNote={handleToggleNote}
                        isLoadingToggleNote={isLoadingToggleNote}
                        handleDeleteNote={handleDeleteNote}
                        isLoadingDelete={isLoadingDelete}
                        isLoadingNotes={isLoadingNotes}
                      />
                    </Col>
                  )
                })
            : !hasErrorNotes && renderEmptyNote()}
        </Row>
      </>
    </>
  )
}
