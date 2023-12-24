import {Middleware} from "redux";
import {RootState} from "@/app/store";
import {Client} from "@stomp/stompjs";
import {setAutoConnect, setConnected} from "@/app/store/slices/cloudSlice";
import {setCandidates} from "@/app/store/slices/candidatesSlice";
import {Candidate} from "@/app/models";
import {toast} from "sonner";
import {BASE_URL} from "@/app/constants";
import {HttpError} from "@/app/errors/HttpException";

export class CloudMiddleware {
  private client;
  public cloudMiddleware: Middleware<{}, RootState>;

  constructor(client: Client) {
    this.client = client;

    client.onWebSocketError = (error) => {
      console.error('Error with websocket', error);
    };

    client.onStompError = (frame) => {
      console.error('Broker reported error: ' + frame.headers['message']);
      console.error('Additional details: ' + frame.body);
    };

    this.cloudMiddleware = storeApi => next => action => {
      const dispatch = storeApi.dispatch

      client.onConnect = (frame) => {
        dispatch(setConnected(true));
        const sessionId = storeApi.getState().cloud.sessionId;

        fetch(BASE_URL + `/api/candidates/${sessionId}`)
        .then(response => {
          if (!response.ok) {
            throw new HttpError("Could not complete GET Candidates", response.status);
          }

          return response.json();
        })
        .then(data => {
          dispatch(setCandidates(data));
        }).catch((error) => {
          if (error.status === 400) {
            toast.error("Die Sitzung konnte nicht gefunden werden")
          } else {
            toast.error("Ein unbekannter Fehler ist beim Aufbauen der Verbindung aufgetreten");
          }

          dispatch(setConnected(false));
          dispatch(setAutoConnect(false));
          client.deactivate();
        });

        if (!client.connected) {
          return;
        }

        client.subscribe(`/topic/candidates/${sessionId}`, (message) => {
          const state = storeApi.getState();

          const oldCandidates = state.candidates.candidates
          const newCandidates = JSON.parse(message.body)

          console.log("oldCandidates", oldCandidates, "newCandidates", newCandidates);

          this.sendToastsForDifferences(oldCandidates, newCandidates);
          dispatch(setCandidates(newCandidates));
        });
      }

      client.onDisconnect = (frame) => {
        dispatch(setConnected(false));
      }

      const sessionId = storeApi.getState().cloud.sessionId;

      // @ts-ignore
      switch (action.type) {
        case "cloud/connect":
          if (client.connected) {
            dispatch(setConnected(true));
            return;
          }

          client.activate();
          break;

        case "cloud/disconnect":
          if (!client.connected) {
            dispatch(setConnected(false));
            return;
          }

          client.deactivate()
          .then(() => {
          });
          break;

        case "cloud/add-candidate":
          if (!client.connected) {
            return;
          }

          client.publish({
            destination: `/app/candidates/add/${sessionId}`,
            // @ts-ignore
            body: JSON.stringify(action.payload)
          })
          break;

        case "cloud/edit-candidate":
          if (!client.connected) {
            return;
          }

          client.publish({
            destination: `/app/candidates/edit/${sessionId}`,
            // @ts-ignore
            body: JSON.stringify(action.payload)
          })
          break;

        case "cloud/remove-candidate":
          if (!client.connected) {
            return;
          }

          client.publish({
            destination: `/app/candidates/remove/${sessionId}`,
            // @ts-ignore
            body: JSON.stringify(action.payload)
          })
          break;

        default:
          break;
      }

      return next(action);
    }
  }

  private sendToastsForDifferences(candidatesA: Candidate[], candidatesB: Candidate[]) {

    // Check whether a Candidate was edited
    const differenceEdit: Candidate[] = candidatesA.filter((oldCandidate: Candidate) => {
      return candidatesB.some((newCandidate: Candidate) => {
        if (newCandidate.id !== oldCandidate.id) {
          return false;
        }

        return newCandidate.name !== oldCandidate.name
            || newCandidate.firstName !== oldCandidate.firstName
      });
    });

    if (differenceEdit.length >= 1) {
      for (const differentCandidate of differenceEdit) {
        toast.info("Sync: "
            + differentCandidate.name + ", " + differentCandidate.firstName
            + " wurde bearbeitet");
      }
    }

    // Check whether a Candidate was added
    const differenceAdd: Candidate[] = candidatesB.filter((newCandidate: Candidate) => {
      return !candidatesA.some((oldCandidate) => {
        return oldCandidate.id === newCandidate.id
      });
    });

    if (differenceAdd.length >= 1) {
      for (const differentCandidate of differenceAdd) {
        toast.info("Sync: "
            + differentCandidate.name + ", " + differentCandidate.firstName
            + " wurde hinzugefügt");
      }
    }

    // Check whether a Candidate was removed
    const differenceRemove: Candidate[] = candidatesA.filter((oldCandidate: Candidate) => {
      return !candidatesB.some((newCandidate: Candidate) => {
        return newCandidate.id === oldCandidate.id
      });
    });

    if (differenceRemove.length >= 1) {
      for (const differentCandidate of differenceRemove) {
        toast.error("Sync: "
            + differentCandidate.name + ", " + differentCandidate.firstName
            + " wurde entfernt");
      }
    }
  }
}