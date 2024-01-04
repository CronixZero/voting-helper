import {Button, Input} from "@nextui-org/react";
import {setSessionId} from "@/app/store/slices/cloudSlice";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/app/store";
import {useState} from "react";
import {useIsMobile} from "@nextui-org/use-is-mobile";
import {Candidate} from "@/app/models";
import {cloudConnect, cloudDisconnect} from "@/app/store/middleware/cloud";

export function SessionConnector(props: Readonly<{
  setConfirmationDialogOpen: (open: boolean) => void,
  setPopoverOpen: (open: boolean) => void,
  setConfirmationSessionCode: (sessionCode: string | null) => void
}>) {
  const {setConfirmationDialogOpen, setPopoverOpen, setConfirmationSessionCode} = props;
  const connected: boolean = useSelector((state: RootState) => state.cloud.connected);
  const sessionId: string = useSelector((state: RootState) => state.cloud.sessionId);
  const candidates: Candidate[] = useSelector((state: RootState) => state.candidates.candidates);
  const dispatch = useDispatch();
  const [sessionCode, setSessionCode] = useState<string | null>(sessionId ?? null);
  setConfirmationSessionCode(sessionCode);

  function submitConnection() {
    if (sessionCode === null || sessionCode === "") {
      return;
    }

    dispatch(setSessionId(sessionCode));
    dispatch(cloudConnect());
  }

  function disconnect() {
    dispatch(cloudDisconnect());
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      submitConnection();
    }
  }

  function handleButtonClick() {
    if (sessionCode === null || sessionCode === "") {
      return;
    }

    if (!connected && candidates.length >= 1) {
      setPopoverOpen(false);
      setConfirmationDialogOpen(true);
      return;
    }

    if (connected) {
      disconnect();
    } else {
      submitConnection();
    }

  }

  function getErrorMessage(value: string | null, errorMessage: string): string | undefined {
    if (value === "") {
      return errorMessage;
    }
    return undefined;
  }

  function updateSessionCode(sessionCode: string) {
    setSessionCode(sessionCode);
    setConfirmationSessionCode(sessionCode);
  }

  return (
      <div>
        <div className="flex gap-2 content-center">
          <Input radius="sm" size="sm"
                 label={useIsMobile() ? "Sitzungscode" : "Sitzungscode eingeben"}
                 className="basis-3/5"
                 onKeyDown={e => onKeyDown(e)}
                 isDisabled={connected}
                 isInvalid={sessionCode === ""}
                 value={sessionCode!}
                 onValueChange={updateSessionCode}
                 errorMessage={getErrorMessage(sessionCode, "Der Sitzungscode darf nicht leer sein")}/>
          <Button radius="sm" size="lg" color={connected ? "danger" : "success"}
                  className="basis-2/5"
                  onClick={handleButtonClick}
                  isDisabled={sessionCode === "" || sessionCode === null}>
            <p className="hidden md:flex">{connected ? "Verbindung trennen" : "Verbinden"}</p>
            <p className="flex md:hidden">{connected ? "Trennen" : "Verbinden"}</p>
          </Button>
        </div>
      </div>
  )
}