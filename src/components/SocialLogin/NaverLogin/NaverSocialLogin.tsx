import naverImg from "../../../assets/socialButton/btnG_naverIcon.png";
import React from "react";

const NaverSocialLogin = () => {
  const naverURL = "https://groomcosmos.site/socialLogin";

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
