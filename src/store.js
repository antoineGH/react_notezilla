import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/user/userSlice'
import noteReducer from './features/note/NoteSlice'
import searchReducer from './features/search/searchSlice'
import scratchReducer from './features/scratch/scratchSlice'

export const store = configureStore({
	reducer: {
		notes: noteReducer,
		user: userReducer,
		search: searchReducer,
		scratch: scratchReducer,
	},
})
