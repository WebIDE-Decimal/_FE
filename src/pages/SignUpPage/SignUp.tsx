import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../api";
import useEmailCheck from "../../hooks/useCheck/useEmailCheck.ts";
import usePasswordCheck from "../../hooks/useCheck/usePasswordCheck.ts";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [checkEmail, setCheckEmail] = useState(false);
  const [checkValidPassword, setCheckValidPassword] = useState(false);
  const navigate = useNavigate();
  const emailRef = useRef<HTMLInputElement>(null);
  const emailCheckButtonRef = useRef<HTMLButtonElement>(null);
  const handleEmailClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const emailCheck = useEmailCheck(email);
    if (emailCheck) {
      setCheckEmail(true);
      if (emailCheckButtonRef.current !== null) {
        emailCheckButtonRef.current.disabled = false;
      }
    } else {
      setCheckEmail(false);
      if (emailCheckButtonRef.current !== null) {
        emailCheckButtonRef.current.disabled = true;
      }
    }
  }, [email]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const passwordCheck = usePasswordCheck(password);
    if (passwordCheck) {
      setCheckValidPassword(true);
    } else {
      setCheckValidPassword(false);
    }
  }, [password]);

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  const handleSignUpClick = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await api
      .post("/users/signup", {
        email,
        password,
        nickname,
      })
      .then((res) => {
        navigate(`/login`);
        toast.success("회원가입 되었습니다.🎉");
        console.log(res);
      })
      .catch((err) => console.log(err));
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
              !checkEmail
                ? "flex mt-4 mb-2 items-center relative"
                : "flex my-4 items-center relative"
            }`}
          >
            <input
              ref={emailRef}
              className="w-full h-12 pl-4 rounded-md placeholder:font-medium placeholder:text-lg"
              type="text"
              placeholder="이메일 또는 아이디"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              ref={emailCheckButtonRef}
              type={"button"}
              className={`absolute right-3 text-white/80 px-2 py-1 rounded-md bg-loginBtn disabled:bg-gray disabled:cursor-not-allowed`}
              onClick={handleEmailClick}
              disabled={true}
            >
              인증
            </button>
          </div>
          {!checkEmail && email !== "" && (
            <div>
              <span className="text-softwarning">
                올바른 이메일 형식이 아닙니다.
              </span>
            </div>
          )}
          <div className={`${checkEmail ? "mt-2 mb-4" : "my-4"}`}>
            <input
              className="w-full h-12 pl-4 rounded-md placeholder:font-medium placeholder:text-lg"
              placeholder="비밀번호"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {!checkValidPassword && password !== "" && (
            <div>
              <span className="text-softwarning">
                비밀번호는 영문, 숫자, 특수기호를 1개 이상씩 포함한 8~15자여야
                합니다.
              </span>
            </div>
          )}
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
              <span className="text-warning font-medium">
                비밀번호가 일치하지 않습니다.
              </span>
            </div>
          )}
          <div
            className={`${
              checkPassword !== "" && checkPassword !== password
                ? "flex mt-2 mb-4 items-center relative"
                : "flex my-4 items-center relative"
            }`}
          >
            <input
              className="w-full h-12 pl-4 rounded-md placeholder:font-medium placeholder:text-lg"
              placeholder="닉네임"
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
            <button
              ref={emailCheckButtonRef}
              type={"button"}
              className={`absolute right-3 text-white/80 px-2 py-1 rounded-md bg-loginBtn disabled:bg-gray disabled:cursor-not-allowed`}
              onClick={handleEmailClick}
              disabled={true}
            >
              인증
            </button>
          </div>

          <div>
            <button
              onClick={handleSignUpClick}
              className="w-full my-4 font-semibold bg-loginBtn text-btnwhite h-12 rounded-md hover:bg-login"
            >
              회원가입
            </button>
          </div>
          <div className="flex justify-center">
            <span className="text-white/60">이미 계정이 있으세요?</span>
            <Link
              to={`/login`}
              className="ml-2 text-sky-500 font-semibold hover:text-sky-400"
            >
              로그인
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
