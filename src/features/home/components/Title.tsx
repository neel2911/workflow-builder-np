import { Link } from "react-router-dom";

export function Title() {
  return (
    <div className="bg-header border-b border-border px-4 h-10 flex justify-between items-center">
      <div className="flex items-center h-full font-bold text-md">
        <span>Workflows</span>
      </div>
      <Link
        to="/workflow"
        className="rounded border border-border p-1 px-3 text-xs font-bold hover:bg-border"
      >
        + New
      </Link>
    </div>
  );
}
