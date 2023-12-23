export interface Candidate {
  id: any,
  name: string,
  firstName: string,
  votes: number[]
}

export interface VotingBallot {
  // key: candidate id, value: vote rating
  votes: Map<number, number>
}

export interface CandidateAddMessage {
  name: string,
  firstName: string
}

export interface CandidateEditMessage {
  id: string,
  name: string,
  firstName: string
}

export interface CandidateDeleteMessage {
  id: string
}