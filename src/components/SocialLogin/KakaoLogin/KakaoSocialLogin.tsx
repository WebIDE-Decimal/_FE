import kakaoImg from "../../../assets/socialButton/kakaotalk_sharing_btn_small.png";
import React from "react";
import KakaoLogin from "react-kakao-login";

const KakaoSocialLogin = () => {
  const kakaoRestApiKey = import.meta.env.VITE_KAKAO_REST_API_KEY;
  const redirectUrl = "http://localhost:5173";
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${kakaoRestApiKey}&redirect_uri=${redirectUrl}`;

  // const handleKakaoLoginClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  //   e.preventDefault();
  //   window.location.href = kakaoURL;
  // };

  const KaKaoOnSuccess = (data) => {
    console.log(data);
  };

  const KakaoOnFail = (err) => {
    console.log(err);
  };

  return (
    <>
      <KakaoLogin
        token={"fc08e3b04d1349795f1bcf830c50e50a"}
        onSuccess={KaKaoOnSuccess}
        onFail={KakaoOnFail}
      />
    </>
    // <>
    //   <button className={"mr-2"} onClick={handleKakaoLoginClick}>
    //     <img
    //       src={kakaoImg}
    //       alt={"카카오 로그인"}
    //       className={"w-12 hover:cursor-pointer"}
    //     />
    //   </button>
    // </>
  );
};

export default KakaoSocialLogin;
