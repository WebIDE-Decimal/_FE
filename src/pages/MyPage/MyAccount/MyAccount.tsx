import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import {
  clickConfirm,
  clickMyInformation,
  clickResetPassword,
  clickWithdrawal,
} from "../../../store/myPage/viewPage/viewPage";
import Information from "./Information/Information";
import ResetPassword from "./ResetPassword/ResetPassword";
import Withdrawal from "./Withdrawal/Withdrawal";

const MyAccount = () => {
  const dispatch = useAppDispatch();
  const { viewMyInformation, viewResetPassword, viewWithdrawal } =
    useAppSelector((state) => state.viewPage);

  const handleWithdrawalClick = () => {
    dispatch(clickWithdrawal());
  };
  const handleResetClick = () => {
    dispatch(clickResetPassword());
    dispatch(clickConfirm(false));
  };
  const handleMyInfoClick = () => {
    dispatch(clickMyInformation());
  };

  return (
    <div className="w-full">
      <div className="flex w-full border-b border-gray/30 py-6 ">
        <div className="pl-6">
          <span
            onClick={handleMyInfoClick}
            className="text-gray font-medium text-lg hover:text-white hover:cursor-pointer"
          >
            나의 정보
          </span>
        </div>
        <div className="pl-4">
          <span
            onClick={handleResetClick}
            className="text-gray font-medium text-lg hover:text-white hover:cursor-pointer"
          >
            비밀번호 변경
          </span>
        </div>
        <div className="pl-4">
          <span
            onClick={handleWithdrawalClick}
            className="text-gray font-medium text-lg hover:text-white hover:cursor-pointer"
          >
            회원 탈퇴
          </span>
        </div>
      </div>
      <div className="w-full h-full">
        {viewMyInformation && <Information />}
        {viewResetPassword && <ResetPassword />}
        {viewWithdrawal && <Withdrawal />}
      </div>
    </div>
  );
};

export default MyAccount;
