import {Middleware} from "redux";
import {RootState} from "@/app/store";
import {Client} from "@stomp/stompjs";
import {setConnected} from "@/app/store/slices/cloudSlice";

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
      const state = storeApi.getState()
      const dispatch = storeApi.dispatch

      client.onConnect = (frame) => {
        dispatch(setConnected(true));
      }

      client.onDisconnect = (frame) => {
        dispatch(setConnected(false));
      }

      // @ts-ignore
      switch (action.type) {
        case "cloud/connect":
          client.activate();
          break;

        case "cloud/disconnect":
          client.deactivate();
          break;

        default:
          break;
      }

      return next(action);
    }
  }
}