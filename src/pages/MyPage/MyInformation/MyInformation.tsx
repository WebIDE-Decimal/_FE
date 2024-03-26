import defaultImg from "../../../assets/user.png";
import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux.ts";
import AlertModal from "../../../components/Modal/AlertModal/AlertModal.tsx";
import { toggleAlertModal } from "../../../store/modal/modalSlice.ts";
import useNicknameCheck from "../../../hooks/useCheck/useNicknameCheck.ts";
import api from "../../../api";
import { toast } from "react-toastify";

type UserProps = {
  authority: string;
  email: string;
  id: number;
  nickname: string;
  password: string;
  profileFilename: null;
  profileFilepath: null;
};

const MyInformation = () => {
  const [user, setUser] = useState<UserProps>();
  const inputRef = useRef<HTMLInputElement>(null);
  const [img, setImg] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [response, setResponse] = useState({
    status: 0,
    message: "",
  });
  const [validNickname, setValidNickname] = useState({
    checkPattern: false,
    status: 0,
  });
  const { viewAlertModal } = useAppSelector((state) => state.modal);
  const dispatch = useAppDispatch();

  const handleImgClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    inputRef.current?.click();
  };

  const handleImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length === 0) {
      return;
    }
    const file = e.target.files?.[0];
    if (file) {
      const imgUrl = URL.createObjectURL(file);
      setImg(imgUrl);
    }
  };

  const handleNicknameChange = async (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    await api
      .post("users/updateNickname", nickname)
      .then((res) => {
        if (res.status === 200) {
          console.log(res);
          setValidNickname({ checkPattern: true, status: 200 });
          toast.success("닉네임이 변경되었습니다.");
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 400) {
          toast.warning("이미 존재하는 닉네임 입니다.");
          setValidNickname({ checkPattern: true, status: 400 });
        }
      });
  };

  useEffect(() => {
    try {
      const response = async () => {
        await api.post("/users/memberProfile").then((res) => {
          setUser(res.data);
          setNickname(res.data.nickname);
        });
      };
      response();
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const nicknameCheck = useNicknameCheck(nickname);
    if (nicknameCheck) {
      setValidNickname({ ...validNickname, checkPattern: true });
    } else {
      setValidNickname({ ...validNickname, checkPattern: false });
    }
  }, [nickname]);

  const nicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (validNickname.status !== 0 && nickname !== "") {
      setValidNickname({ checkPattern: true, status: 0 });
    }
    setNickname(e.target.value);
  };

  const handleChangePasswordButton = async (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    await api
      .post("users/updatePassword", { password, newPassword })
      .then((res) => {
        if (res.status === 200) {
          setResponse({ status: res.status, message: res.data });
        }
      })
      .catch((err) => {
        setResponse({
          status: err.response.status,
          message: err.response.data,
        });
      });
  };

  if (user?.id) {
    return (
      <div className={"w-full flex mt-12"}>
        {viewAlertModal && (
          <div className={"w-5/6 fixed h-1/2 flex items-center justify-center"}>
            <AlertModal text={"회원탈퇴 하시겠습니까?"} type={"회원 탈퇴"} />
          </div>
        )}
        <div
          className={"flex w-1/3 h-full flex-col justify-center items-center"}
        >
          <div>
            <img
              className={"w-52 h-52 rounded-full"}
              src={img ? img : defaultImg}
              alt={"profile image"}
            />
          </div>
          <button
            onClick={handleImgClick}
            className={"bg-darkgreen text-white rounded mt-8 px-6 py-3"}
          >
            프로필 사진 변경
          </button>
          <input
            ref={inputRef}
            onChange={handleImgChange}
            type={"file"}
            className={"hidden"}
          />
        </div>
        <div className={"w-2/3"}>
          <div className={"mb-5 pl-8 font-bold text-white"}>
            <p>기본정보</p>
          </div>
          <form className={"border-b-2 pl-8 border-[#46494E] pb-1"}>
            <div className={"w-full mb-3"}>
              <p className={"text-white font-bold mb-3"}>이메일</p>
              <div className={"flex items-center"}>
                <input
                  defaultValue={user.email}
                  className={
                    "w-1/2 bg-[#CBD5E1] pl-2 rounded h-8 cursor-default focus:outline-none"
                  }
                  type={"text"}
                  readOnly={true}
                />
                <div
                  className={
                    "ml-6 border-l-4 border-[#46494E] h-8 flex items-center"
                  }
                >
                  <p className={"ml-4 text-sm text-white font-light"}>
                    이메일은 변경 불가합니다.
                  </p>
                </div>
              </div>
            </div>
            <div className={"w-full mb-3"}>
              <p className={"text-white font-bold mb-3"}>닉네임</p>
              <div className={"flex items-center"}>
                <div className={"w-1/2 flex relative items-center"}>
                  <input
                    value={nickname}
                    className={"w-full pl-2 bg-[#CBD5E1] rounded h-8"}
                    type={"text"}
                    onChange={nicknameChange}
                  />
                  <button
                    onClick={handleNicknameChange}
                    className={
                      "bg-gray rounded px-2 py-0.5 absolute right-1 z-10"
                    }
                  >
                    변경
                  </button>
                </div>
                {!validNickname.checkPattern ? (
                  <div
                    className={
                      "ml-6 border-l-4 border-[#46494E] h-8 flex items-center"
                    }
                  >
                    <p className={"ml-4 text-sm text-[#F44336] font-light"}>
                      닉네임 형식이 올바르지 않습니다.
                    </p>
                  </div>
                ) : validNickname.checkPattern &&
                  validNickname.status === 400 ? (
                  <div
                    className={
                      "ml-6 border-l-4 border-[#46494E] h-8 flex items-center"
                    }
                  >
                    <p className={"ml-4 text-sm text-[#F44336] font-light"}>
                      사용중인 닉네임 입니다.
                    </p>
                  </div>
                ) : (
                  validNickname.checkPattern &&
                  validNickname.status === 200 && (
                    <div
                      className={
                        "ml-6 border-l-4 border-[#46494E] h-8 flex items-center"
                      }
                    >
                      <p className={"ml-4 text-sm text-darkgreen font-light"}>
                        닉네임이 변경되었습니다.
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>
            <div className={"w-full mb-3"}>
              <p className={"text-white font-bold mb-3"}>기존 비밀번호</p>
              <div className={"flex items-center"}>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={
                    "w-1/2 pl-2 bg-[#CBD5E1] rounded h-8 placeholder:font-medium placeholder:text-sky-800"
                  }
                  type={"password"}
                  placeholder={"기존 비밀번호를 입력하세요."}
                />
              </div>
            </div>
            <div className={"w-full mb-3"}>
              <p className={"text-white font-bold mb-3"}>새 비밀번호</p>
              <div className={"flex items-center"}>
                <input
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className={
                    "w-1/2 bg-[#CBD5E1] rounded h-8 pl-2 placeholder:font-medium placeholder:text-sky-800"
                  }
                  type={"password"}
                  placeholder={"변경할 비밀번호를 입력하세요."}
                />
              </div>
            </div>
            <div className={"w-full mb-3"}>
              <p className={"text-white font-bold mb-3"}>새 비밀번호 확인</p>
              <div className={"flex"}>
                <div className={"w-1/2 flex flex-col"}>
                  <input
                    value={checkPassword}
                    onChange={(e) => setCheckPassword(e.target.value)}
                    className={
                      "w-full pl-2 bg-[#CBD5E1] rounded h-8 placeholder:font-medium placeholder:text-sky-800"
                    }
                    placeholder={"변경할 비밀번호를 다시 입력하세요."}
                    type={"password"}
                  />
                  {checkPassword !== "" && checkPassword !== password ? (
                    <div className={"pt-1"}>
                      <span className="text-sm font-medium text-warning/90">
                        비밀번호가 일치하지 않습니다.
                      </span>
                    </div>
                  ) : response.status !== 200 && response.status !== 0 ? (
                    <div className={"pt-1"}>
                      <span className="text-sm font-medium text-warning/90">
                        {response.message}
                      </span>
                    </div>
                  ) : null}
                </div>
                <button
                  onClick={handleChangePasswordButton}
                  className={
                    "bg-darkgreen text-white font-bold rounded ml-8 px-4 py-1.5"
                  }
                >
                  비밀번호 변경
                </button>
              </div>
            </div>
          </form>
          <div className={"pl-8 mt-5"}>
            <p className={"text-white font-bold"}>회원 탈퇴</p>
            <button
              onClick={(e) => {
                e.preventDefault();
                dispatch(toggleAlertModal(true));
              }}
              className={
                "bg-[#F44336] text-white font-bold ml-1 mt-3 px-4 py-1.5 rounded"
              }
            >
              회원 탈퇴
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className={"text-2xl text-white"}>
        회원 정보를 불러오는 중입니다...
      </div>
    );
  }
};

export default MyInformation;
