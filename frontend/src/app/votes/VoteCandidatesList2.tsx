"use client"

import {Candidate} from "@/app/models";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/app/store";

export function VoteCandidatesList2() {
  const candidates: Candidate[] = useSelector((state: RootState) => state.candidates.candidates);
  const dispatch = useDispatch();

  /*
* Es werden nur 0, 1, 2, 3, 4, 5 als Karten angezeigt. Unten rechts in der Ecke steht wie oft (z.B. 100x). Drauf klicken = + / 133x / - | Abbrechen / Speichern / Löschen
* */

  return (
      <div>
        {candidates.map((candidate, index) => {
          return (
              <div key={candidate.id}>
              </div>
          )})}
      </div>
  )
}