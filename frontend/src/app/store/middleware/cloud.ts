import {Action, Middleware} from "redux";
import {RootState} from "@/app/store";
import {Client} from "@stomp/stompjs";
import {setAutoConnect, setConnected} from "@/app/store/slices/cloudSlice";
import {setCandidates} from "@/app/store/slices/candidatesSlice";
import {
  Candidate,
  CandidateAddMessage,
  CandidateEditMessage,
  CandidateRemoveMessage
} from "@/app/models";
import {toast} from "sonner";
import {BASE_URL} from "@/app/constants";
import {HttpError} from "@/app/errors/HttpException";
import {PayloadAction} from "@reduxjs/toolkit";
import {historyAddHistoryEntry} from "@/app/store/middleware/changeHistory";
import {setHistory} from "@/app/store/slices/changeHistorySlice";

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
          if (!storeApi.getState().cloud.autoConnect) {
            dispatch(setAutoConnect(true));
          }
          break;

        case "cloud/disconnect":
          if (!client.connected) {
            dispatch(setConnected(false));
            return;
          }

          dispatch(setAutoConnect(false));
          client.deactivate()
          .then(() => {
            dispatch(setCandidates([]));
            dispatch(setHistory([{}]));
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
          });
          dispatch(historyAddHistoryEntry(({
            sessionId: sessionId,
            undo: () => {
              client.publish({
                destination: `/app/candidates/remove/${sessionId}`,
                // @ts-ignore
                body: JSON.stringify(action.payload)
              });
            },
            redo: () => {
              client.publish({
                destination: `/app/candidates/add/${sessionId}`,
                // @ts-ignore
                body: JSON.stringify(action.payload)
              })
            }
          })));
          break;

        case "cloud/edit-candidate":
          if (!client.connected) {
            return;
          }

          // @ts-ignore
          const candidateEditMessage: CandidateEditMessage = action.payload;
          const oldEditCandidate: Candidate = storeApi.getState().candidates.candidates.find((candidate: Candidate) => {
            return candidate.id === candidateEditMessage.candidateId;
          })!;

          client.publish({
            destination: `/app/candidates/edit/${sessionId}`,
            // @ts-ignore
            body: JSON.stringify(candidateEditMessage)
          });
          dispatch(historyAddHistoryEntry({
            sessionId: sessionId,
            undo: () => {
              client.publish({
                destination: `/app/candidates/edit/${sessionId}`,
                body: JSON.stringify({
                  candidateId: oldEditCandidate.id,
                  name: oldEditCandidate.name,
                  firstName: oldEditCandidate.firstName
                } as CandidateEditMessage)
              })
            },
            redo: () => {
              client.publish({
                destination: `/app/candidates/edit/${sessionId}`,
                // @ts-ignore
                body: JSON.stringify(candidateEditMessage)
              })
            }
          }));
          break;

        case "cloud/remove-candidate":
          if (!client.connected) {
            return;
          }

          // @ts-ignore
          const candidateRemoveMessage: CandidateRemoveMessage = action.payload;
          const oldRemoveCandidate: Candidate = storeApi.getState().candidates.candidates.find((candidate: Candidate) => {
            return candidate.id === candidateRemoveMessage.candidateId;
          })!;

          client.publish({
            destination: `/app/candidates/remove/${sessionId}`,
            // @ts-ignore
            body: JSON.stringify(action.payload)
          });
          dispatch(historyAddHistoryEntry({
            sessionId: sessionId,
            undo: () => {
              client.publish({
                destination: `/app/candidates/add/${sessionId}`,
                body: JSON.stringify({
                  candidateId: oldRemoveCandidate.id,
                  name: oldRemoveCandidate.name,
                  firstName: oldRemoveCandidate.firstName
                } as CandidateAddMessage)
              });
            },
            redo: () => {
              client.publish({
                destination: `/app/candidates/remove/${sessionId}`,
                // @ts-ignore
                body: JSON.stringify(action.payload)
              });
            }
          }));
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

// Action creators
function cloudAddCandidate(message: CandidateAddMessage): PayloadAction<CandidateAddMessage> {
  return {
    type: "cloud/add-candidate",
    payload: message
  }
}

function cloudEditCandidate(message: CandidateEditMessage): PayloadAction<CandidateEditMessage> {
  return {
    type: "cloud/edit-candidate",
    payload: message
  }
}

function cloudRemoveCandidate(message: CandidateRemoveMessage): PayloadAction<CandidateRemoveMessage> {
  return {
    type: "cloud/remove-candidate",
    payload: message
  }
}

function cloudConnect(): Action {
  return {
    type: "cloud/connect"
  }
}

function cloudDisconnect(): Action {
  return {
    type: "cloud/disconnect"
  }
}

export {cloudConnect, cloudDisconnect, cloudAddCandidate, cloudEditCandidate, cloudRemoveCandidate}