import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {Candidate} from "@/app/models";

export interface CandidatesState {
  candidates: Candidate[]
}

const initialState: CandidatesState = {
  candidates: []
}

export const candidatesSlice = createSlice({
  name: 'candidates',
  initialState,
  reducers: {
    setCandidates: (state, action: PayloadAction<Candidate[]>) => {
      state.candidates = action.payload
    }
  }
})

export const { setCandidates } = candidatesSlice.actions
export default candidatesSlice.reducer