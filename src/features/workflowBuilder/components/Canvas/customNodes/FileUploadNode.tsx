import { Handle, Position } from "reactflow";

const fileReader = new FileReader();

export function FileUploadNode() {
  return (
    <>
      <Handle type="target" position={Position.Top} />
      <div className="rounded-md overflow-hidden shadow-lg bg-card flex flex-col p-2 justify-center items-center">
        <span className="text-sm font-bold mb-2 self-start">Upload File</span>
        <input
          type="file"
          className="nodrag block w-full
          file:mr-4 file:py-2 file:px-4 file:rounded-md
          file:border-0 file:text-sm file:font-semibold
          file:bg-background file:text-white
          hover:text-slate cursor-pointer"
          id="custom-input"
          onChange={(e) => {
            const file = e.target.files;
            if (file) {
              fileReader.onload = function (event) {
                const csvOutput = event?.target?.result;
                console.log(csvOutput);
              };
              fileReader.readAsText(file[0]);
            }
          }}
          hidden
        />
        <button className="rounded bg-background p-2 self-end mt-2">
          Preview
        </button>
      </div>
      <Handle type="source" position={Position.Bottom} id="a" />
    </>
  );
}
