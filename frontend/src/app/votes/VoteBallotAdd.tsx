import {Button, Slider} from "@nextui-org/react";
import {useIsMobile} from "@nextui-org/use-is-mobile";
import {Plus} from "lucide-react";
import React, {useEffect, useState} from "react";
import {Candidate} from "@/app/models";
import {useSelector} from "react-redux";
import {RootState} from "@/app/store";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/app/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/app/components/ui/select";

export function VoteBallotAdd() {
  const candidates: Candidate[] = useSelector((state: RootState) => state.candidates.candidates);
  const [candidateVotes, setCandidateVotes]
      = useState(new Map<string, number>());
  const [sheetOpen, setSheetOpen] = useState(false)
  const [currentCandidate, setCurrentCandidate] = useState(candidates[0]);

  useEffect(() => {
    setCandidateVotes(new Map<string, number>());
  }, [sheetOpen]);

  function isBallotValid() {
    return candidateVotes.size === candidates.length;
  }

  function submit(onClose: () => void, openAgain: boolean = false) {
    if (!isBallotValid()) {
      return;
    }

    onClose();

    if (openAgain) {
      setSheetOpen(true);
    }
  }

  return (
      <div>
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger asChild>
            <Button className="fixed right-0 bottom-0 m-3 z-[1]"
                    isIconOnly={useIsMobile()}
                    color="success"
                    variant="solid"
                    size={useIsMobile() ? undefined : "lg"}
                    radius={useIsMobile() ? "lg" : "sm"}>
              {useIsMobile() ? "" : "Stimmen hinzufügen"}
              <Plus size={30}/>
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Stimme hinzufügen</SheetTitle>
              <SheetDescription>Füge einen Stimmzettel hinzu</SheetDescription>
            </SheetHeader>
            <div className="py-6">
              <div className="pb-3">
                <Select value={currentCandidate.id}
                        onValueChange={(value) => {
                          setCurrentCandidate(candidates.find(candidate => candidate.id === value)!);
                        }}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Kandidaten auswählen"/>
                  </SelectTrigger>
                  <SelectContent>
                    {candidates.map(candidate => {
                      return (
                          <SelectItem key={candidate.id} value={candidate.id}>
                            {candidate.name + ", " + candidate.firstName}
                          </SelectItem>
                      )
                    })}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Slider step={1}
                        value={candidateVotes.get(currentCandidate.id)}
                        onChange={(value) => {
                          if (typeof value !== "number") {
                            return;
                          }

                          setCandidateVotes(candidateVotes.set(currentCandidate.id, value));
                        }}
                        maxValue={5}
                        minValue={0}
                        showOutline
                        label={currentCandidate.name + ", " + currentCandidate.firstName}
                        marks={[
                          {value: 0, label: "0"},
                          {value: 1, label: "1"},
                          {value: 2, label: "2"},
                          {value: 3, label: "3"},
                          {value: 4, label: "4"},
                          {value: 5, label: "5"},
                        ]}
                        showSteps
                        defaultValue={0}/>
              </div>
            </div>
            <SheetFooter className="gap-y-2">
              <SheetClose asChild>
                <Button color="danger">
                  Abbrechen
                </Button>
              </SheetClose>
              <SheetClose asChild>
                <Button color="success"
                        isDisabled={!isBallotValid()}
                        onClick={() => submit(() => {
                        })}>
                  Speichern
                </Button>
              </SheetClose>
              <SheetClose asChild>
                <Button color="success"
                        isDisabled={!isBallotValid()}
                        onClick={() => submit(() => {
                        }, true)}>
                  Speichern ...
                </Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
  )
}