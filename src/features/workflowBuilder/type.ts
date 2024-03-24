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
