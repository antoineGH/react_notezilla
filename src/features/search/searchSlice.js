import { createSlice } from '@reduxjs/toolkit'

// Slice Reducer
////////////////////////////////

const initialValue = {
	value: '',
}

export const searchSlice = createSlice({
	name: 'search',
	initialState: initialValue,
	reducers: {
		setSearch: (state, action) => {
			state.value = action.payload
		},
	},
})

export const { setSearch } = searchSlice.actions

// Selectors
////////////////////////////////

export const selectSearch = (state) => state.search.value
export default searchSlice.reducer
