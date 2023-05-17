import React from "react";
import Router from "./pages/Router";
import Loading from "./components/Loading/Loading";
function App() {
  return (
    <React.Suspense fallback={<Loading />}>
      <Router />
    </React.Suspense>
  );
}

export default App;
