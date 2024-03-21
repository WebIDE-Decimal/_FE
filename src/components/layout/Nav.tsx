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
  console.log(user.accessToken);
  const handleLogoutClick = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    await api
      .post("/logout")
      .then((res) => res.status === 200 && dispatch(clickLogout("")))
      .catch((err) => {
        console.log(err);
      });
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
        <Link to={`/`} className="my-1 text-white px-4 py-2">
          <CiSearch />
        </Link>
        <Link to={`/chat`} className="my-1 text-white px-4 py-2">
          <CiChat1 />
        </Link>

        {user.accessToken ? (
          <div className={"flex items-center mr-3"}>
            <div className={"mx-4 my-2"}>
              <Link to={`/mypage`} className="my-1 text-white">
                <img className="w-8 " src={userimg} alt="user Image" />
              </Link>
            </div>
            <div onClick={handleLogoutClick} className={"mx-4 my-2"}>
              <Link to={`/`} className="my-1 text-white">
                로그아웃
              </Link>
            </div>
          </div>
        ) : (
          <div className={"mr-3"}>
            <Link to={`/login`} className="text-white mx-4 my-2">
              로그인
            </Link>
            <Link to={`/signup`} className="text-white mx-4 my-2">
              회원가입
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;
