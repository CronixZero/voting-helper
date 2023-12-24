import {Button, Input} from "@nextui-org/react";
import {setAutoConnect, setSessionId} from "@/app/store/slices/cloudSlice";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/app/store";
import {useState} from "react";
import {toast} from "sonner";
import {BASE_URL} from "@/app/constants";
import {Candidate, SessionCreateDto} from "@/app/models";
import {useIsMobile} from "@nextui-org/use-is-mobile";

export function SessionCreator() {
  const connected: boolean = useSelector((state: RootState) => state.cloud.connected);
  const candidates: Candidate[] = useSelector((state: RootState) => state.candidates.candidates);
  const dispatch = useDispatch();
  const [sessionCode, setSessionCode] = useState<string | null>(null);

  function createSessionAndConnect() {
    if (sessionCode === null || sessionCode === "" || connected) {
      return;
    }

    const sessionCreateDto: SessionCreateDto = {
      initialState: candidates
    }

    fetch(BASE_URL + `/api/sessions/create/${sessionCode}`, {
      method: "POST",
      body: JSON.stringify(sessionCreateDto),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(response => {
      if (!response.ok) {
        if (response.status === 409) {
          toast.error("Diese Sitzung existiert bereits");
        } else {
          toast.error("Sitzung konnte nicht erstellt werden");
        }
        return;
      }

      dispatch(setSessionId(sessionCode));

      dispatch({type: "cloud/connect"});
      dispatch(setAutoConnect(true));
      toast.info("Sitzung erfolgreich erstellt")
    });
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      createSessionAndConnect();
    }
  }

  function getErrorMessage(value: string | null, errorMessage: string): string | undefined {
    if (value === "") {
      return errorMessage;
    }
    return undefined;
  }

  return (
      <div className="flex gap-2 content-center">
        <Input radius="sm" size="sm"
               label={useIsMobile() ? "Sitzungscode" : "Sitzungscode eingeben"}
               className="basis-3/5"
               onKeyDown={e => onKeyDown(e)}
               isDisabled={connected}
               isInvalid={sessionCode === ""}
               value={sessionCode ?? ""}
               onValueChange={setSessionCode}
               errorMessage={getErrorMessage(sessionCode, "Der Sitzungscode darf nicht leer sein")}/>
        <Button radius="sm" size="lg" color="primary"
                className="basis-2/5"
                onClick={createSessionAndConnect}
                isDisabled={connected}>
          <p className="hidden md:flex">Sitzung erstellen</p>
          <p className="flex md:hidden">Erstellen</p>
        </Button>
      </div>
  )
}