import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  deleteNote,
  loadNotes,
  selectIsLoadingDeleteNote,
  selectIsLoadingUpdateNote,
  selectNotes,
  selectNoteIdUpdated,
} from './NoteSlice'
import { selectSearch } from '../search/searchSlice'
import { updateNote } from '../note/NoteSlice'
import NoteListComponent from '../../components/noteListComponent/NoteListComponent'
import AddNoteComponent from '../../components/addNoteComponent/AddNoteComponent'
import LastNoteComponent from '../../components/lastNoteComponent/LastNoteComponent'
import Scratch from '../../features/scratch/Scratch'
import { Row, Col } from 'antd'
import './Note.css'

import Joyride, {
  CallBackProps,
  STATUS,
  Step,
  StoreHelpers,
} from 'react-joyride'

export default function Note() {
  const dispatch = useDispatch()
  const notes = useSelector(selectNotes)
  const searchParam = useSelector(selectSearch)
  const isLoadingDeleteNote = useSelector(selectIsLoadingDeleteNote)
  const isLoadingUdpateNote = useSelector(selectIsLoadingUpdateNote)
  const noteIdUpdated = useSelector(selectNoteIdUpdated)
  const [sort, setSort] = useState(false)
  const [sortBy, setSortBy] = useState('Date')

  var steps = [
    {
      target: '#edit-note',
      content: 'Want to edit an existing note? Click here!',
      disableBeacon: true,
    },
    {
      target: '.autosave-note',
      content: 'Did I save my..? Say no more! Notes are automatically saved.',
      disableBeacon: true,
    },
    {
      target: '#btn-cross',
      content: 'Want to get rid of your note? Click here!',
      disableBeacon: true,
    },
    {
      target: '#completed',
      content: 'Note status completed? Toggle the switch!',
      disableBeacon: true,
    },
    {
      target: '.container-addnote',
      content: 'Feeling inspired? Write a new note!',
      disableBeacon: true,
    },
    {
      target: '.container-scratchpad',
      content: 'Start writing your ideas on the scratchpad!',
      disableBeacon: true,
    },
  ]

  const [runTour, setRunTour] = useState(false)

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
    const { status, type } = data
    const finishedStatuses = [STATUS.FINISHED, STATUS.SKIPPED]

    if (finishedStatuses.includes(status)) {
      setRunTour(false)
    }
    console.groupCollapsed(type)
    console.log(data)
    console.groupEnd()
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
              textColor: '#004a14',
              width: 'auto',
              zIndex: 1000,
            },
          }}
        />
        <Row className="row-listnotes">
          <Col span={24} className="col-listnotes">
            <button onClick={() => setRunTour(!runTour)}>START TOUR</button>
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
        <Row justify="space-between" className="row-scratchpad-add">
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
