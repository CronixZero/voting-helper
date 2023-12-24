import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tooltip,
  useDisclosure
} from "@nextui-org/react";
import React from "react";
import {Candidate, CandidateEditMessage} from "@/app/models";
import {useDispatch, useSelector} from "react-redux";
import {setCandidates} from "@/app/store/slices/candidatesSlice";
import {Settings2} from "lucide-react";
import {RootState} from "@/app/store";
import {toast} from "sonner";

export function CandidateEdit(props: Readonly<{ candidate: Candidate }>) {
  const {candidate} = props;
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  const candidates: Candidate[] = useSelector((state: RootState) => state.candidates.candidates);
  const dispatch = useDispatch();

  const [name, setName] = React.useState<null | string>(candidate.name ?? null);
  const nameRef = React.useRef<HTMLInputElement>(null);
  const [firstName, setFirstName] = React.useState<null | string>(candidate.firstName ?? null);

  function editCandidate() {
    dispatch(setCandidates(candidates.map(mapCandidate => {
      if (mapCandidate.id === candidate.id) {
        return {
          ...mapCandidate,
          name: name!,
          firstName: firstName!
        }
      } else {
        return mapCandidate;
      }
    })));
    dispatch({
      type: "cloud/edit-candidate",
      payload: {
        candidateId: candidate.id,
        name: name!,
        firstName: firstName!
      } as CandidateEditMessage
    });

    toast.success(candidate.name + ", " + candidate.firstName + " wurde erfolgreich editiert");
  }

  function submit(onClose: () => void) {
    editCandidate();
    onClose();
  }

  function getErrorMessage(value: string | null, errorMessage: string): string | undefined {
    if (value === "") {
      return errorMessage;
    }
    return undefined;
  }

  function handleEnterKey(event: React.KeyboardEvent<HTMLInputElement>, onClose: () => void) {
    if (event.key !== "Enter") {
      return;
    }

    submit(onClose);
  }

  return (
      <div>
        <Modal isOpen={isOpen} placement="top" onOpenChange={onOpenChange} backdrop="blur">
          <ModalContent>
            {(onClose) => (
                <div>
                  <ModalHeader>Kandidaten editieren</ModalHeader>
                  <ModalBody>
                    <Input autoFocus
                           isRequired
                           label="Vorname"
                           placeholder="Alle Vornamen des Kandidaten oder der Kandidatin"
                           variant="bordered"
                           isInvalid={firstName === ""}
                           errorMessage={getErrorMessage(firstName, "Ein Vorname muss angegeben werden.")}
                           value={firstName ?? ""}
                           onValueChange={setFirstName}
                           onKeyDown={e => {
                             if (e.key !== "Enter") {
                               return;
                             }

                             nameRef.current?.focus();
                           }}/>
                    <Input isRequired
                           label="Name"
                           placeholder="Nachname des Kandidaten oder der Kandidatin"
                           variant="bordered"
                           ref={nameRef}
                           isInvalid={name === ""}
                           errorMessage={getErrorMessage(name, "Ein Nachname muss angegeben werden.")}
                           value={name ?? ""}
                           onValueChange={setName}
                           onKeyDown={e => handleEnterKey(e, onClose)}/>
                  </ModalBody>
                  <ModalFooter>
                    <Button onClick={onClose}>Abbrechen</Button>
                    <Button type="submit" color="success"
                            onClick={() => submit(onClose)}>
                      Speichern
                    </Button>
                  </ModalFooter>
                </div>
            )}
          </ModalContent>
        </Modal>
        <Tooltip color="primary" content="Kandidaten editieren">
                          <span className="text-lg text-primary cursor-pointer active:opacity-50"
                                onClick={onOpen}>
                            <Settings2/>
                          </span>
        </Tooltip>
      </div>
  )
}