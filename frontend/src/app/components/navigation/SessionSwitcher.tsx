import {CloudOff, UploadCloud} from "lucide-react";
import {Button} from "@nextui-org/react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/app/store";
import {useEffect} from "react";
import {setAutoConnect} from "@/app/store/slices/cloudSlice";

export function SessionSwitcher() {
  const connected: boolean = useSelector((state: RootState) => state.cloud.connected);
  const autoConnect: boolean = useSelector((state: RootState) => state.cloud.autoConnect);
  const dispatch = useDispatch();

  useEffect(() => {
    if (autoConnect) {
      dispatch({type: "cloud/connect"});
    }
  }, []);

  function sessionIcon() {
    if (connected) {
      return (
          <UploadCloud/>
      )
    } else {
      return (
          <CloudOff/>
      )
    }
  }

  function getButtonClasses() {
    let classes = "w-10 h-10 mr-0 flex items-center justify-center rounded-lg";
    if (connected) {
      classes += " bg-success";
    } else {
      classes += " bg-default-100";
    }
    return classes;
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

  return (
      <div>
        <Button color={connected ? "success" : undefined} isIconOnly
                className={getButtonClasses()} onClick={toggleConnection}>
          {sessionIcon()}
        </Button>
      </div>
  )
}