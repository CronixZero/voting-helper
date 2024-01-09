"use client"

import {VoteCandidatesList2} from "@/app/votes/VoteCandidatesList2";
import {VoteBallotAdd} from "@/app/votes/VoteBallotAdd";

export default function Votes() {
  return (
      <div>
        <VoteCandidatesList2/>
        <VoteBallotAdd/>
      </div>
  )
}