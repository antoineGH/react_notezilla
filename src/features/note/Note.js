import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  deleteNote,
  loadNotes,
  selectIsLoadingDeleteNote,
  selectIsLoadingUpdateNote,
  selectNotes,
  selectNoteIdUpdated,
} from './noteSlice'
import { selectSearch } from '../search/searchSlice'
import { updateNote } from './noteSlice'
import Joyride, { STATUS, ACTIONS } from 'react-joyride'
import { steps } from './utils/steps'
import NoteListComponent from '../../components/noteListComponent/NoteListComponent'
import AddNoteComponent from '../../components/addNoteComponent/AddNoteComponent'
import LastNoteComponent from '../../components/lastNoteComponent/LastNoteComponent'
import Scratch from '../../features/scratch/Scratch'
import { Row, Col } from 'antd'
import './Note.css'

export default function Note(props) {
  const { runTour, setRunTour } = props
  const dispatch = useDispatch()
  const notes = useSelector(selectNotes)
  const searchParam = useSelector(selectSearch)
  const isLoadingDeleteNote = useSelector(selectIsLoadingDeleteNote)
  const isLoadingUdpateNote = useSelector(selectIsLoadingUpdateNote)
  const noteIdUpdated = useSelector(selectNoteIdUpdated)
  const [sort, setSort] = useState(false)
  const [sortBy, setSortBy] = useState('Date')

  useEffect(() => {
    dispatch(loadNotes())
  }, [dispatch])

  const handleDeleteNote = note_id => {
    dispatch(deleteNote(note_id))
  }

  const handleUpdateNote = (note_id, note_title, note_content, completed) => {
    dispatch(updateNote({ note_id, note_title, note_content, completed }))
  }

  const handleJoyrideCallback = data => {
    const { status, action } = data
    const finishedStatuses = [STATUS.FINISHED, STATUS.SKIPPED]

    if (finishedStatuses.includes(status)) {
      setRunTour(false)
    }
    if (action === ACTIONS.CLOSE && runTour) {
      setRunTour(false)
    }
  }

  const sortStatus = () => {
    if (sort && sortBy === 'Status') return 'Completed'
    if (!sort && sortBy === 'Status') return 'Not Completed'
    if (sort && sortBy === 'Date') return 'Oldest'
    return 'Newest'
  }

  const search = () => {
    const notesSearch = notes.filter(note => {
      return (
        note.note_title.toLowerCase().includes(searchParam.toLowerCase()) ||
        note.note_content.toLowerCase().includes(searchParam.toLowerCase())
      )
    })
    return notesSearch
  }

  return (
    <div className="container-content">
      <>
        <Joyride
          callback={handleJoyrideCallback}
          continuous={true}
          run={runTour}
          scrollToFirstStep={true}
          showProgress={true}
          showSkipButton={true}
          steps={steps}
          styles={{
            options: {
              arrowColor: 'white',
              backgroundColor: 'white',
              overlayColor: 'rgb(0 0 0 / 37%)',
              primaryColor: '#000',
              textColor: 'rgba(0, 0, 0, 0.85)',
              width: 'auto',
              zIndex: 1000,
            },
          }}
        />
        <Row className="row-listnotes">
          <Col span={24} className="col-listnotes">
            <NoteListComponent
              notes={searchParam ? search() : notes}
              handleDeleteNote={handleDeleteNote}
              handleUpdateNote={handleUpdateNote}
              isLoadingUdpateNote={isLoadingUdpateNote}
              isLoadingDelete={isLoadingDeleteNote}
              sort={sort}
              setSort={setSort}
              sortBy={sortBy}
              setSortBy={setSortBy}
              sortStatus={sortStatus}
              noteIdUpdated={noteIdUpdated}
            />
          </Col>
        </Row>
        <Row
          justify="space-between"
          className="row-scratchpad-add"
          style={{ width: '100%', gap: '0rem' }}
        >
          <Col xs={24} lg={12} xl={8} className="col-addnote">
            <AddNoteComponent />
          </Col>
          <Col xs={24} lg={12} xl={8} className="col-scratchpad">
            <Scratch />
          </Col>
          <Col xs={24} lg={12} xl={8} className="col-scratchpad">
            <LastNoteComponent
              notes={notes}
              isLoadingUdpateNote={isLoadingUdpateNote}
              noteIdUpdated={noteIdUpdated}
            />
          </Col>
        </Row>
      </>
    </div>
  )
}
