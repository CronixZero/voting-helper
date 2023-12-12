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