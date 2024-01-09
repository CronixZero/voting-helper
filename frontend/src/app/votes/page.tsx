"use client"

import {VoteCandidatesList} from "@/app/votes/VoteCandidatesList";
import {VoteBallotAdd} from "@/app/votes/VoteBallotAdd";

export default function Votes() {
  return (
      <div>
        <VoteCandidatesList/>
        <VoteBallotAdd/>
      </div>
  )
}