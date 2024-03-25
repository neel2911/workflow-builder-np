import { useCallback } from "react";
import { DND_DATA_TRANSFER } from "../utils";
import { ReactFlowInstance, XYPosition } from "reactflow";
import { NodeType } from "../type";

export const useDnD = (params: {
  setIsHighlight: React.Dispatch<React.SetStateAction<boolean>>;
  onDropCallback: (params: { position?: XYPosition; type: NodeType }) => void;
  reactFlowInstance: ReactFlowInstance | null;
}) => {
  const { setIsHighlight, onDropCallback, reactFlowInstance } = params;

  const onDropHandler = (event: any) => {
    setIsHighlight(false);
    const type = event?.dataTransfer.getData(DND_DATA_TRANSFER) as NodeType;
    // check if the dropped element is valid
    if (typeof type === "undefined" || !type) {
      return;
    }
    const position = reactFlowInstance?.screenToFlowPosition({
      x: event.clientX,
      y: event.clientY,
    });
    onDropCallback({ position, type });
  };
  const onDragOverHandler = useCallback((event: any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  return { onDropHandler, onDragOverHandler };
};
