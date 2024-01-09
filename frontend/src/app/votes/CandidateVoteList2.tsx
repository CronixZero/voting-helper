import {Card, CardBody, CardHeader} from "@nextui-org/react";
import {Candidate} from "@/app/models";
import {CountedVoteBallot} from "@/app/votes/CountedVoteBallot";

export function CandidateVoteList2(props: Readonly<{ candidate: Candidate }>) {
  const {candidate} = props;

  function getVoteCount(rating: number) {
    return candidate.votes.filter(vote => vote === rating).length;
  }

  return (
      <div>
        <Card className="max-w-screen-sm min-w-full">
          <CardHeader>
            <div className="flex justify-center">
              <span className="text-2xl">{candidate.name + ", " + candidate.firstName}</span>
            </div>
          </CardHeader>
          <CardBody className="flex justify-center">
            <div className="grid grid-rows-2 grid-flow-col gap-2 justify-center">
              <CountedVoteBallot rating={0} count={getVoteCount(0)}/>
              <CountedVoteBallot rating={1} count={getVoteCount(1)}/>
              <CountedVoteBallot rating={2} count={getVoteCount(2)}/>
              <CountedVoteBallot rating={3} count={getVoteCount(3)}/>
              <CountedVoteBallot rating={4} count={getVoteCount(4)}/>
              <CountedVoteBallot rating={5} count={getVoteCount(5)}/>
            </div>
          </CardBody>
        </Card>
      </div>
  )
}