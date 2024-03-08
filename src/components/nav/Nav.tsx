import { CiSearch } from "react-icons/ci";
import { MdGroups } from "react-icons/md";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="w-full flex justify-between items-center mt-3 box-border border-b border-gray/30 pb-3">
      <div className="w-full pl-10">
        <h2 className="text-title font-semibold text-3xl">CosMo&apos;s</h2>
      </div>
      <div className="w-full flex items-center">
        <div className="absolute pl-3">
          <CiSearch className="text-3xl text-icons/40" />
        </div>
        <input
          className="w-full h-10 bg-transparent text-white border-icons/30 border-2 rounded-lg placeholder:pl-12 placeholder:text-icons/50"
          type="text"
          placeholder="원하는 스터디를 찾아보세요."
        />
      </div>
      <div className="w-full">
        <div className="float-end flex">
          <Link to={`/write`}>
            <div className="text-btnwhite flex items-center bg-loginBtn px-3 py-2 rounded-lg">
              <MdGroups className="absolute text-2xl" />
              <button className="ml-8">팀원 모집하기</button>
            </div>
          </Link>
          <Link to={`/login`}>
            <button className="float-end bg-loginBtn text-btnwhite mr-10 ml-6 px-3 py-2 rounded-lg">
              로그인
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
