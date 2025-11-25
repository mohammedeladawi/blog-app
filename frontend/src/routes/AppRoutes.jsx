import React from "react";
import { Route, Routes } from "react-router-dom";
import { PrivateRoute, PublicRoute, RootRoute } from "./RouteGuards";
import Home from "pages/Home";
import Login from "pages/Login";
import SignUp from "pages/SignUp";
import Posts from "pages/Posts";
import CreatePost from "pages/CreatePost";
import SinglePost from "pages/SinglePost";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<RootRoute />}>
        <Route index element={<Home />} />
      </Route>

      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
      </Route>

      <Route path="/posts" element={<PrivateRoute />}>
        <Route index element={<Posts />} />
        <Route path="create" element={<CreatePost />} />
        <Route path=":slug" element={<SinglePost />} />
      </Route>

      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  );
};

export default AppRoutes;
