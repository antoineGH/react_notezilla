import React, { useState, useEffect } from 'react'
import LastNoteForm from '../../forms/lastNoteForm/LastNoteForm'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectIsLoadingNotes,
  selectHasErrorNotes,
  selectIsLoadingAddNote,
  addNote,
  updateNote,
} from '../../features/note/noteSlice'
import { openNotificationWithIcon } from '../../utils/notification'
import { Skeleton } from 'antd'
import './LastNoteComponent.css'

const getLastNote = notes => {
  return notes
    .map(function (note) {
      return note
    })
    .sort()
    .reverse()[0]
}

export default function LastNoteComponent(props) {
  const { notes, isLoadingUdpateNote, noteIdUpdated } = props
  const [lastNote, setLastNote] = useState(getLastNote(notes))
  const isLoadingNotes = useSelector(selectIsLoadingNotes)
  const hasErrorNotes = useSelector(selectHasErrorNotes)
  const isLoadingAddNote = useSelector(selectIsLoadingAddNote)
  const dispatch = useDispatch()

  useEffect(() => {
    setLastNote(getLastNote(notes))
  }, [notes])

  const handleSaveNote = (note_title, note_content, isCompleted) => {
    if (!note_title || !note_content) {
      openNotificationWithIcon('info', 'No Changes', 'Note was not saved.')
      return
    }
    dispatch(addNote({ note_title, note_content, isCompleted }))
  }

  const handleUpdateNote = (note_id, note_title, note_content, completed) => {
    dispatch(updateNote({ note_id, note_title, note_content, completed }))
  }

  const renderLastNote = () => {
    if (hasErrorNotes) {
      return ''
    }

    if (!isLoadingNotes && !lastNote) {
      return ''
    }

    if (isLoadingNotes || !lastNote) {
      return (
        <div style={{ margin: 'auto .5rem' }}>
          <Skeleton.Input active={true} size="large" />
        </div>
      )
    }

    return (
      <LastNoteForm
        lastNote={lastNote}
        isLoadingNotes={isLoadingNotes}
        isLoadingAddNote={isLoadingAddNote}
        isLoadingUdpateNote={isLoadingUdpateNote}
        handleSaveNote={handleSaveNote}
        handleUpdateNote={handleUpdateNote}
        noteIdUpdated={noteIdUpdated}
      />
    )
  }

  return renderLastNote()
}
