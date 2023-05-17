import React from "react";
import Router from "./pages/Router";
import Loading from "./components/Loading/Loading";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
function App() {
  return (
    <div>
      <Header />
      <React.Suspense fallback={<Loading />}>
        <Router />
      </React.Suspense>
      <Footer />
    </div>
  );
}

export default App;
