import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';

const getInitialPaste = () => {
  try {
    const data = localStorage.getItem('pastes')
    return data ? JSON.parse(data) : []
  } catch (error) {
    console.error('Invalid JSON in localStorage', error)
    localStorage.removeItem('pastes')
    return []
  }
}

const initialState = {
  pastes: getInitialPaste(),
}
export const pasteSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {
    addToPaste: (state, action) => {
      const paste = action.payload;
      state.pastes.push(paste);
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
      toast("Added Successfully!!")
    },
    updateToPaste: (state, action) => {
      const paste = action.payload
      const index = state.pastes.findIndex((item) => item._id === paste._id)

      if (index >= 0) {
        state.pastes[index] = paste
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast.success("Paste Updated!!")
      }
    },
    removeFromPaste: (state, action) => {
      const pasteId = action.payload
      const index = state.pastes.findIndex((item) => item._id === pasteId)

      if (index >= 0) {
        state.pastes.splice(index, 1)
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast.success("Paste Deleted")
      }
    },
    resetAllPaste: (state) => {
      state.pastes = [];
      localStorage.removeItem("pastes")
    },
  }
})

// Action creators are generated for each case reducer function
export const { addToPaste, removeFromPaste, updateToPaste, resetAllPaste } = pasteSlice.actions

export default pasteSlice.reducer