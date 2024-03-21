import { Link } from "react-router-dom";
import mainLogo from "../../assets/images/main_logo.png";
import { CiChat1, CiSearch } from "react-icons/ci";
import { useAppDispatch, useAppSelector } from "../../hooks/redux.ts";
import React from "react";
import api from "../../api";
import userimg from "../../assets/images/def_userInfo.png";
import { clickLogout } from "../../store/user/user.slice.ts";

const Nav = () => {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const handleLogoutClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await api
      .post("/logout")
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    dispatch(clickLogout(""));
  };

  return (
    <nav className="flex fixed flex-row justify-between z-10 bg-navBarBg items-center w-screen">
      <div className="flex flex-row items-center mt-2">
        <Link to={`/`}>
          <img className="w-24 ml-10" src={mainLogo} alt="main logo" />
        </Link>
        {/* <Link to={`/`} className="my-1 text-white px-4 py-2">
          Q&A
        </Link> */}
        <Link to={`/recruit`} className="my-1 text-white px-4 py-2">
          스터디 모집 게시판
        </Link>
        <Link to={`/ide`} className="my-1 text-white px-4 py-2">
          IDE
        </Link>

        <Link to={`/Mypage`} className="my-1 text-white px-4 py-2">
          내 스터디 목록
        </Link>

        {/* <Link to={`/videochat`} className="my-1 text-white px-4 py-2">
          VideoChat
        </Link> */}
      </div>
      <div className="flex items-center ">
        {user.accessToken && (
          <div>
            <button className={"bg-darkgreen"} onClick={handleLogoutClick}>
              로그아웃
            </button>
          </div>
        )}
        <Link to={`/`} className="my-1 text-white px-4 py-2">
          <CiSearch />
        </Link>
        <Link to={`/chat`} className="my-1 text-white px-4 py-2">
          <CiChat1 />
        </Link>

        {user.accessToken ? (
          <>
            <Link to={`/mypage`} className="my-1 text-white px-4 py-2">
              <img className="w-8 mr-8 " src={userimg} alt="user Image" />
            </Link>
            <Link to={`/`} className="my-1 text-white px-4 py-2">
              로그아웃
            </Link>
          </>
        ) : (
          <>
            <Link to={`/login`} className="my-1 text-white px-4 py-2">
              로그인
            </Link>
            <Link to={`/signup`} className="my-1 text-white px-4 py-2">
              회원가입
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
