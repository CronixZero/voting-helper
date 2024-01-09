export interface Vote {
  candidateId: string,
  ballotId: string,
  rating: number
}

export interface Candidate {
  id: string,
  name: string,
  firstName: string,
  votes: Vote[]
}

export interface VotingBallot {
  id: string,
  votes: Vote[]
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