import naverImg from "../../../assets/socialButton/btnG_naverIcon.png";
import React from "react";
import api from "../../../api/logout.ts";

const NaverSocialLogin = () => {
  const handleNaverLoginClick = async (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    await api.get("https://groomcosmos.site/oauth2/authorization/naver");
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
