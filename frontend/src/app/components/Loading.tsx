import {Modal, ModalBody, ModalContent, ModalHeader} from "@nextui-org/react";
import {PacmanLoader} from "react-spinners";

export function Loading() {
  return (
      <div>
        <Modal backdrop="blur" isOpen={true} isDismissable={false}>
          <ModalContent>
            <ModalHeader>Loading</ModalHeader>
            <ModalBody>
              <PacmanLoader color={"#08d1ce"}/>
            </ModalBody>
          </ModalContent>
        </Modal>
      </div>
  )
}