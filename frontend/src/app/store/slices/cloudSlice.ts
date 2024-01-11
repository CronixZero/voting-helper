import type {PayloadAction} from '@reduxjs/toolkit'
import {createSlice} from '@reduxjs/toolkit'

export interface SessionState {
  sessionId: string | null,
  connected: boolean,
  autoConnect: boolean
}

const initialState: SessionState = {
  sessionId: null,
  connected: false,
  autoConnect: false,
}

export const cloudSlice = createSlice({
  name: 'cloud',
  initialState,
  reducers: {
    setSessionId: (state, action: PayloadAction<string>) => {
      state.sessionId = action.payload
    },
    setConnected: (state, action: PayloadAction<boolean>) => {
      state.connected = action.payload
    },
    setAutoConnect: (state, action: PayloadAction<boolean>) => {
      state.autoConnect = action.payload
    }
  }
})

export const {setSessionId, setConnected, setAutoConnect} = cloudSlice.actions
export default cloudSlice.reducer