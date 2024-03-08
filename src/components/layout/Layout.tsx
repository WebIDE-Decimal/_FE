import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";

const Layout = () => {
  return (
    <div className="flex">
      <SideBar />
      <div className="bg-back ml-20 w-full min-h-screen">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
