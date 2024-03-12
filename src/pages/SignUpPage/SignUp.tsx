import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [checkEmail, setCheckEmail] = useState("a");

  const pattern = /^[A-Za-z0-9_.-]+@[A-Za-z0-9-]+\.[A-Za-z0-9-]+$/;

  const emailValidChk = () => {
    if (pattern.test(email) === false) {
      setCheckEmail("");
    } else {
      setCheckEmail("true");
    }
  };

  const handleEmailClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    emailValidChk();
  };

  useEffect(() => {
    if (checkEmail === "") {
      setTimeout(() => {
        setCheckEmail("a");
      }, 3000);
    }
  }, [checkEmail]);

  const clickSignUp = async (e) => {
    e.preventDefault();
    const request = await axios
      .post("http://localhost:8080/api/users/signup", {
        email,
        nickname,
        password,
      })
      .then((res) => console.log(res));
  };

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center">
      <div className="w-1/4 flex flex-col items-center mb-48">
        <div className="w-full mb-10">
          <h2 className="text-title text-center font-semibold text-5xl">
            CosMo&apos;s
          </h2>
        </div>
        <div className="w-full text-center">
          <span className="text-gray/80">다른 서비스로 로그인</span>
          <div className="container my-3 mx-auto text-center flex items-center">
            <div className="flex-grow border-t border-gray"></div>
            <span className="text-gray mx-2">또는</span>
            <div className="flex-grow border-t border-gray"></div>
          </div>
        </div>
        <form className="w-full">
          <div
            className={`${
              checkEmail === ""
                ? "flex mt-4 mb-2 items-center relative"
                : "flex my-4 items-center relative"
            }`}
          >
            <input
              className="w-full h-12 pl-4 rounded-md placeholder:font-medium placeholder:text-lg"
              type="text"
              placeholder="이메일 또는 아이디"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              className="absolute right-3 bg-gray text-white/80 px-2 py-1 rounded-md hover:bg-loginBtn"
              onClick={handleEmailClick}
            >
              인증
            </button>
          </div>
          {!checkEmail && (
            <div>
              <span className="text-softwarning">
                올바른 이메일 형식이 아닙니다.
              </span>
            </div>
          )}
          <div className={`${checkEmail === "" ? "mt-2 mb-4" : "my-4"}`}>
            <input
              className="w-full h-12 pl-4 rounded-md placeholder:font-medium placeholder:text-lg"
              placeholder="비밀번호"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div
            className={`${
              checkPassword !== "" && checkPassword !== password
                ? "mb-2 mt-4"
                : "my-4"
            }`}
          >
            <input
              className="w-full h-12 pl-4 rounded-md placeholder:font-medium placeholder:text-lg"
              placeholder="비밀번호 확인"
              type="password"
              value={checkPassword}
              onChange={(e) => setCheckPassword(e.target.value)}
            />
          </div>
          {checkPassword !== "" && checkPassword !== password && (
            <div>
              <span className="text-warning/90">
                비밀번호가 일치하지 않습니다.
              </span>
            </div>
          )}
          <div
            className={`${
              checkPassword !== "" && checkPassword !== password
                ? "mt-2 mb-4"
                : "my-4"
            }`}
          >
            <input
              className="w-full h-12 pl-4 rounded-md placeholder:font-medium placeholder:text-lg"
              placeholder="닉네임"
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
          </div>
          <div>
            <button
              onClick={clickSignUp}
              className="w-full my-4 font-semibold bg-loginBtn text-btnwhite h-12 rounded-md"
            >
              회원가입
            </button>
          </div>
          <div className="flex justify-center">
            <span className="text-white/60">이미 계정이 있으세요?</span>
            <Link to={`/login`} className="ml-2 text-loginBtn font-semibold">
              로그인
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
