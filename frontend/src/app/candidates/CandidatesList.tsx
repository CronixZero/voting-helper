"use client"

import {RootState} from "@/app/store";
import {useSelector} from "react-redux";
import {Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from "@nextui-org/react";
import {Candidate} from "@/app/models";
import {CandidateAdd} from "@/app/candidates/CandidateAdd";
import {CandidateRemove} from "@/app/candidates/CandidateRemove";
import {CandidateEdit} from "@/app/candidates/CandidateEdit";

export function CandidatesList() {
  const candidates: Candidate[] = useSelector((state: RootState) => state.candidates.candidates);

  return (
      <div>
        <div className="flex justify-between">
          <Table className="max-w-full" removeWrapper aria-label="List of Candidates">
            <TableHeader>
              <TableColumn>Nachname</TableColumn>
              <TableColumn>Vorname</TableColumn>
              <TableColumn>Aktionen</TableColumn>
            </TableHeader>
            <TableBody>
              {
                candidates.map((candidate) => {
                  return (
                      <TableRow key={candidate.id}>
                        <TableCell>{candidate.name}</TableCell>
                        <TableCell>{candidate.firstName}</TableCell>
                        <TableCell className="flex justify-start content-center">
                          <CandidateEdit candidate={candidate}/>
                          <CandidateRemove candidate={candidate}/>
                        </TableCell>
                      </TableRow>
                  )
                })
              }
            </TableBody>
          </Table>
          <div className="hidden md:block ml-2">
            <CandidateAdd text="Kandidat hinzufügen" variant="ghost" radius="sm"/>
          </div>
        </div>
      </div>
  )
}