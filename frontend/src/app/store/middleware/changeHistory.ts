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
import {toast} from "sonner";

// TODO: SEPERATION: CLOUD / OFFLINE & ADD CANDIDATES WITHOUT WAITING FOR CLOUD
export class ChangeHistoryMiddleware {
  public changeHistoryMiddleware: Middleware<{}, RootState>;

  constructor() {
    this.changeHistoryMiddleware = storeApi => next => action => {
      const dispatch = storeApi.dispatch

      const sessionId = storeApi.getState().cloud.sessionId;
      const history = storeApi.getState().changeHistory.history;
      const historyIndex = storeApi.getState().changeHistory.historyIndex;
      const isRedoAllowed = storeApi.getState().changeHistory.redoAllowed;
      const isUndoAllowed = storeApi.getState().changeHistory.undoAllowed;
      const isConnected = storeApi.getState().cloud.connected;

      // @ts-ignore
      switch (action.type) {
        case "history/undo": {
          if (!isUndoAllowed
              || !isConnected // TODO: SEPERATION: CLOUD / OFFLINE
              || historyIndex < 0
              || (isConnected
                  && historyIndex !== 0
                  && sessionId != history[historyIndex]!.sessionId)) {
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

          if (history[historyIndex]!.redo) {
            dispatch(setRedoAllowed(true));
          }

          history[historyIndex]!.undo!();
          dispatch(setHistoryIndex(historyIndex - 1));
          toast.info("Rückgängig gemacht");
          break;
        }

        case "history/redo": {
          if (!isRedoAllowed
              || !isConnected // TODO: SEPERATION: CLOUD / OFFLINE
              || historyIndex >= history.length - 1
              || (isConnected
                  && historyIndex !== 0
                  && sessionId != history[historyIndex + 1]!.sessionId)
              || !history[historyIndex + 1]!.redo) {
            dispatch(setRedoAllowed(false));
            break;
          }

          if (history[historyIndex + 2]
              && history[historyIndex + 2]!.sessionId == sessionId
              && history[historyIndex + 2].redo) {
            dispatch(setRedoAllowed(true));
          } else {
            dispatch(setRedoAllowed(false));
          }

          if (history[historyIndex + 1]!.undo) {
            dispatch(setUndoAllowed(true));
          }

          history[historyIndex + 1]!.redo!();
          dispatch(setHistoryIndex(historyIndex + 1));
          toast.info("Wiederhergestellt");
          break;
        }

        case "history/create": {
          // @ts-ignore
          const historyEntry: HistoryEntry = action.payload;

          if (historyEntry.undo) {
            dispatch(setUndoAllowed(true));
          }

          dispatch(addHistoryEntry(historyEntry));
          break;
        }

        default: {
          break;
        }
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