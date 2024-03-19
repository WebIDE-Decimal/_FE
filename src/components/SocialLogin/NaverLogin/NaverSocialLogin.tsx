import naverImg from "../../../assets/socialButton/btnG_아이콘사각.png";
import React from "react";

const NaverSocialLogin = () => {
  const clientId = import.meta.env.VITE_NAVER_CLIENT_ID;
  const redirectURL = "https://localhost:5173";
  const naverURL = `https://nid.naver.com/oauth2.0/authorize?client_id=${clientId}&redirect_uri=${redirectURL}&response_type=code`;

  const handleNaverLoginClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    window.location.href = naverURL;
  };

  return (
    <>
      <button onClick={handleNaverLoginClick} className={"ml-2 pb-1"}>
        <img src={naverImg} alt={"네이버 로그인"} className={"w-12"} />
      </button>
    </>
  );
};

export default NaverSocialLogin;
