import { useAppSelector, useAppDispatch } from "../../../app/hooks";


import { Canvas } from "./Canvas";
import Preview from "./Preview";
import BlockLibrary from "./BlockLibrary";
import { ReactFlowProvider } from "reactflow";
import { Title } from "./Title";

import {
  getWorkflowByIdSelectors,
  setCurrentWorkflow,
} from "../workflowBuilderSlice";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { newWorkflow } from "../utils";

export function WorkflowBuilder() {
  const { id: workflowId = 0 } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const currentItem = useAppSelector((state) =>
    getWorkflowByIdSelectors(state, Number(workflowId))
  );

  useEffect(() => {
    if (currentItem === null) {
      if (workflowId !== 0) {
        navigate("/");
      } else {
        dispatch(setCurrentWorkflow(newWorkflow));
      }
    } else {
      dispatch(setCurrentWorkflow(currentItem));
    }
  }, [currentItem, dispatch, navigate, workflowId]);

  return (
    <>
      <Title
        id={currentItem?.id || Number(workflowId)}
        name={currentItem?.name || "New Workflow"}
      />
      <div className="flex w-full h-[54%]">
        <ReactFlowProvider>
          <BlockLibrary />
          <Canvas />
        </ReactFlowProvider>
      </div>
      <div className="flex flex-col h-[31.5%]">
        <Preview />
      </div>
    </>
  );
}
