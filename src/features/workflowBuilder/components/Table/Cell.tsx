import { CellType } from "../../type";

export function Cell(props: { data: CellType; isHeader: boolean }) {
  const { data, isHeader } = props;
  return (
    <div
      className={`flex-1 border border-border p-2 ${isHeader && "font-bold"}`}
    >
      {data}
    </div>
  );
}
