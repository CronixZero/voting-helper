"use client"

import {CandidatesList} from "@/app/candidates/CandidatesList";
import {CandidateAdd} from "@/app/candidates/CandidateAdd";

export default function Candidates() {
  return (
      <div>
        <div className="md:hidden w-10 h-10 fixed bottom-0 right-0 m-3 z-[1]">
          <CandidateAdd text="" variant="solid" radius="lg"/>
        </div>
        <CandidatesList/>
      </div>
  )
}