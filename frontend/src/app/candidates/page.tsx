"use client"

import {CandidatesList} from "@/app/candidates/CandidatesList";
import {CandidateAdd} from "@/app/candidates/CandidateAdd";

export default function Candidates() {
  return (
      <div>
        <div className="md:hidden w-10 h-10 absolute bottom-0 right-0 m-3">
          <CandidateAdd text="" radius="full"/>
        </div>
        <CandidatesList/>
      </div>
  )
}