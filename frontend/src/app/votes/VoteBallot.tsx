import {Card, CardBody} from "@nextui-org/react";
import React from "react";
import {toast} from "sonner";

export function VoteBallot(props: Readonly<{ rating: number }>) {
  const {rating} = props;

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
        <Card isPressable onClick={onClick}
              className={getBackgroundColor() + " flex w-20 h-20 justify-center content-center"}>
          <CardBody className="flex justify-center items-center mx-auto">
            <span className="text-2xl">{rating}</span>
          </CardBody>
        </Card>
      </div>
  )
}