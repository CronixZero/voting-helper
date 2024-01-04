import {useCallback, useEffect} from "react";
import {historyRedo, historyUndo} from "@/app/store/middleware/changeHistory";
import {useDispatch} from "react-redux";

export function KeyPressProvider() {
  const dispatch = useDispatch();

  const handleKeyPress = useCallback((event: { key: any, ctrlKey: boolean }) => {
    if (event.ctrlKey && event.key === "z") {
      dispatch(historyUndo());
    }

    if (event.ctrlKey && event.key === "y") {
      dispatch(historyRedo());
    }
  }, []);

  useEffect(() => {
    // attach the event listener
    document.addEventListener('keydown', handleKeyPress);

    // remove the event listener
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);
  return (
      <></>
  )
}