import { Title } from "./components/Title";
import { WorkflowCard } from "./components/Workflow";

export function Home() {
  return (
    <>
      <Title />
      <div className="flex flex-wrap p-4 pr-0">
        <WorkflowCard data={{ id: "1", name: "Workflow 1" }} />
      </div>
    </>
  );
}
