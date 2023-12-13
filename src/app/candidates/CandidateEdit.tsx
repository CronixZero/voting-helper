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
import {Candidate} from "@/app/models";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/app/store";
import {setCandidates} from "@/app/candidates/candidatesSlice";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";

export function CandidateEdit(props: Readonly<{ candidate: Candidate }>) {
  const {candidate} = props;
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  const candidates: Candidate[] = useSelector((state: RootState) => state.candidates);
  const dispatch = useDispatch();

  const [name, setName] = React.useState<null | string>(candidate.name ?? null);
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
  }

  function getErrorMessage(value: string | null, errorMessage: string): string | undefined {
    if (value === "") {
      return errorMessage;
    }
    return undefined;
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
                           label="Name"
                           placeholder="Nachname des Kandidaten oder der Kandidatin"
                           variant="bordered"
                           isInvalid={name === ""}
                           errorMessage={getErrorMessage(name, "Ein Nachname muss angegeben werden.")}
                           value={name ?? ""}
                           onValueChange={setName}/>
                    <Input autoFocus
                           isRequired
                           label="Vorname"
                           placeholder="Alle Vornamen des Kandidaten oder der Kandidatin"
                           variant="bordered"
                           isInvalid={firstName === ""}
                           errorMessage={getErrorMessage(firstName, "Ein Vorname muss angegeben werden.")}
                           value={firstName ?? ""}
                           onValueChange={setFirstName}/>
                  </ModalBody>
                  <ModalFooter>
                    <Button onClick={onClose}>Abbrechen</Button>
                    <Button type="submit" color="success"
                            onClick={() => {
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
        <Tooltip color="secondary" content="Kandidaten editieren">
                          <span className="text-lg text-secondary cursor-pointer active:opacity-50"
                                onClick={onOpen}>
                            <DriveFileRenameOutlineOutlinedIcon/>
                          </span>
        </Tooltip>
      </div>
  )
}