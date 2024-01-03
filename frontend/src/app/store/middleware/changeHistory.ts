import {Action, Middleware} from "redux";
import {RootState} from "@/app/store";
import {HistoryEntry} from "@/app/models";
import {PayloadAction} from "@reduxjs/toolkit";
import {
  addHistoryEntry,
  setHistoryIndex,
  setRedoAllowed,
  setUndoAllowed
} from "@/app/store/slices/changeHistorySlice";

// TODO: SEPERATION: CLOUD / OFFLINE & ADD CANDIDATES WITHOUT WAITING FOR CLOUD
export class ChangeHistoryMiddleware {
  public changeHistoryMiddleware: Middleware<{}, RootState>;

  constructor() {
    this.changeHistoryMiddleware = storeApi => next => action => {
      const dispatch = storeApi.dispatch

      const sessionId = storeApi.getState().cloud.sessionId;
      const history = storeApi.getState().changeHistory.history;
      const historyIndex = storeApi.getState().changeHistory.historyIndex;
      const isConnected = storeApi.getState().cloud.connected;

      // @ts-ignore
      switch (action.type) {
        case "history/undo":
          if (historyIndex < 0
              || sessionId != history[historyIndex]!.sessionId) {
            dispatch(setUndoAllowed(false));
            break;
          }

          if (history[historyIndex - 1]
              && history[historyIndex - 1]!.sessionId == sessionId
              && history[historyIndex - 1].undo) {
            dispatch(setUndoAllowed(true));
          } else {
            dispatch(setUndoAllowed(false));
          }

          if(history[historyIndex]!.redo) {
            dispatch(setRedoAllowed(true));
          }

          history[historyIndex]!.undo!();
          dispatch(setHistoryIndex(historyIndex - 1));
          break;

        case "history/redo":
          if (historyIndex >= history.length - 1
              || (isConnected && sessionId != history[historyIndex]!.sessionId)) {
            dispatch(setRedoAllowed(false));
            console.log(historyIndex >= history.length - 1,
                "ID_CHECK: ", sessionId != history[historyIndex]!.sessionId,
                "HISTORY_ID, ID: ", history[historyIndex]!.sessionId, sessionId,
                "INDEX, HISTORY_LENGTH-1: ", historyIndex, history.length - 1);
            break;
          }

          if (history[historyIndex + 1]
              && history[historyIndex + 1]!.sessionId == sessionId
              && history[historyIndex + 1].redo) {
            dispatch(setRedoAllowed(true));
            console.log("B");
          } else {
            dispatch(setRedoAllowed(false));
            console.log("C");
          }

          console.log("D");
          history[historyIndex]!.redo!();
          console.log("E");
          dispatch(setHistoryIndex(historyIndex + 1));
          break;

        case "history/create":
          // @ts-ignore
          const historyEntry: HistoryEntry = action.payload;

          if (historyEntry.undo) {
            dispatch(setUndoAllowed(true));
          }

          dispatch(addHistoryEntry(historyEntry));
          break;

        default:
          break;
      }

      return next(action);
    }
  }
}

// Action creators
function historyAddHistoryEntry(historyEntry: HistoryEntry): PayloadAction<HistoryEntry> {
  return {
    type: "history/create",
    payload: historyEntry
  }
}

function historyRedo(): Action {
  return {
    type: "history/redo"
  }
}

function historyUndo(): Action {
  return {
    type: "history/undo"
  }
}

export {historyUndo, historyRedo, historyAddHistoryEntry};