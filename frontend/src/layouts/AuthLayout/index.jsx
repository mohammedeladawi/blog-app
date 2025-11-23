import { Outlet } from "react-router-dom";
import AuthHeader from "./AuthHeader";

const AuthLayout = () => {
  return (
    <>
      <AuthHeader />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default AuthLayout;
