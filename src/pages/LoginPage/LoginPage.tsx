import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLoginClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await axios
      .post(`https://groomcosmos.site/api/login`, { email, password })
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem("accessTK", res.headers.access_token);
          navigate(`/`);
          toast.success("로그인 되었습니다.😉");
        }
      });
  };

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center">
      <div className="w-1/2 flex flex-col items-center mb-48">
        <div className="w-full mb-10">
          <h2 className="text-title text-center font-semibold text-5xl">
            COSMO&apos;s
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
          <div className="my-4">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-12 pl-4 rounded-md placeholder:font-medium placeholder:text-lg"
              type="text"
              placeholder="이메일 또는 아이디"
            />
          </div>
          <div className="my-4">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-12 pl-4 rounded-md placeholder:font-medium placeholder:text-lg"
              placeholder="비밀번호"
              type="password"
            />
          </div>
          <div>
            <button
              onClick={handleLoginClick}
              className="w-full my-4 font-semibold bg-loginBtn text-btnwhite h-12 rounded-md hover:bg-login"
            >
              로그인
            </button>
          </div>
          <div className="flex justify-between">
            <label className="hover:cursor-pointer" htmlFor="loginCheckbox">
              <input
                type="checkbox"
                id="loginCheckbox"
                placeholder="로그인 상태 유지"
              />
              <span className="ml-2 text-white/80">로그인 상태 유지</span>
            </label>
            <div>
              <Link
                to={`/reset`}
                className="mr-2 text-white/80 hover:text-white hover:font-medium"
              >
                비밀번호 재설정
              </Link>
              <Link
                to={`/signup`}
                className="ml-2 text-white/80 hover:text-white hover:font-medium"
              >
                회원가입
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
