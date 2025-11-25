import { Outlet } from "react-router-dom";
import AuthHeader from "./AuthHeader";
import Footer from "components/layouts/Footer";

const AuthLayout = () => {
  return (
    <>
      <AuthHeader />
      <main className="content">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default AuthLayout;
