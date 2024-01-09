"use client"

import {Candidate} from "@/app/models";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/app/store";
import {CandidateVoteList2} from "@/app/votes/CandidateVoteList2";

export function VoteCandidatesList2() {
  const candidates: Candidate[] = useSelector((state: RootState) => state.candidates.candidates);
  const dispatch = useDispatch();

  /*
* Es werden nur 0, 1, 2, 3, 4, 5 als Karten angezeigt. Unten rechts in der Ecke steht wie oft (z.B. 100x). Drauf klicken = + / 133x / - | Abbrechen / Speichern / Löschen
* */

  return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-flow-row gap-3 justify-center">
        {candidates.map((candidate) => {
          return (
              <div key={candidate.id}>
                <CandidateVoteList2 candidate={candidate}/>
              </div>
          )
        })}
      </div>
  )
}