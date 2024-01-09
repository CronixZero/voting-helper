import type {PayloadAction} from '@reduxjs/toolkit'
import {createSlice} from '@reduxjs/toolkit'
import {VotingBallot} from "@/app/models";

export interface CandidatesState {
  votes: VotingBallot[]
}

const initialState: CandidatesState = {
  votes: []
}

export const votesSlice = createSlice({
  name: 'votes',
  initialState,
  reducers: {
    setVotes: (state, action: PayloadAction<VotingBallot[]>) => {
      state.votes = action.payload
    }
  }
})

export const {setVotes} = votesSlice.actions
export default votesSlice.reducer