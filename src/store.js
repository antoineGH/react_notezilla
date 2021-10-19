import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/user/userSlice'
import noteReducer from './features/note/NoteSlice'

export const store = configureStore({
	reducer: {
		notes: noteReducer,
		user: userReducer,
	},
})
