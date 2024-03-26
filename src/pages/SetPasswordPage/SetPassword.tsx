import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../api";
import usePasswordCheck from "../../hooks/useCheck/usePasswordCheck.ts";
import useNicknameCheck from "../../hooks/useCheck/useNicknameCheck.ts";

interface ErrorResponse {
  response: {
    status: number;
    [key: string]: any;
  };
}

function isErrorWithResponse(error: any): error is ErrorResponse {
  return error && error.response && typeof error.response.status === "number";
}

const SetPassword = () => {
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
  const [validNickname, setValidNickname] = useState({
    checkPattern: false,
    status: 0,
  });
  const navigate = useNavigate();
  const nicknameCheckButtonRef = useRef<HTMLButtonElement>(null);
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  console.log(token);

  const handleNicknameClick = async (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    if (validNickname.checkPattern) {
      try {
        const response = await api.post("/users/checkNickname", { nickname });
        response.status === 200 &&
          setValidNickname({ checkPattern: true, status: response.status });
      } catch (err) {
        if (isErrorWithResponse(err)) {
          err.response.status === 400 &&
            setValidNickname({
              checkPattern: true,
              status: err.response.status,
            });
        }
      }
    } else {
      toast.warning("닉네임 형식이 올바르지 않습니다.");
    }
  };

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
      setValidNickname({ ...validNickname, checkPattern: true });
    } else {
      setValidNickname({ ...validNickname, checkPattern: false });
    }
  }, [nickname]);

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

  const nicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (validNickname.status !== 0) {
      setValidNickname({ ...validNickname, status: 0 });
    }
    setNickname(e.target.value);
  };

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center">
      <div className="w-1/4 flex flex-col items-center mb-48">
        <div className="w-full mb-10">
          <h2 className="text-title text-center font-semibold text-5xl">
            CosMo&apos;s
          </h2>
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
                onChange={nicknameChange}
              />
              <button
                ref={nicknameCheckButtonRef}
                onClick={handleNicknameClick}
                type={"button"}
                className={`${!validNickname.checkPattern ? "bg-gray" : "bg-loginBtn"} absolute right-2 z-10 text-white/80 px-2 py-1 rounded-md`}
              >
                중복확인
              </button>
            </div>
            {!validNickname.checkPattern && nickname !== "" && (
              <div className={"w-full mt-2"}>
                <p className={"text-softwarning"}>
                  닉네임은 2자 이상 15자 이하의 공백이 없는 문자여야 합니다.
                </p>
              </div>
            )}
            {validNickname.status === 400 ? (
              <div className={"w-full mt-2"}>
                <p className={"text-warning"}>이미 사용중인 닉네임 입니다.</p>
              </div>
            ) : validNickname.status === 200 ? (
              <div className={"w-full mt-2"}>
                <p className={"text-darkgreen"}>사용 가능한 닉네임 입니다.</p>
              </div>
            ) : null}
          </div>
          <div>
            <button
              onClick={handleSignUpClick}
              className={`w-full mb-4 font-semibold bg-loginBtn text-btnwhite h-12 rounded-md hover:bg-login`}
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

export default SetPassword;
