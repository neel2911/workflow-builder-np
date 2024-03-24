import { Handle, Position } from "reactflow";

export function FilterDataNode() {
  return (
    <>
      <Handle type="target" position={Position.Top} />
      <div className="rounded-md overflow-hidden shadow-lg bg-card flex flex-col p-2 justify-center items-start">
        <span className="text-sm font-bold mb-2">Filter</span>
        <label className="mb-2">Column</label>
        <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mb-2">
          <option>New Mexico</option>
          <option>Missouri</option>
          <option>Texas</option>
        </select>
        <label className="mb-2">Condition</label>
        <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mb-2">
          <option>equals to</option>
          <option>not equals to</option>
        </select>
        <label className="mb-2">Filter</label>
        <input
          type="text"
          className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mb-2"
        />

        <button className="rounded bg-background p-2 self-end">Preview</button>
      </div>
      <Handle type="source" position={Position.Bottom} id="a" />
    </>
  );
}
