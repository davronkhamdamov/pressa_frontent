import React from "react";
import Router from "./pages/Router";
function App() {
  return (
    <React.Suspense fallback="Loading...">
      <Router />
    </React.Suspense>
  );
}

export default App;
