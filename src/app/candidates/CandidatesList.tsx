"use client"

import {RootState} from "@/app/store";
import {useDispatch, useSelector} from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
  useDisclosure
} from "@nextui-org/react";
import {setCandidates} from "@/app/candidates/candidatesSlice";
import {Candidate} from "@/app/models";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import {CandidatesEdit} from "@/app/candidates/CandidatesEdit";
import {useState} from "react";

export function CandidatesList() {
  const candidates: Candidate[] = useSelector((state: RootState) => state.candidates);
  const dispatch = useDispatch();
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [currentCandidate, setCurrentCandidate] = useState({} as Candidate);

  function deleteCandidate(candidate: Candidate) {
    dispatch(setCandidates(candidates.filter(filterCandidate => filterCandidate.id !== candidate.id)));
  }

  return (
      <div>
        <CandidatesEdit isOpen={isOpen} onOpenChange={onOpenChange} candidate={currentCandidate}/>
        <Table removeWrapper aria-label="List of Candidates">
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
                      <TableCell>
                        <Tooltip color="secondary" content="Kandidaten editieren">
                          <span className="text-lg text-secondary cursor-pointer active:opacity-50"
                                onClick={() => {
                                  setCurrentCandidate(candidate); // Todo: This is stateful, which causes reload when updated
                                  onOpen();
                                }}>
                            <DriveFileRenameOutlineOutlinedIcon/>
                          </span>
                        </Tooltip>
                        <Tooltip color="danger" content="Kandidaten entfernen">
                          <span className="text-lg text-danger cursor-pointer active:opacity-50"
                                onClick={() => deleteCandidate(candidate)}> {/*TODO: Confirmation*/}
                            <DeleteOutlinedIcon/>
                          </span>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                )
              })
            }
          </TableBody>
        </Table>
      </div>
  )
}