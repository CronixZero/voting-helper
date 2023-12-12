"use client"

import {CandidatesList} from "@/app/candidates/CandidatesList";
import {CandidateAdd} from "@/app/candidates/CandidateAdd";

export default function Candidates() {
  return (
      <div>
        <CandidateAdd/>
        <CandidatesList/>
      </div>
  )
}