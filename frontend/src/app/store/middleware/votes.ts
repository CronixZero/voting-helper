import {Middleware} from "redux";
import {RootState} from "@/app/store";
import {Candidate, VotingBallot} from "@/app/models";
import {PayloadAction} from "@reduxjs/toolkit";
import {setVotes} from "@/app/store/slices/votesSlice";
import {setCandidates} from "@/app/store/slices/candidatesSlice";

export class VotesMiddleware {
  public votesMiddleware: Middleware<{}, RootState>;

  constructor() {
    this.votesMiddleware = storeApi => next => action => {
      const dispatch = storeApi.dispatch

      // @ts-ignore
      switch (action.type) {
        case "votes/add-ballot": {
          // @ts-ignore
          const ballot = action.payload as VotingBallot;

          // @ts-ignore
          dispatch(setVotes([...storeApi.getState().votes.votes, ballot]));

          for (const vote of ballot.votes) {
            const candidate = storeApi.getState().candidates.candidates
            .find(candidate => candidate.id === vote.candidateId);

            if (candidate) {
              dispatch(setCandidates(storeApi.getState().candidates.candidates.map(candidate => {
                if (candidate.id === vote.candidateId) {
                  return {
                    ...candidate,
                    votes: [...candidate.votes, vote]
                  } as Candidate;
                }

                return candidate;
              })));
            }
          }
          break;
        }

        case "votes/remove-ballot": {
          // @ts-ignore
          const ballotId = action.payload as string;

          dispatch(setVotes(storeApi.getState().votes.votes.filter(ballot => ballot.id !== ballotId)));

          dispatch(setCandidates(storeApi.getState().candidates.candidates.map(candidate => {
            candidate.votes = candidate.votes.filter(vote => vote.ballotId !== ballotId);
            return candidate;
          })));

          break;
        }

        default: {
          break;
        }
      }

      return next(action);
    }
  }
}

// Action creators
function addVoteBallot(ballot: VotingBallot): PayloadAction<VotingBallot> {
  return {
    type: "votes/add-ballot",
    payload: ballot
  }
}

function removeVoteBallot(ballotId: string): PayloadAction<string> {
  return {
    type: "votes/remove-ballot",
    payload: ballotId
  }
}

export {addVoteBallot};