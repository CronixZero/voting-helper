import {Button, Input} from "@nextui-org/react";
import {setAutoConnect, setSessionId} from "@/app/store/slices/cloudSlice";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/app/store";
import {useState} from "react";

export function SessionConnector() {
  const connected: boolean = useSelector((state: RootState) => state.cloud.connected);
  const sessionId: string = useSelector((state: RootState) => state.cloud.sessionId);
  const dispatch = useDispatch();
  const [sessionCode, setSessionCode] = useState<string | null>(sessionId ?? null);

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
      dispatch(setAutoConnect(false));
    } else {
      dispatch({type: "cloud/connect"});
      dispatch(setAutoConnect(true));
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      submitConnection();
    }
  }

  function handleButtonClick() {
    if(connected) {
      toggleConnection();
      return;
    }

    submitConnection();
  }

  function getErrorMessage(value: string | null, errorMessage: string): string | undefined {
    if (value === "") {
      return errorMessage;
    }
    return undefined;
  }

  return (
      <div className="flex gap-2 content-center">
        <Input radius="sm" size="sm" label="Sitzungscode eingeben" className="basis-3/5"
               onKeyDown={e => onKeyDown(e)}
               isDisabled={connected}
               isInvalid={sessionCode === ""}
               value={sessionCode!}
               onValueChange={setSessionCode}
               errorMessage={getErrorMessage(sessionCode, "Der Sitzungscode darf nicht leer sein")}/>
        <Button radius="sm" size="lg" color={connected ? "danger" : "success"}
                className="basis-2/5"
                onClick={handleButtonClick}>
          {connected ? "Verbindung trennen" : "Verbinden"}
        </Button>
      </div>
  )
}