import kakaoImg from "../../../assets/socialButton/kakaotalk_sharing_btn_small.png";
import React from "react";

const KakaoSocialLogin = () => {
  const kakaoRestApiKey = import.meta.env.VITE_KAKAO_REST_API_KEY;
  const redirectUrl = "https://localhost:5173";
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${kakaoRestApiKey}&redirect_uri=${redirectUrl}`;

  const handleKakaoLoginClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    window.location.href = kakaoURL;
  };

  return (
    <>
      <button onClick={handleKakaoLoginClick}>
        <img
          src={kakaoImg}
          alt={"카카오 로그인"}
          className={"w-12 hover:cursor-pointer"}
        />
      </button>
    </>
  );
};

export default KakaoSocialLogin;
