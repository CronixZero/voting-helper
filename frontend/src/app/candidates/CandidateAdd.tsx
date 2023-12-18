import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure
} from "@nextui-org/react";
import {useDispatch, useSelector} from "react-redux";
import {Candidate} from "@/app/models";
import {RootState} from "@/app/store";
// @ts-ignore
import {v4 as uuidv4} from "uuid";
import {setCandidates} from "@/app/candidates/candidatesSlice";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import React from "react";
import {Plus, PlusSquare} from "lucide-react";

export function CandidateAdd(props: Readonly<{
  text: string,
  radius: "none" | "sm" | "md" | "lg" | "full" | undefined
}>) {
  const {text, radius} = props;
  const iconOnly = text === "";
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const candidates: Candidate[] = useSelector((state: RootState) => state.candidates);
  const dispatch = useDispatch();
  const [name, setName] = React.useState<string | null>(null);
  const nameRef = React.useRef<HTMLInputElement>(null);
  const [firstName, setFirstName] = React.useState<string | null>(null);

  function addCandidate() {
    const newCandidate: Candidate = {
      id: uuidv4(),
      name: name!,
      firstName: firstName!,
      votes: []
    }
    dispatch(setCandidates([...candidates, newCandidate].toSorted(function (a, b) {
      return a.name.localeCompare(b.name);
    })));
  }

  function submit(onClose: () => void) {
    if (!name || !firstName || name === "" || firstName === "") {
      return;
    }

    addCandidate();
    setName(null);
    setFirstName(null);
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
                  <ModalHeader>Kandidaten hinzufügen</ModalHeader>
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
                    <Button onClick={() => {
                      setName(null);
                      setFirstName(null);
                      onClose();
                    }}>Abbrechen</Button>
                    <Button type="submit" color="success"
                            isDisabled={!name || !firstName || name === "" || firstName === ""}
                            onClick={() => submit(onClose)}>
                      Speichern
                    </Button>
                  </ModalFooter>
                </div>
            )}
          </ModalContent>
        </Modal>
        <Button onClick={onOpen} isIconOnly={iconOnly} radius={radius} color="success"
                variant="ghost">
          {text}
          <Plus/>
        </Button>
      </div>
  )
}