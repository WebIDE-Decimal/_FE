import defaultImg from "../../assets/user.png";
import React, { useRef, useState } from "react";

const My = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [img, setImg] = useState("");
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

  return (
    <div className={"w-full h-full flex justify-center items-center"}>
      <div className={"w-5/6 h-[740px]"}>
        <div className={"mb-5"}>
          <p className={"text-4xl font-bold text-white ml-2"}>마이 페이지</p>
        </div>
        <div className={"flex my-3 pb-4 border-b-2 border-[#46494E]"}>
          <div>
            <span
              className={
                "px-4 border-x text-lg border-white text-[#818181] font-medium hover:text-white hover:cursor-pointer"
              }
            >
              나의 정보
            </span>
          </div>
          <div>
            <span
              className={
                "px-4  text-lg  text-[#818181] font-medium hover:text-white hover:cursor-pointer"
              }
            >
              모집중인 스터디
            </span>
          </div>
          <div>
            <span
              className={
                "px-4 border-l text-lg border-white text-[#818181] font-medium hover:text-white hover:cursor-pointer"
              }
            >
              내가 신청한 스터디
            </span>
          </div>
          <div>
            <span
              className={
                "px-4 border-x text-lg border-white text-[#818181] font-medium hover:text-white hover:cursor-pointer"
              }
            >
              진행중인 스터디
            </span>
          </div>
        </div>
        <div className={"w-full flex mt-12"}>
          <div
            className={"flex w-1/3 h-full flex-col justify-center items-center"}
          >
            <div>
              <img
                className={"w-52 h-52"}
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
                    className={"w-1/2 bg-[#CBD5E1] rounded h-8"}
                    type={"text"}
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
                    className={"w-1/2 bg-[#CBD5E1] rounded h-8"}
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
                    className={"w-1/2 bg-[#CBD5E1] rounded h-8"}
                    type={"text"}
                  />
                </div>
              </div>
              <div className={"w-full mb-3"}>
                <p className={"text-white font-bold mb-3"}>새 비밀번호</p>
                <div className={"flex items-center"}>
                  <input
                    className={"w-1/2 bg-[#CBD5E1] rounded h-8"}
                    type={"text"}
                  />
                </div>
              </div>
              <div className={"w-full mb-3"}>
                <p className={"text-white font-bold mb-3"}>새 비밀번호 확인</p>
                <div className={"flex justify-between"}>
                  <input
                    className={"w-1/2 bg-[#CBD5E1] rounded h-8"}
                    type={"text"}
                  />
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
                className={
                  "bg-[#F44336] text-white font-bold ml-1 mt-3 px-4 py-1.5 rounded"
                }
              >
                회원 탈퇴
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default My;
