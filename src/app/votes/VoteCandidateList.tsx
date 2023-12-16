"use client"

import {Candidate} from "@/app/models";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/app/store";
import {Accordion, AccordionItem, Button} from "@nextui-org/react";
import {VoteBallot} from "@/app/votes/VoteBallot";
import {setCandidates} from "@/app/candidates/candidatesSlice";

export function VoteCandidateList() {
  const candidates: Candidate[] = useSelector((state: RootState) => state.candidates);
  const dispatch = useDispatch();

  function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

  return (
      <div>
        <Accordion variant="splitted">
          {
            candidates.map((candidate) => {
              return (
                  <AccordionItem key={candidate.id}
                                 title={candidate.name + ", " + candidate.firstName}>
                    <div className="flex auto-cols-max gap-y-4">
                      <div className="box">
                      {
                        candidate.votes.map((vote, index) => {
                          return (
                              <div key={index}>
                                <VoteBallot rating={vote}/>
                              </div>
                          )
                        })
                      }
                      </div>
                    </div>
                    <Button onClick={() => {
                      dispatch(setCandidates(candidates.map(mapCandidate => {
                        if (mapCandidate.id === candidate.id) {
                          return {
                            ...mapCandidate,
                            votes: [...mapCandidate.votes, getRandomInt(5)]
                          }
                        } else {
                          return mapCandidate;
                        }
                      })));
                    }}>
                      Add Vote
                    </Button>
                  </AccordionItem>
              )
            })
          }
        </Accordion>
      </div>
  )
}