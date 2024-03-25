import { CellType } from "../../type";

export function Cell(props: { data: CellType; isHeader: boolean }) {
  const { data, isHeader } = props;
  return (
    <div
      className={`border border-border p-2 min-w-28 w-28 max-w-28 ${
        isHeader && "font-bold"
      }`}
    >
      {data}
    </div>
  );
}
