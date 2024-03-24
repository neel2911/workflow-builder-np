import { ArrowLeft } from "lucide-react";
import { SaveModal } from "./SaveModal";
import { useCallback, useState } from "react";
import { Link } from "react-router-dom";

export function Title() {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = useCallback(() => {
    setIsOpen(false);
  }, []);
  return (
    <>
      <div className="bg-header border-b border-border px-4 h-10 flex justify-between items-center">
        <div className="flex items-center h-full font-bold text-md">
          <Link to="/">
            <ArrowLeft />
          </Link>
          <span className="ml-4">New Workflow</span>
        </div>
        <button
          className="rounded border border-border p-1 px-3 text-xs font-bold hover:bg-border"
          onClick={() => setIsOpen(true)}
        >
          Save
        </button>
      </div>
      {isOpen && <SaveModal onClose={onClose} />}
    </>
  );
}
