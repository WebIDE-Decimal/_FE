import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";

const Layout = () => {
  return (
    <div className="flex">
      <div className="bg-back w-full min-h-screen">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
