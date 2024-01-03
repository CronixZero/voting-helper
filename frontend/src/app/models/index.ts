export interface Candidate {
  id: string,
  name: string,
  firstName: string,
  votes: number[]
}

export interface VotingBallot {
  // key: candidate id, value: vote rating
  votes: Map<number, number>
}

export interface SessionCreateDto {
  initialState?: Candidate[]
}

export interface CandidateAddMessage {
  name: string,
  firstName: string,
  candidateId?: string
}

export interface CandidateEditMessage {
  candidateId: string,
  name: string,
  firstName: string
}

export interface CandidateRemoveMessage {
  candidateId: string
}

export interface HistoryEntry {
  sessionId?: string,
  undo?: () => void,
  redo?: () => void
}