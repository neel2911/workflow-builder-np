import { useCallback, useState } from "react";
import ReactFlow, {
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  Controls,
  ReactFlowInstance,
} from "reactflow";
import "reactflow/dist/style.css";
import { DND_DATA_TRANSFER } from "../../utils";
import { FileUploadNode } from "./customNodes/FileUploadNode";
import { NodeType } from "../../type";
import { FilterDataNode } from "./customNodes/FilterDataNode";
import { SortDataNode } from "./customNodes/SortDataNode";

const initialNodes = [
  {
    id: "1",
    data: { label: "Hello" },
    position: { x: 0, y: 0 },
    type: "input",
  },
  {
    id: "2",
    data: { label: "World" },
    position: { x: 100, y: 100 },
  },
];

const initialEdges = [
  { id: "1-2", source: "1", target: "2", label: "to the", type: "step" },
];

const nodeTypes: { [key in NodeType]: React.FC } = {
  fileUploadNode: FileUploadNode,
  filterNode: FilterDataNode,
  sortNode: SortDataNode,
};

export function Canvas() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [isHighlight, setIsHighlight] = useState(false);
  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance | null>(null);

  const onNodesChange = useCallback((changes: any) => {
    debugger;
    setNodes((nds) => applyNodeChanges(changes, nds));
  }, []);
  const onEdgesChange = useCallback((changes: any) => {}, []);

  const onDropHandler = (event: any) => {
    debugger;
    setIsHighlight(false);
    const type = event?.dataTransfer.getData(DND_DATA_TRANSFER);

    // check if the dropped element is valid
    if (typeof type === "undefined" || !type) {
      return;
    }
    const position = reactFlowInstance?.screenToFlowPosition({
      x: event.clientX,
      y: event.clientY,
    });
    const newNode = {
      id: Math.random().toString(),
      type,
      position,
      data: { label: `${type} node` },
    };
    debugger;

    setNodes((nds) => {
      debugger;
      return nds.concat(newNode as any);
    });
  };
  const onDragOver = useCallback((event: any) => {
    console.log(event);
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);
  return (
    <div className="flex-[0.75] flex h-full w-full relative text-xs">
      {isHighlight && (
        <div className="bg-[#4caf5030] absolute inset-y-0 inset-x-0 border border-[#4caf50] rounded"></div>
      )}

      <ReactFlow
        nodes={nodes}
        onNodesChange={onNodesChange}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onInit={setReactFlowInstance}
        onDrop={onDropHandler}
        onDragEnter={() => setIsHighlight(true)}
        onDragLeave={() => setIsHighlight(false)}
        onDragOver={onDragOver}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background />
        <Controls className="bg-white" />
      </ReactFlow>
    </div>
  );
}
