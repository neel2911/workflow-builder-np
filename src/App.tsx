import { Outlet, Route, Routes } from "react-router-dom";
import { Header } from "./components";
import { WorkflowBuilder } from "./features/workflowBuilder";
import { Home } from "./features/home";
import { NoMatch } from "./NoMatch";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />

        <Route path="workflow" element={<WorkflowBuilder />}>
          <Route path=":id" element={<WorkflowBuilder />} />
        </Route>

        {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  );
}

function Layout() {
  return (
    <div className="h-screen">
      <Header />
      <Outlet />
    </div>
  );
}

export default App;
