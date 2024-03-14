import { Outlet } from "react-router-dom";
import Nav from "./Nav";
const Layout = () => {
  return (
    <div className="flex">
      <div className="">
        <Nav />
      </div>
      <div className="bg-back w-full pt-40 min-h-screen">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
