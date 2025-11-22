import { Outlet } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
const MainLayout = () => {
  return (
    <>
      <Header></Header>
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
