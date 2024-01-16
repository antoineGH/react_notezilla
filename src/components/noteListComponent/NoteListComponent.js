import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectIsLoadingNotes,
  selectHasErrorNotes,
  loadNotes,
} from '../../features/note/noteSlice'
import {
  sortDateAsc,
  sortDateDesc,
  sortCompletedAsc,
  sortCompletedDesc,
} from './utils'
import NoteForm from '../../forms/noteForm/NoteForm'
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
    handleUpdateNote,
    isLoadingUdpateNote,
    handleDeleteNote,
    isLoadingDelete,
    noteIdUpdated,
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
          <Dropdown
            id="dropdown-sort"
            overlay={menu}
            placement="bottomCenter"
            arrow
          >
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
            Array(3)
              .fill()
              .map((_, index) => (
                <Col
                  key={index}
                  className="col-note"
                  xs={24}
                  md={12}
                  lg={8}
                  xl={6}
                  xxl={4}
                >
                  <Skeleton
                    active
                    paragraph={{ rows: 10 }}
                    style={{
                      width: 424,
                    }}
                  />
                </Col>
              ))}

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
                      xl={8}
                      xxl={4}
                      key={note.note_id}
                      className="col-note"
                    >
                      <NoteForm
                        note={note}
                        handleUpdateNote={handleUpdateNote}
                        isLoadingUdpateNote={isLoadingUdpateNote}
                        handleDeleteNote={handleDeleteNote}
                        isLoadingDelete={isLoadingDelete}
                        isLoadingNotes={isLoadingNotes}
                        noteIdUpdated={noteIdUpdated}
                      />
                    </Col>
                  )
                })
            : !hasErrorNotes && !isLoadingNotes && notes.length === 0
            ? renderEmptyNote()
            : ''}
        </Row>
      </>
    </>
  )
}
