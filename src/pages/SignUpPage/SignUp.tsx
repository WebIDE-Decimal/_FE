import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useEmailCheck from "../../hooks/useCheck/useEmailCheck.ts";
import api from "../../api/index.ts";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [checkEmail, setCheckEmail] = useState({
    checkPattern: false,
    sendMail: false,
    emailChecked: false,
  });
  const navigate = useNavigate();
  const emailRef = useRef<HTMLInputElement>(null);

  const handleEmailClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    await api
      .post("/verify-email/send", {
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

  // 화면 진입 했을때 email 입력창에 포커스
  useEffect(() => {
    emailRef.current?.focus();
  }, []);

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
          <div className={"w-full flex justify-end"}>
            <button
              onClick={handleEmailClick}
              className={`mb-4 font-semibold px-6 bg-loginBtn text-btnwhite h-12 rounded-md hover:bg-login`}
            >
              이메일 인증
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
