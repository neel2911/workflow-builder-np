// import { useAppSelector, useAppDispatch } from "../../app/hooks";
// import { selectCount } from "./workflowBuilderSlice";

import { Canvas } from "./Canvas";
import Preview from "./Preview";
import BlockLibrary from "./BlockLibrary";
import { ReactFlowProvider } from "reactflow";
import { SaveModal } from "./Title/SaveModal";
import { Title } from "./Title";

export function WorkflowBuilder() {
  // const count = useAppSelector(selectCount);
  // const dispatch = useAppDispatch();

  return (
    <>
      <Title />
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

// ${
//   isOpen ? "h-[51.5%]" : "h-[87%]"
// }
