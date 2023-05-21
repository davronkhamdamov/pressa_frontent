import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
const Home = React.lazy(() => import("./Home/Home"));
const Admin = React.lazy(() => import("./Admin/Admin"));
const Login = React.lazy(() => import("./Login/Login"));
const Annaunced = React.lazy(() => import("./annaunced/Annaounced"));
const PageNotFound = React.lazy(() => import("./PageNotFound/PageNotFound"));
import Loading from "../components/Loading/Loading";

const Router = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  useEffect(() => {
    fetch("http://localhost:4000/admin", {
      method: "GET",
      headers: {
        token: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setisLoading(false);
        if (data.errorName === "AuthorizationError") {
          setisLoading(true);
          return setIsAdmin(false);
        }
        setisLoading(true);
        return setIsAdmin(true);
      });
  }, []);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/admin"
        element={
          isLoading ? (
            isAdmin ? (
              <Admin setIsAdmin={setIsAdmin} />
            ) : (
              <Login setIsAdmin={setIsAdmin} />
            )
          ) : (
            <Loading />
          )
        }
      />
      <Route path="/annaunced" element={<Annaunced />} />
      <Route path="/*" element={<PageNotFound />} />
    </Routes>
  );
};

export default Router;
