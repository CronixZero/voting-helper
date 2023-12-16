import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tooltip,
  useDisclosure
} from "@nextui-org/react";
import {Candidate} from "@/app/models";
import {setCandidates} from "@/app/candidates/candidatesSlice";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/app/store";
import React from "react";
import {Trash} from "lucide-react";

export function CandidateDelete(props: Readonly<{ candidate: Candidate }>) {
  const {candidate} = props;
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const candidates: Candidate[] = useSelector((state: RootState) => state.candidates);
  const dispatch = useDispatch();

  function deleteCandidate() {
    dispatch(setCandidates(candidates.filter(filterCandidate => filterCandidate.id !== candidate.id)));
  }

  return (
      <div>
        <Modal isOpen={isOpen} placement="top" onOpenChange={onOpenChange} backdrop="blur">
          <ModalContent>
            {(onClose) => (
                <div>
                  <ModalHeader>Kandidaten entfernen?</ModalHeader>
                  <ModalBody>
                    <span>
                      Möchtest du den Kandidaten <b>{candidate.name}, {candidate.firstName}</b> wirklich entfernen?
                    </span>
                  </ModalBody>
                  <ModalFooter>
                    <Button onClick={onClose}>Abbrechen</Button>
                    <Button type="submit" color="danger"
                            onClick={() => {
                              deleteCandidate();
                              onClose();
                            }}>
                      Entfernen
                    </Button>
                  </ModalFooter>
                </div>
            )}
          </ModalContent>
        </Modal>
        <Tooltip color="danger" content="Kandidaten entfernen">
              <span className="text-lg text-danger cursor-pointer active:opacity-50"
                    onClick={onOpen}>
            <Trash/>
          </span>
        </Tooltip>
      </div>
  )
}