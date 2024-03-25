import { XYPosition } from "reactflow";
import { NodeType } from "./type";

export const DND_DATA_TRANSFER = "application/reactflow";

export const newWorkflow = {
  id: 0,
  name: "New Workflow",
  nodes: [],
  edges: [],
  preview: "No preview",
};

export const getNewNode = ({
  type,
  position,
}: {
  type: NodeType;
  position?: XYPosition;
}) => {
  return {
    id: "0",
    type,
    position,
    data: null,
  };
};

export const getTableDataFromText = (csvText: string) => {
  const data = csvText.split("\r\n");

  return data.map((rows) => {
    return rows
      .split(/(".*?"|[^",]+)(?=\s*,|\s*$)/)
      .filter((item) => !["", ","].includes(item));
  });
};

export const filterData = ({
  tableData,
  filterConfig,
}: {
  tableData: Array<string[]>;
  filterConfig: { column: string; operation: string; filter: string };
}) => {
  const { column, operation, filter } = filterConfig;

  if (!tableData || tableData.length === 0) {
    return "No Preview";
  }

  return tableData.filter((row, index) => {
    if (index === 0 || column === "-1" || filter === "") {
      return true;
    }

    if (operation === "=") {
      if (row[+column] !== filter) {
        return false;
      }
    }
    if (operation === "!=") {
      if (row[+column] === filter) {
        return false;
      }
    }

    return true;
  });
};

export const sortData = ({
  tableData,
  sortConfig,
}: {
  tableData: Array<string[]>;
  sortConfig: { column: string; order: string };
}) => {
  const { column, order } = sortConfig;
  if (!tableData || tableData.length === 0) {
    return "No Preview";
  }
  return [
    tableData[0],
    ...tableData.slice(1).sort((a, b) => {
      if (column === "-1") {
        return 0;
      }

      if (a[+column] && b[+column] && a[+column] !== b[+column]) {
        return (
          (a[+column].localeCompare(b[+column]) ? 1 : -1) *
          (order === "desc" ? -1 : 1)
        );
      }

      return 0;
    }),
  ];
};
