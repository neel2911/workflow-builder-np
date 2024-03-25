import { Edge, Node } from "reactflow";

export type BlockCategoryType = "input" | "transform";
export type NodeType = "fileUploadNode" | "filterNode" | "sortNode";
export type BlockType = {
  id: string;
  name: string;
  description: string;
  nodeType: NodeType;
};

export type CellType = string;
export type RowType = CellType[];
export type TableType = RowType[];

export type OnCloseType = (params: {
  type: "close" | "save" | "cancel";
  data?: any;
}) => void;

export type WorkflowType = {
  id: number;
  name: string;
  nodes: Node[];
  edges: Edge[];
  preview: string[][] | string;
};
