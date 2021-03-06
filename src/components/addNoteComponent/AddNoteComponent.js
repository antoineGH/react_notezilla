import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  addNote,
  selectIsLoadingAddNote,
  selectIsLoadingNotes,
  selectHasErrorNotes,
} from '../../features/note/noteSlice'
import NoteAddForm from '../../forms/noteAddForm/NoteAddForm'
import { openNotificationWithIcon } from '../../utils/notification'
import { Skeleton } from 'antd'

export default function AddNoteComponent() {
  const isLoadingAddNote = useSelector(selectIsLoadingAddNote)
  const dispatch = useDispatch()
  const isLoadingNotes = useSelector(selectIsLoadingNotes)
  const hasErrorNotes = useSelector(selectHasErrorNotes)

  const handleAddNote = (note_title, note_content, isCompleted) => {
    if (!note_title || !note_content) {
      openNotificationWithIcon('info', 'No Changes', 'Note was not saved.')
      return
    }
    dispatch(addNote({ note_title, note_content, isCompleted }))
  }

  const renderNoteForm = () => {
    if (hasErrorNotes) {
      return ''
    }
    if (isLoadingNotes) {
      return (
        <div style={{ margin: 'auto .5rem' }}>
          <Skeleton.Input active={true} size="large" />
        </div>
      )
    }
    return (
      <NoteAddForm
        handleAddNote={handleAddNote}
        isLoadingAddNote={isLoadingAddNote}
      />
    )
  }

  return renderNoteForm()
}
