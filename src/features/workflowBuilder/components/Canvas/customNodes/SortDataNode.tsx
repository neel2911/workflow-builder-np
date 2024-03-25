import { startTransition, useCallback, useEffect, useMemo, useState } from "react";
import { Handle, Node, Position } from "reactflow";
import { useAppDispatch } from "../../../../../app/hooks";
import { setPreview } from "../../../../workflowBuilder/workflowBuilderSlice";
import { sortData } from "../../../../workflowBuilder/utils";

export function SortDataNode(props: Node) {
  const dispatch = useAppDispatch();
  const { id, data } = props;
  const [column, setColumn] = useState<string>("");
  const [order, setOrder] = useState<string>("asc");

  useEffect(() => {
    setColumn("");
  }, [data]);

  const options = useMemo(() => {
    return [
      <option value="-1">Select</option>,
      ...(data
        ? data.list[0].map((item: string, index: number) => (
            <option key={item} value={index}>
              {item}
            </option>
          ))
        : []),
    ];
  }, [data]);

  const previewClickHandler = useCallback(() => {
    startTransition(() => {
      dispatch(
        setPreview(
          sortData({
            tableData: data?.list || [],
            sortConfig: { column, order },
          })
        )
      );
    });
  }, [column, data?.list, dispatch, order]);

  return (
    <>
      <Handle type="target" position={Position.Left} id={`${id}_target`} />
      <div className="rounded-md overflow-hidden shadow-lg bg-card flex flex-col p-2 justify-center items-start">
        <span className="text-sm font-bold mb-2">Sort</span>
        <label className="mb-2">Column</label>
        <select
          value={column}
          className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mb-2"
          onChange={(e) => {
            setColumn(e.target.value);
          }}
        >
          {options}
        </select>
        <label className="mb-2">Sort by</label>
        <select
          value={order}
          className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mb-2"
          onChange={(e) => {
            setOrder(e.target.value);
          }}
        >
          <option value="asc">asc</option>
          <option value="desc">desc</option>
        </select>
        <button
          className="rounded bg-background p-2 self-end"
          onClick={previewClickHandler}
        >
          Preview
        </button>
      </div>
    </>
  );
}
