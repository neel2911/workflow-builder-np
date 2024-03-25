import { useAppSelector } from "../../../app/hooks";
import { getPreviewSelectors } from "../workflowBuilderSlice";
import { Table } from "./Table";

export default function Preview() {
  const preview = useAppSelector(getPreviewSelectors);

  return (
    <>
      <div className="flex items-center justify-between border-y border-border px-4 py-1 cursor-pointer h-8">
        <span className="text-sm font-bold">Output</span>
      </div>
      <div className="p-4 h-full overflow-y-auto">
        {typeof preview === "string" ? (
          <div>{preview}</div>
        ) : (
          <Table data={preview} />
        )}
      </div>
    </>
  );
}
