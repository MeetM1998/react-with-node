import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "./components/routes";

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<p>Loading...</p>}>
        <Router />
      </Suspense>
    </BrowserRouter>
  );
}
