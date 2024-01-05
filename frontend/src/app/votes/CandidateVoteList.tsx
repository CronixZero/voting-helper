import {Candidate} from "@/app/models";
import {useMemo, useState} from "react";
import {VoteBallot} from "@/app/votes/VoteBallot";
import {Button, Pagination} from "@nextui-org/react";
import {setCandidates} from "@/app/store/slices/candidatesSlice";
import {toast} from "sonner";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/app/store";
import {useIsMobile} from "@nextui-org/use-is-mobile";

export function CandidateVoteList(props: Readonly<{
  candidate: Candidate
}>) {
  const candidates: Candidate[] = useSelector((state: RootState) => state.candidates.candidates);
  const dispatch = useDispatch();

  const {candidate} = props;
  const votesPerPage = useIsMobile() ? 24 : 50;

  const votes = candidate.votes;
  const [page, setPage] = useState(1);
  const pages = Math.ceil(props.candidate.votes.length / votesPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * votesPerPage;
    const end = start + votesPerPage;

    return votes.slice(start, end);
  }, [page, votes]);

  function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

  function addNewRandomVote(candidate: Candidate) {
    dispatch(setCandidates(candidates.map(mapCandidate => {
      if (mapCandidate.id === candidate.id) {
        return {
          ...mapCandidate,
          votes: [...mapCandidate.votes, getRandomInt(6)]
          .toSorted((a, b) => (a - b))
        }
      } else {
        return mapCandidate;
      }
    })));
    toast.success("Neue Stimme wurde hinzugefügt.");
  }

  return (
      <div>
        <div className={"flex flex-wrap gap-2 justify-center"}>
          {items.map((vote, index) => {
            return (
                <div key={index} className="justify-self-start">
                  <VoteBallot rating={vote}/>
                </div>
            )
          })}
        </div>
        <div className="flex justify-center md:justify-end gap-3 mt-4">
          <Pagination className="m-0 p-0" isCompact showControls total={pages}
                      onChange={setPage} page={page} initialPage={1}
                      size={useIsMobile() ? "sm" : "lg"}/>
          <Button onClick={() => addNewRandomVote(candidate)}>
            Add Vote
          </Button>
        </div>
      </div>
  )
}