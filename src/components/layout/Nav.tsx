import { Link } from "react-router-dom";
import { useAppDispatch } from "../../hooks/redux";
import mainLogo from "../../assets/images/main_logo.png";
import user from "../../assets/images/def_userInfo.png";
import { CiChat1 } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";

const Nav = () => {
  const dispatch = useAppDispatch();

  return (
    <nav className="flex fixed flex-row justify-between bg-navBarBg items-center w-screen">
      <div className="flex flex-row items-center mt-2">
        <Link to={`/`}>
          <img className="w-24 ml-10" src={mainLogo} alt="main logo" />
        </Link>
        <Link to={`/`} className="my-1 text-white px-4 py-2">
          Q&A
        </Link>
        <Link to={`/recruit`} className="my-1 text-white px-4 py-2">
          스터디
        </Link>{" "}
        <Link to={`/ide`} className="my-1 text-white px-4 py-2">
          IDE
        </Link>
      </div>
      <div className="flex items-center ">
        <Link to={`/`} className="my-1 text-white px-4 py-2">
          <CiSearch />
        </Link>
        <Link to={`/chat`} className="my-1 text-white px-4 py-2">
          <CiChat1 />
        </Link>
        <Link to={`/mypage`} className="my-1 text-white px-4 py-2">
          <img className="w-8 mr-8 " src={user} alt="user Image" />
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
