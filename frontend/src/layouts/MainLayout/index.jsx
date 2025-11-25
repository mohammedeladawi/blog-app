import { Outlet } from "react-router-dom";
import Footer from "../../components/layouts/Footer";
import MainHeader from "./MainHeader";
const MainLayout = () => {
  return (
    <>
      <MainHeader />
      <main className="content">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
