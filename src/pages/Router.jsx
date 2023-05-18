import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
const Home = React.lazy(() => import("./Home/Home"));
const Admin = React.lazy(() => import("./Admin/Admin"));
const Login = React.lazy(() => import("./Login/Login"));
const Annaunced = React.lazy(() => import("./annaunced/Annaounced"));
const PageNotFound = React.lazy(() => import("./PageNotFound/PageNotFound"));

const Router = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/admin"
        element={isAdmin ? <Admin /> : <Login setIsAdmin={setIsAdmin} />}
      />
      <Route path="/annaunced" element={<Annaunced />} />
      <Route path="/*" element={<PageNotFound />} />
    </Routes>
  );
};

export default Router;
