import {Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from "@nextui-org/react";
import {setAutoConnect, setSessionId} from "@/app/store/slices/cloudSlice";
import {setCandidates} from "@/app/store/slices/candidatesSlice";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/app/store";
import {toast} from "sonner";

export function ConnectionConfirmationDialog(props: Readonly<{
  setPopoverOpen: (open: boolean) => void,
  isOpen: boolean,
  onOpenChange: (open: boolean) => void,
  sessionCode: string | null
}>) {
  const {setPopoverOpen, isOpen, onOpenChange, sessionCode} = props;
  const connected: boolean = useSelector((state: RootState) => state.cloud.connected);
  const dispatch = useDispatch();

  function submitConnection() {
    if (sessionCode === null || sessionCode === "") {
      return;
    }

    dispatch(setSessionId(sessionCode));
    toggleConnection();
  }

  function toggleConnection() {
    if (connected) {
      dispatch({type: "cloud/disconnect"});
      dispatch(setCandidates([]));
      dispatch(setAutoConnect(false));
    } else {
      dispatch({type: "cloud/connect"});
      dispatch(setAutoConnect(true));
    }
  }

  function handleModalContinue(onClose: () => void) {
    if (connected) {
      toggleConnection();
      onClose();
      setPopoverOpen(true);
      return;
    }

    submitConnection();
    onClose();
    setPopoverOpen(true);

    if (connected) {
      toast.success("Erfolgreich verbunden");
    }
  }

  return (
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur" placement="top">
        <ModalContent>
          {(onClose) => (
              <div>
                <ModalHeader>
                  <p>Möchtest du wirklich fortfahren?</p>
                </ModalHeader>
                <ModalBody>
                  <p>Wenn du fortfährst, werden deine lokalen Änderungen überschrieben.</p>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" onClick={() => handleModalContinue(onClose)}>
                    <p>Fortfahren</p>
                  </Button>
                  <Button color="default" onClick={onClose}>
                    <p>Abbrechen</p>
                  </Button>
                </ModalFooter>
              </div>
          )}
        </ModalContent>
      </Modal>
  );
}