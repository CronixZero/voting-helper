import {Button, Card, CardBody, CardFooter, Slider} from "@nextui-org/react";
import {Eye, Settings2, Trash} from "lucide-react";
import React from "react";

export function VoteBallot(props: Readonly<{ rating: number }>) {
  const {rating} = props;

  return (
      <div>
        <div className="flex gap-3 justify-between">
          <Slider
              showOutline
              showSteps
              size="md"
              step={1}
              color="primary"
              maxValue={5}
              minValue={0}
              value={rating}
          />
          <div className="flex gap-2">
            <Button isIconOnly variant="ghost" color="primary">
              <Settings2/>
            </Button>
            <Button isIconOnly variant="ghost" color="danger">
              <Trash/>
            </Button>
          </div>
        </div>
        <Card isFooterBlurred className="hidden max-w-sm max-h-xl">
          <CardBody>
            <span></span>
          </CardBody>
          <CardFooter className="flex justify-end">
            <div className="flex gap-2">
              <Button isIconOnly variant="ghost" color="primary">
                <Eye/>
              </Button>
              <Button isIconOnly variant="ghost" color="primary">
                <Settings2/>
              </Button>
              <Button isIconOnly variant="ghost" color="danger">
                <Trash/>
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
  )
}