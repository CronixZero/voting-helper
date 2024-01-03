import {Button, ButtonGroup} from "@nextui-org/react";
import {Redo2, Undo2} from "lucide-react";
import {useDispatch, useSelector} from "react-redux";
import {historyRedo, historyUndo} from "@/app/store/middleware/changeHistory";
import {RootState} from "@/app/store";

export function ChangeHistory() {
  const undoAllowed: boolean = useSelector((state: RootState) => state.changeHistory.undoAllowed);
  const redoAllowed: boolean = useSelector((state: RootState) => state.changeHistory.redoAllowed);
  const dispatch = useDispatch();

  console.log("undoAllowed: " + undoAllowed, "redoAllowed: " + redoAllowed);

  function doUndo() {
    dispatch(historyUndo());
  }

  function doRedo() {
    dispatch(historyRedo());
  }

  return (
      <div>
        <ButtonGroup>
          <Button isIconOnly
                  onClick={doUndo}
                  color="default"
                  variant="bordered"
                  disabled={!undoAllowed}>
            <Undo2/>
          </Button>
          <Button isIconOnly
                  onClick={doRedo}
                  color="default"
                  variant="bordered"
                  disabled={!redoAllowed}>
            <Redo2/>
          </Button>
        </ButtonGroup>
      </div>
  )
}