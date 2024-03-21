import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useAppDispatch } from "../../hooks/redux.ts";
import api from "../../api";
import { clickLogin } from "../../store/user/user.slice.ts";
import { toast } from "react-toastify";
import KakaoSocialLogin from "../../components/SocialLogin/KakaoLogin/KakaoSocialLogin.tsx";
import NaverSocialLogin from "../../components/SocialLogin/NaverLogin/NaverSocialLogin.tsx";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [incorrect, setIncorrect] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleLoginClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (email === "") {
      emailRef.current?.focus();
      toast.warning("이메일을 입력하세요.");
      return;
    }
    if (password === "") {
      passwordRef.current?.focus();
      toast.warning("비밀번호를 입력하세요.");
    }

    await api
      .post("/login", { email, password })
      .then((res) => {
        if (res.status === 200) {
          const { access_token } = res.headers;
          dispatch(clickLogin(access_token));
          navigate("/");
          toast.success("로그인 되었습니다.");
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          email !== "" && password !== "" && setIncorrect(true);
        }
      });
  };

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  axios.defaults.withCredentials = true;

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center">
      <div className="w-1/2 flex flex-col items-center mb-48">
        <div className="w-full mb-10">
          <h2 className="text-title text-center font-semibold text-5xl">
            COSMO&apos;s
          </h2>
        </div>
        <div className="w-full text-center">
          <div className={"flex flex-col justify-center items-center"}>
            <span className="text-gray/80 mb-2">다른 서비스로 로그인</span>
            <div className={"flex items-center justify-center"}>
              <KakaoSocialLogin />
              <NaverSocialLogin />
            </div>
          </div>
          <div className="container my-3 mx-auto text-center flex items-center">
            <div className="flex-grow border-t border-gray"></div>
            <span className="text-gray mx-2">또는</span>
            <div className="flex-grow border-t border-gray"></div>
          </div>
        </div>
        <form className="w-full">
          <div className="my-4">
            <input
              ref={emailRef}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-12 pl-4 rounded-md placeholder:font-medium placeholder:text-lg"
              type="text"
              placeholder="이메일 또는 아이디"
            />
          </div>
          <div className="my-4">
            <input
              ref={passwordRef}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-12 pl-4 rounded-md placeholder:font-medium placeholder:text-lg"
              placeholder="비밀번호"
              type="password"
            />
          </div>
          <div>
            {incorrect && (
              <div>
                <p className={"text-softwarning"}>
                  아이디 또는 비밀번호가 올바르지 않습니다.
                </p>
              </div>
            )}
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
