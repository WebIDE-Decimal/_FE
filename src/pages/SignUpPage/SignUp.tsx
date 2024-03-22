import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../api";
import useEmailCheck from "../../hooks/useCheck/useEmailCheck.ts";
import usePasswordCheck from "../../hooks/useCheck/usePasswordCheck.ts";
import useNicknameCheck from "../../hooks/useCheck/useNicknameCheck.ts";
import axios from "axios";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [checkEmail, setCheckEmail] = useState({
    checkPattern: false,
    sendMail: false,
    emailChecked: false,
  });
  const [checkValidPassword, setCheckValidPassword] = useState(false);
  const [validNickname, setValidNickname] = useState(false);
  const navigate = useNavigate();
  const emailRef = useRef<HTMLInputElement>(null);
  const emailCheckButtonRef = useRef<HTMLButtonElement>(null);
  const nicknameCheckButtonRef = useRef<HTMLButtonElement>(null);

  const handleEmailClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    await axios
      .post("http://localhost:8080/api/verify-email/send", {
        email,
        resend: false,
        type: "email",
      })
      .then((res) => {
        if (res.data === "인증 메일 전송 완료") {
          setCheckEmail({ ...checkEmail, sendMail: true });
        }
      })
      .catch((err) => console.log(err));
  };

  // 이메일 유효성 검사
  useEffect(() => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const emailCheck = useEmailCheck(email);
    if (emailCheck) {
      setCheckEmail({
        ...checkEmail,
        checkPattern: true,
      });
    } else {
      setCheckEmail({ ...checkEmail, checkPattern: false });
    }
  }, [email]);

  // 비밀번호 유효성 검사
  useEffect(() => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const passwordCheck = usePasswordCheck(password);
    if (passwordCheck) {
      setCheckValidPassword(true);
    } else {
      setCheckValidPassword(false);
    }
  }, [password]);

  // 닉네임 유효성 검사
  useEffect(() => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const nicknameCheck = useNicknameCheck(nickname);
    if (nicknameCheck) {
      setValidNickname(true);
    } else {
      setValidNickname(false);
    }
  }, [nickname]);

  // 화면 진입 했을때 email 입력창에 포커스
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
      .then(() => {
        navigate(`/login`);
        toast.success("회원가입 되었습니다.🎉");
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
              !checkEmail.checkPattern
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
              onChange={(e) => {
                setEmail(e.target.value);
                if (checkEmail.sendMail) {
                  setCheckEmail({
                    checkPattern: false,
                    sendMail: false,
                    emailChecked: false,
                  });
                }
              }}
            />

            <button
              ref={emailCheckButtonRef}
              type={"button"}
              className={`${!checkEmail.checkPattern ? "bg-gray" : "bg-loginBtn"} absolute right-3 z-10 text-white/80 px-2 py-1 rounded-md`}
              onClick={handleEmailClick}
            >
              인증
            </button>
          </div>
          {!checkEmail.checkPattern && email !== "" ? (
            <div>
              <span className="text-softwarning">
                올바른 이메일 형식이 아닙니다.
              </span>
            </div>
          ) : checkEmail.sendMail ? (
            <div className={"flex"}>
              <span className="text-softwarning mr-2">
                인증 메일이 발송되었습니다. 메일함을 확인하세요.
              </span>
            </div>
          ) : checkEmail.emailChecked ? (
            <div>
              <span className="text-softwarning">메일이 인증되었습니다.</span>
            </div>
          ) : null}
          <div
            className={`${!checkEmail.checkPattern && email !== "" ? "mt-2" : "mt-4"}`}
          >
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
                ? "flex flex-col mt-2 mb-4 items-center relative"
                : "flex flex-col my-4 items-center relative"
            }`}
          >
            <div className={"flex w-full items-center"}>
              <input
                className="w-full h-12 pl-4 rounded-md placeholder:font-medium placeholder:text-lg"
                placeholder="닉네임"
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
              <button
                ref={nicknameCheckButtonRef}
                type={"button"}
                className={`${!validNickname ? "bg-gray" : "bg-loginBtn"} absolute right-3 z-10 text-white/80 px-2 py-1 rounded-md`}
              >
                인증
              </button>
            </div>
            {!validNickname && nickname !== "" && (
              <div className={"w-full mt-2"}>
                <p className={"text-softwarning"}>
                  닉네임은 2자 이상 15자 이하의 공백이 없는 문자여야 합니다.
                </p>
              </div>
            )}
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
