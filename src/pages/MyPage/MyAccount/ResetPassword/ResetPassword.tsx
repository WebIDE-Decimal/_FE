import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { clickConfirm } from "../../../../store/myPage/viewPage/viewPage";
import ChangePassword from "./ChangePassword/ChangePassword";

const ResetPassword = () => {
  const { isConfirm } = useAppSelector((state) => state.viewPage);
  const dispatch = useAppDispatch();

  const handleConfirmClick = () => {
    dispatch(clickConfirm(true));
  };

  if (isConfirm) {
    return <ChangePassword />;
  } else {
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
            className="h-10 rounded-lg px-3"
            placeholder="비밀번호를 입력하세요."
          />
          <div className="mt-4">
            <button
              onClick={handleConfirmClick}
              className="float-right bg-loginBtn text-btnwhite px-3 py-2 rounded-lg hover:cursor-pointer"
            >
              비밀번호 인증
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default ResetPassword;
