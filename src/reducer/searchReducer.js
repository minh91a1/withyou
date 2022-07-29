import { createSlice } from "@reduxjs/toolkit"

const searchSlice = createSlice({
  name: "search",
  initialState: { value: { searchKey: "", tags: [] } },
  reducers: {
    setKey: (state, action) => {
      if (state.value.searchKey !== action.payload) {
        state.value.searchKey = action.payload
      }
    },
    setTags: (state, action) => {
      if (state.value.tags !== action.payload) {
        state.value.tags = action.payload
      }
    },
  },
})

// export store (to read data)
export default searchSlice.reducer

// export function to interact with the store
export const { setKey, setTags } = searchSlice.actions
