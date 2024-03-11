import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  clickMyAccount,
  clickMyInformation,
  clickMyStudy,
  clickProceedingStudy,
} from "../../store/myPage/viewPage/viewPage";
import MyAccount from "./MyAccount/MyAccount";
import MyStudy from "./MyStudy/MyStudy";

const My = () => {
  const dispatch = useAppDispatch();
  const { viewMyStudy, viewMyAccount } = useAppSelector(
    (state) => state.viewPage
  );

  const handleMyStudyClick = () => {
    dispatch(clickMyStudy());
    dispatch(clickProceedingStudy());
  };

  const handleMyAccountClick = () => {
    dispatch(clickMyAccount());
    dispatch(clickMyInformation());
  };

  return (
    <div className="h-screen w-full flex flex-col box-border">
      <div className="w-full flex flex-col justify-between items-center pt-3 box-border">
        <div className="w-full pl-10 border-b border-gray/30 pb-3">
          <h2 className="text-title font-semibold text-3xl">CosMo&apos;s</h2>
        </div>
      </div>
      <div className="flex w-full h-full box-border">
        <div className="w-1/6 p-6 border-r border-gray/30">
          <div className="py-1">
            <span
              onClick={handleMyStudyClick}
              className="text-xl text-gray font-medium hover:text-white hover:cursor-pointer"
            >
              나의 스터디
            </span>
          </div>
          <div className="py-1">
            <span
              onClick={handleMyAccountClick}
              className="text-xl text-gray font-medium hover:text-white hover:cursor-pointer"
            >
              회원 정보
            </span>
          </div>
        </div>
        <div className="w-full">
          {viewMyStudy && <MyStudy />}
          {viewMyAccount && <MyAccount />}
        </div>
      </div>
    </div>
  );
};

export default My;
