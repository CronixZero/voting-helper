"use client"

import {VoteCandidateList} from "@/app/votes/VoteCandidateList";
import {VoteCandidatesList2} from "@/app/votes/VoteCandidatesList2";
import {VoteBallotAdd} from "@/app/votes/VoteBallotAdd";

export default function Votes() {
  return (
      <div>
        <VoteCandidateList/>
        <VoteCandidatesList2/>
        <VoteBallotAdd/>
      </div>
  )
}