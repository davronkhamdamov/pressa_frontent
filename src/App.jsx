import React from "react";
import Router from "./pages/Router";
import Loading from "./components/Loading/Loading";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Container } from "@mui/material";
function App() {
  return (
    <div>
      <Container maxWidth="xl">
        <Header />
        <React.Suspense fallback={<Loading />}>
          <Router />
        </React.Suspense>
        <Footer />
      </Container>
    </div>
  );
}

export default App;
