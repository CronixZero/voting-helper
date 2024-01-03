import type {PayloadAction} from '@reduxjs/toolkit'
import {createSlice} from '@reduxjs/toolkit'
import {HistoryEntry} from "@/app/models";

export interface SessionState {
  history: HistoryEntry[],
  historyIndex: number,
  undoAllowed: boolean,
  redoAllowed: boolean
}

const initialState: SessionState = {
  history: [{}],
  historyIndex: 0,
  undoAllowed: false,
  redoAllowed: false
}

export const changeHistorySlice = createSlice({
  name: 'changeHistory',
  initialState,
  reducers: {
    addHistoryEntry: (state, action: PayloadAction<HistoryEntry>) => {
      state.history = [...state.history, action.payload]
      state.historyIndex = state.history.length - 1
    },
    setHistory: (state, action: PayloadAction<HistoryEntry[]>) => {
      state.history = action.payload
    },
    setHistoryIndex: (state, action: PayloadAction<number>) => {
      state.historyIndex = action.payload
    },
    setUndoAllowed: (state, action: PayloadAction<boolean>) => {
      state.undoAllowed = action.payload
    },
    setRedoAllowed: (state, action: PayloadAction<boolean>) => {
      state.redoAllowed = action.payload
    }
  }
})

export const {
  addHistoryEntry,
  setHistory,
  setHistoryIndex,
  setRedoAllowed,
  setUndoAllowed
} = changeHistorySlice.actions
export default changeHistorySlice.reducer