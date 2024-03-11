import { useState } from "react";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../../../hooks/redux";
import { clickMyInformation } from "../../../../store/myPage/viewPage/viewPage";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const dispatch = useAppDispatch();

  const handleChangeClick = () => {
    dispatch(clickMyInformation());
    toast.success("비밀번호가 변경되었습니다.");
  };

  return (
    <div className="flex w-full flex-col h-96 justify-center items-center">
      <div className="flex flex-col items-center">
        <p className="text-white text-2xl mb-2">비밀번호 변경</p>
        <span className="text-white text-lg">
          회원 인증을 위해 비밀번호를 재입력 하세요.
        </span>
      </div>
      <div className="flex w-96 flex-col my-4">
        <input
          type="password"
          className="w-full h-12 pl-4 rounded-md placeholder:font-medium placeholder:text-lg"
          placeholder="기존 비밀번호"
        />
        <div className="my-4">
          <input
            className="w-full h-12 pl-4 rounded-md placeholder:font-medium placeholder:text-lg"
            placeholder="새 비밀번호"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div
          className={`${
            checkPassword !== "" && checkPassword !== password ? "mb-2" : "mb-4"
          }`}
        >
          <input
            className="w-full h-12 pl-4 rounded-md placeholder:font-medium placeholder:text-lg"
            placeholder="새 비밀번호 확인"
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

        <div>
          <button
            onClick={handleChangeClick}
            className="float-right bg-loginBtn text-btnwhite px-3 py-2 rounded-lg hover:cursor-pointer"
          >
            비밀번호 변경
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
