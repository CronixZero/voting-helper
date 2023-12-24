import {CloudOff, UploadCloud} from "lucide-react";
import {
  Accordion, AccordionItem,
  Button,
  Card,
  CardBody, CardFooter, Chip,
  Divider, Input,
  Popover,
  PopoverContent,
  PopoverTrigger, Tabs
} from "@nextui-org/react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/app/store";
import {useEffect} from "react";
import {setAutoConnect} from "@/app/store/slices/cloudSlice";
import {CardHeader} from "@nextui-org/card";
import {SessionConnector} from "@/app/components/session/SessionConnector";
import {SessionCreator} from "@/app/components/session/SessionCreator";

export function SessionSwitcher() {
  const connected: boolean = useSelector((state: RootState) => state.cloud.connected);
  const autoConnect: boolean = useSelector((state: RootState) => state.cloud.autoConnect);
  const dispatch = useDispatch();

  useEffect(() => {
    if (autoConnect) {
      dispatch({type: "cloud/connect"});
    }
  });

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
      classes += " bg-success hover:bg-success-600";
    } else {
      classes += " bg-default-100 hover:bg-default-200";
    }
    return classes;
  }

  function getChipClasses() {
    let classes = "font-medium text-sm";
    if (connected) {
      classes += " text-success";
    } else {
      classes += " text-danger";
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
        <Popover>
          <PopoverTrigger>
            <Button color={connected ? "success" : undefined} isIconOnly
                    className={getButtonClasses()}>
              {sessionIcon()}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="max-w-lg">
            <div className="flex flex-wrap gap-y-3 m-2">
              <div className="flex justify-between content-center w-full">
                <p className="text-center font-semibold text-lg">Cloud Sitzungen</p>
                <Chip variant="dot" color={connected ? "success" : "danger"}>
                  <p className={getChipClasses()}>{connected ? "Verbunden" : "Nicht verbunden"}</p>
                </Chip>
              </div>
              <Accordion variant="bordered" defaultExpandedKeys={["cloud-connection"]}>
                <AccordionItem key="cloud-connection" title="Cloud Verbindung">
                  <SessionConnector/>
                </AccordionItem>
                <AccordionItem key="cloud-session-create" title="Sitzung erstellen">
                  <SessionCreator/>
                </AccordionItem>
              </Accordion>
            </div>
          </PopoverContent>
        </Popover>
      </div>
  )
}