"use client"

import {Candidate} from "@/app/models";
import {useSelector} from "react-redux";
import {RootState} from "@/app/store";
import {Accordion, AccordionItem} from "@nextui-org/react";
import {CandidateVoteList} from "@/app/votes/CandidateVoteList";

export function VoteCandidateList() {
  const candidates: Candidate[] = useSelector((state: RootState) => state.candidates.candidates);

  return (
      <div>
        <Accordion variant="splitted" className="mb-2">
          {candidates.map((candidate) => {
            return (
                <AccordionItem key={candidate.id}
                               title={candidate.name + ", " + candidate.firstName}>
                  <CandidateVoteList candidate={candidate}/>
                </AccordionItem>
            )
          })}
        </Accordion>
      </div>
  )
}