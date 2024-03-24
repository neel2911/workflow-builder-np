import { tableData } from "../data";
import { Table } from "./Table";

export default function Preview() {
  return (
    <>
      <div className="flex items-center justify-between border-y border-border px-4 py-1 cursor-pointer h-8">
        <span className="text-sm font-bold">Output</span>
      </div>
      <div className="p-4 h-full overflow-y-auto">
        <Table data={tableData} />
      </div>
    </>
  );
}
