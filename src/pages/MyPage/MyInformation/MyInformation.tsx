import defaultImg from "../../../assets/user.png";
import React, { useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux.ts";
import AlertModal from "../../../components/Modal/AlertModal/AlertModal.tsx";
import { toggleAlertModal } from "../../../store/modal/modalSlice.ts";

const MyInformation = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [img, setImg] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
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

  console.log(viewAlertModal);

  return (
    <div className={"w-full flex mt-12"}>
      {viewAlertModal && (
        <div className={"w-5/6 fixed h-1/2 flex items-center justify-center"}>
          <AlertModal text={"회원탈퇴 하시겠습니까?"} type={"회원 탈퇴"} />
        </div>
      )}
      <div className={"flex w-1/3 h-full flex-col justify-center items-center"}>
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
              <input
                className={"w-1/2 pl-2 bg-[#CBD5E1] rounded h-8"}
                type={"text"}
              />
              <div
                className={
                  "ml-6 border-l-4 border-[#46494E] h-8 flex items-center"
                }
              >
                <p className={"ml-4 text-sm text-[#F44336] font-light"}>
                  사용중인 닉네임 입니다.
                </p>
              </div>
            </div>
          </div>
          <div className={"w-full mb-3"}>
            <p className={"text-white font-bold mb-3"}>기존 비밀번호</p>
            <div className={"flex items-center"}>
              <input
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
            <div className={"flex justify-between"}>
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
                {checkPassword !== "" && checkPassword !== password && (
                  <div className={"pt-1"}>
                    <span className="text-sm font-medium text-warning/90">
                      비밀번호가 일치하지 않습니다.
                    </span>
                  </div>
                )}
              </div>
              <button
                className={
                  "bg-darkgreen text-white font-bold rounded mt-6 px-5 py-2"
                }
              >
                저장
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
};

export default MyInformation;
