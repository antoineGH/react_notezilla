import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { authFetch } from '../../utils/authHook'
import { openNotificationWithIcon } from '../../utils/notification'

// Slice Reducer
////////////////////////////////

const initialValue = {
  value: [],
  isLoadingScratch: false,
  hasErrorScratch: false,
  isLoadingAddScratch: false,
  hasErrorAddScratch: false,
  isLoadingDeleteScratch: false,
  hasErrorDeleteScratch: false,
}

export const loadScratch = createAsyncThunk('scratch/getScratch', async () => {
  const data = await authFetch(
    'https://antoineratat.xyz/api_notezilla/api/scratch',
  )
  const json = await data.json()
  if (json.hasOwnProperty('message')) {
    if (json['message'] === 'Scratch not found') {
      return { scratch: [] }
    }
  }
  return json
})

export const addScratch = createAsyncThunk('scratch/addScratch', async args => {
  const { scratch_title, scratch_content, isCompleted } = args
  const scratch = {
    scratch_title,
    scratch_content,
    completed: isCompleted,
  }
  const data = await authFetch(
    'https://antoineratat.xyz/api_notezilla/api/scratch',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(scratch),
    },
  )
  const json = await data.json()
  if (!json.scratch.hasOwnProperty('scratch_id')) {
    openNotificationWithIcon(
      'error',
      'Scratch Not Saved',
      'Error Saving your scratch.',
    )
  }
  return json
})

export const deleteScratch = createAsyncThunk(
  'scratch/deleteScratch',
  async () => {
    const data = await authFetch(
      'https://antoineratat.xyz/api_notezilla/api/scratch',
      {
        method: 'DELETE',
      },
    )
    const json = await data.json()
    if (json) {
      openNotificationWithIcon(
        'success',
        'ScratchPad Cleared',
        'ScratchPad has been cleared',
      )
    } else {
      openNotificationWithIcon(
        'error',
        'Error',
        'ScratchPad has not been cleared',
      )
    }
    return json
  },
)

export const scratchSlice = createSlice({
  name: 'scratch',
  initialState: initialValue,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadScratch.pending, state => {
        state.isLoadingScratch = true
        state.hasErrorScratch = false
      })
      .addCase(loadScratch.fulfilled, (state, action) => {
        if (action.payload.scratch.length < 1) {
          state.value = []
        } else {
          state.value = action.payload.scratch
        }
        state.isLoadingScratch = false
        state.hasErrorScratch = false
      })
      .addCase(loadScratch.rejected, state => {
        state.isLoadingScratch = false
        state.hasErrorScratch = true
      })
      .addCase(addScratch.pending, state => {
        state.isLoadingAddScratch = true
        state.hasErrorAddScratch = false
      })
      .addCase(addScratch.fulfilled, (state, action) => {
        state.value = [action.payload.scratch]
        state.isLoadingAddScratch = false
        state.hasErrorAddScratch = false
      })
      .addCase(addScratch.rejected, state => {
        state.isLoadingAddScratch = false
        state.hasErrorAddScratch = true
      })
      .addCase(deleteScratch.pending, state => {
        state.isLoadingDeleteScratch = true
        state.hasErrorDeleteScratch = false
      })
      .addCase(deleteScratch.fulfilled, (state, action) => {
        state.value = [action.payload.scratch]
        state.isLoadingDeleteScratch = false
        state.hasErrorDeleteScratch = false
      })
      .addCase(deleteScratch.rejected, state => {
        state.isLoadingDeleteScratch = false
        state.hasErrorDeleteScratch = true
      })
  },
})

// Selectors
////////////////////////////////

export const selectScratch = state => state.scratch.value[0]
export const selectisLoadingScratch = state => state.scratch.isLoadingScratch
export const selecthasErrorScratch = state => state.scratch.hasErrorScratch
export const selectIsLoadingAddScratch = state =>
  state.scratch.isLoadingAddScratch
export const selectHasErrorAddScratch = state =>
  state.scratch.hasErrorAddScratch
export const selectIsLoadingDeleteScratch = state =>
  state.scratch.isLoadingDeleteScratch
export const selectHasErrorDeleteScratch = state =>
  state.scratch.isLoadingDeleteScratch

export default scratchSlice.reducer
