import { Outlet } from "react-router-dom";
import AuthHeader from "./AuthHeader";

const AuthLayout = () => {
  return (
    <>
      <AuthHeader />
      <main
        className={`auth-page d-flex justify-content-center align-items-center}`}
      >
        <Outlet />
      </main>
    </>
  );
};

export default AuthLayout;
