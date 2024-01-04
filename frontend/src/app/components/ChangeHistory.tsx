import {Button, ButtonGroup} from "@nextui-org/react";
import {Redo2, Undo2} from "lucide-react";
import {useDispatch, useSelector} from "react-redux";
import {historyRedo, historyUndo} from "@/app/store/middleware/changeHistory";
import {RootState} from "@/app/store";

export function ChangeHistory() {
  const undoAllowed: boolean = useSelector((state: RootState) => state.changeHistory.undoAllowed);
  const redoAllowed: boolean = useSelector((state: RootState) => state.changeHistory.redoAllowed);
  const connected: boolean = useSelector((state: RootState) => state.cloud.connected);
  const dispatch = useDispatch();

  function doUndo() {
    dispatch(historyUndo());
  }

  function doRedo() {
    dispatch(historyRedo());
  }

  return (
      <div className={!connected ? "hidden" : ""}>
        <ButtonGroup variant="bordered">
          <Button isIconOnly
                  onClick={doUndo}
                  disabled={!undoAllowed}>
            <Undo2/>
          </Button>
          <Button isIconOnly
                  onClick={doRedo}
                  disabled={!redoAllowed}>
            <Redo2/>
          </Button>
        </ButtonGroup>
      </div>
  )
}