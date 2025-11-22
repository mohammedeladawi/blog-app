import AuthLayout from "layouts/AuthLayout";
import MainLayout from "layouts/MainLayout";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const PrivateRoute = () => {
  const isAuthenticated = useSelector((s) => s.auth.isAuthenticated);
  return isAuthenticated ? <MainLayout /> : <Navigate to="/login" />;
};

export const PublicRoute = () => {
  const isAuthenticated = useSelector((s) => s.auth.isAuthenticated);
  return !isAuthenticated ? <AuthLayout /> : <Navigate to="/" />;
};

export const RootRoute = () => {
  const isAuthenticated = useSelector((s) => s.auth.isAuthenticated);
  return isAuthenticated ? <MainLayout /> : <AuthLayout />;
};
