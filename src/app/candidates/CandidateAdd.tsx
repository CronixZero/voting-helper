import {Button} from "@nextui-org/react";
import {useDispatch, useSelector} from "react-redux";
import {Candidate} from "@/app/models";
import {RootState} from "@/app/store";
// @ts-ignore
import {v4 as uuidv4} from "uuid";
import {setCandidates} from "@/app/candidates/candidatesSlice";

export function CandidateAdd() {
  const candidates: Candidate[] = useSelector((state: RootState) => state.candidates);
  const dispatch = useDispatch();
  const newCandidate = {
    id: uuidv4(),
    name: "A",
    firstName: "B",
    votes: [0]
  } as Candidate;

  function addCandidate() {
    dispatch(setCandidates([...candidates, newCandidate]));
  }

  return (
      <div>
        <Button onClick={addCandidate}>Add Candidate</Button>
      </div>
  )
}