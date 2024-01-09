import {Card, CardBody} from "@nextui-org/react";
import React from "react";
import {toast} from "sonner";

export function CountedVoteBallot(props: Readonly<{ rating: number, count: number }>) {
  const {rating, count} = props;

  function getBackgroundColor() {
    if (rating === 0) {
      return "bg-emerald-400";
    } else if (rating === 1) {
      return "bg-emerald-500";
    } else if (rating === 2) {
      return "bg-emerald-600";
    } else if (rating === 3) {
      return "bg-emerald-700";
    } else if (rating === 4) {
      return "bg-emerald-800";
    } else if (rating === 5) {
      return "bg-emerald-900";
    }
  }

  function onClick() {
    toast.info("Clicked on " + rating);
  }

  return (
      <div>
        <Card isPressable isFooterBlurred onClick={onClick}
              className={getBackgroundColor() + " flex w-24 h-24 justify-center content-center"}>
          <CardBody className="grid grid-cols-1 grid-rows-5">
            <div className="row-span-4 flex place-items-center place-content-center">
              <span className="text-2xl">{rating}</span>
            </div>
            <div className="row-span-1 flex place-content-end">
              <span className="text-sm text-background">{count}x</span>
            </div>
          </CardBody>
        </Card>
      </div>
  )
}