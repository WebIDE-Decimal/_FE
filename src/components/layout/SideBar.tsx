import { FaPeopleGroup } from "react-icons/fa6";
import { MdFolderOpen, MdOutlineAccountCircle } from "react-icons/md";
import { SiWechat } from "react-icons/si";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../hooks/redux";
import { clickMyStudy } from "../../store/myPage/viewPage/viewPageSlice.ts";

const SideBar = () => {
  const dispatch = useAppDispatch();

  const handleMyPageClick = () => {
    dispatch(clickMyStudy());
  };
  return (
    <nav className="flex fixed flex-col justify-between items-center bg-navBg w-20 h-lvh">
      <div className="flex flex-col mt-2">
        <Link to={`/`}>
          <button className="my-1">
            <FaPeopleGroup className="text-icons text-5xl" />
          </button>
        </Link>
        <button className="my-1">
          <MdFolderOpen className="text-icons text-5xl" />
        </button>
        <button className="my-1">
          <SiWechat className="text-icons text-5xl" />
        </button>
      </div>
      <div className="mb-3">
        <Link onClick={handleMyPageClick} to={`/mypage`}>
          <MdOutlineAccountCircle className="text-icons text-5xl" />
        </Link>
      </div>
    </nav>
  );
};

export default SideBar;
