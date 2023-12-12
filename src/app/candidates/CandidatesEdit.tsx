import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader
} from "@nextui-org/react";
import React, {useState} from "react";
import {Candidate} from "@/app/models";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/app/store";
import {setCandidates} from "@/app/candidates/candidatesSlice";

export function CandidatesEdit(props: Readonly<{
  isOpen: boolean,
  onOpenChange: (isOpenChange: boolean) => void,
  candidate: Candidate
}>) {
  const {isOpen, onOpenChange, candidate} = props;
  const candidates: Candidate[] = useSelector((state: RootState) => state.candidates);
  const dispatch = useDispatch();

  const [name, setName] = React.useState("");
  if (candidate.name)
    setName(candidate.name);
  const [firstName, setFirstName] = React.useState("");
  if (candidate.firstName)
    setFirstName(candidate.firstName);

  const [errorName, setErrorName] = useState("");
  const [errorFirstName, setErrorFirstName] = useState("");

  function editCandidate() {
    dispatch(setCandidates(candidates.map(mapCandidate => {
      if (mapCandidate.id === candidate.id) {
        return {
          ...mapCandidate,
          name: name,
          firstName: firstName
        }
      } else {
        return mapCandidate;
      }
    })));
  }

  return (
      <div>
        <Modal isOpen={isOpen} placement="center" onOpenChange={onOpenChange} backdrop="opaque">
          <ModalContent>
            {(onClose) => (
                <div>
                  <ModalHeader>Kandidaten editieren</ModalHeader>
                  <ModalBody>
                    <Input autoFocus
                           isRequired
                           label="Name"
                           placeholder="Nachname des Kandidaten oder der Kandidatin"
                           variant="bordered"
                           isInvalid={errorName !== ""}
                           errorMessage={errorName}
                           value={name}
                           onValueChange={setName}/>
                    <Input autoFocus
                           isRequired
                           label="Vorname"
                           placeholder="Alle Vornamen des Kandidaten oder der Kandidatin"
                           variant="bordered"
                           isInvalid={errorFirstName !== ""}
                           errorMessage={errorFirstName}
                           value={firstName}
                           onValueChange={setFirstName}/>
                  </ModalBody>
                  <ModalFooter>
                    <Button onClick={onClose}>Abbrechen</Button>
                    <Button type="submit" color="success"
                            onClick={() => {
                              if (name === "" || firstName === "") {
                                if (name === "")
                                  setErrorName("Bitte gebe einen Nachnamen ein.");
                                if (firstName === "")
                                  setErrorFirstName("Bitte gebe einen Vornamen ein.");
                                return;
                              }

                              editCandidate();
                              onClose();
                            }}>
                      Speichern
                    </Button>
                  </ModalFooter>
                </div>
            )}
          </ModalContent>
        </Modal>
      </div>
  )
}