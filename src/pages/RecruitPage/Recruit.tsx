import saly from "../../assets/Saly-14.png";
import RecruitCategory from "./RecruitCategory/RecruitCategory.tsx";
import StudyList from "./StudyList/StudyList.tsx";

const Recruit = () => {
  return (
    <>
      <div className={"w-full flex flex-col h-full"}>
        <div
          className={"bg-studyBanner w-full flex justify-center items-center"}
        >
          <div className={"flex w-4/5 items-center"}>
            <div className={" flex-grow flex items-center"}>
              <img className={""} src={saly} />
              <div className={"w-1/2"}>
                <p className={"text-4xl float-right text-white font-bold"}>
                  마음에 드는 모임이 없다면
                </p>
                <p className={"text-4xl float-right text-white font-bold"}>
                  만들어 보는건 어때요?
                </p>
              </div>
            </div>
            <button
              className={
                "flex-grow-0 text-white w-48 h-12 font-bold bg-buttonGreen rounded text-center"
              }
            >
              모집글 작성하기
            </button>
          </div>
        </div>
        <div className={"w-6/7 flex h-full my-12"}>
          <RecruitCategory />
          <StudyList />
        </div>
      </div>
    </>
  );
};

export default Recruit;
