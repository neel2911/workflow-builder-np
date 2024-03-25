import { startTransition, useCallback } from "react";
import { useAppDispatch } from "../../../../../app/hooks";
import { Handle, Node, Position } from "reactflow";
import { getTableDataFromText } from "../../../../workflowBuilder/utils";
import {
  setPreview,
  updateNodeData,
} from "../../../../workflowBuilder/workflowBuilderSlice";

const fileReader = new FileReader();

export function FileUploadNode(props: Node) {
  const dispatch = useAppDispatch();
  const { id, data } = props;
  const saveFile = useCallback(
    (e: any) => {
      const file = e.target.files;
      if (file) {
        fileReader.onload = (event) => {
          const csvOutput = event?.target?.result;
          dispatch(
            updateNodeData({
              id,
              data: {
                name: file[0].name,
                list: getTableDataFromText(csvOutput as string),
              },
            })
          );
        };
        fileReader.readAsText(file[0]);
      }
    },
    [dispatch, id]
  );

  const previewClickHandler = useCallback(() => {
    startTransition(() => {
      dispatch(setPreview(data?.list || []));
    });
  }, [data, dispatch]);
  return (
    <>
      <div className="rounded-md overflow-hidden shadow-lg bg-card flex flex-col p-2 justify-center items-center">
        <span className="text-sm font-bold mb-2 self-start">
          {data ? "File" : "Upload File"}
        </span>
        {data ? (
          <>
            {data.name && (
              <span className="text-sm font-bold mb-2 self-start">
                {data.name}
              </span>
            )}
            <button
              className="nodrag rounded bg-background p-2 self-end mt-2"
              onClick={previewClickHandler}
            >
              Preview
            </button>
          </>
        ) : (
          <input
            type="file"
            className="nodrag block w-full
          file:mr-4 file:py-2 file:px-4 file:rounded-md
          file:border-0 file:text-sm file:font-semibold
          file:bg-background file:text-white
          hover:text-slate cursor-pointer"
            id="custom-input"
            onChange={saveFile}
            hidden
          />
        )}
      </div>
      <Handle type="source" position={Position.Right} id={`${id}_source`} />
    </>
  );
}
