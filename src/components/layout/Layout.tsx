import { Outlet } from "react-router-dom";
import Nav from "./Nav";

const Layout = () => {
  return (
    <div className="flex">
      <div>
        <Nav />
      </div>
      <div className="bg-back w-full h-full min-h-screen">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
