import {
  Button,
  Modal,
  ModalBody,
  ModalContent, ModalFooter,
  ModalHeader,
  useDisclosure
} from "@nextui-org/react";
import {useIsMobile} from "@nextui-org/use-is-mobile";
import {Plus} from "lucide-react";
import React, {useState} from "react";
import {Candidate} from "@/app/models";
import {useSelector} from "react-redux";
import {RootState} from "@/app/store";
import {Paper} from "@mui/material";
import {
  Sheet, SheetClose,
  SheetContent, SheetDescription, SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/app/components/ui/sheet";

export function VoteBallotAdd() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const candidates: Candidate[] = useSelector((state: RootState) => state.candidates.candidates);
  const [candidateVotes, setCandidateVotes]
      = useState(new Map<string, number>());

  function openModal() {

  }

  function isBallotValid() {
    return candidateVotes.size === candidates.length;

  }

  function submit(onClose: () => void, openAgain: boolean = false) {
    if (!isBallotValid()) {
      return;
    }

    onClose();

    if (openAgain) {
      onOpen();
    }
  }

  return (
      <div>
        <Sheet>
          <SheetTrigger asChild>
            <Button className="fixed right-0 bottom-0 m-3 z-[1]"
                    isIconOnly={useIsMobile()}
                    color="success"
                    variant="solid"
                    size={useIsMobile() ? undefined : "lg"}
                    radius={useIsMobile() ? "lg" : "sm"}>
              {useIsMobile() ? "" : "Stimme hinzufügen"}
              <Plus size={30}/>
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Stimme hinzufügen</SheetTitle>
              <SheetDescription>Füge einen Stimmzettel hinzu</SheetDescription>
            </SheetHeader>
            <div className="py-4">
              <h1>Hello World!</h1>
            </div>
            <SheetFooter className="self-end gap-y-2">
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
        <div className="hidden">
          <Modal isOpen={isOpen} placement="top" onOpenChange={onOpenChange} backdrop="blur">
            <ModalContent>
              {(onClose) => (
                  <div>
                    <ModalHeader>Stimme hinzufügen</ModalHeader>
                    <ModalBody>
                      {/* Slider + Select Menu for each Candidate on Mobile and another way for Desktop */}
                    </ModalBody>
                    <ModalFooter>
                      <Button color="danger" onClick={onClose}>
                        Abbrechen
                      </Button>
                      <Button color="success"
                              isDisabled={!isBallotValid()}
                              onClick={() => submit(onClose)}>
                        Speichern
                      </Button>
                      <Button color="success"
                              isDisabled={!isBallotValid()}
                              onClick={() => submit(onClose, true)}>
                        Speichern ...
                      </Button>
                    </ModalFooter>
                  </div>
              )}
            </ModalContent>
          </Modal>
          <div className="fixed right-0 bottom-0 m-3 z-[1]">
            <Button isIconOnly={useIsMobile()}
                    color="success"
                    variant="solid"
                    size={useIsMobile() ? undefined : "lg"}
                    radius={useIsMobile() ? "lg" : "sm"}
                    onClick={onOpen}>
              {useIsMobile() ? "" : "Stimme hinzufügen"}
              <Plus size={30}/>
            </Button>
          </div>
        </div>
      </div>
  )
}