import StudyCard from "../../../../components/Card/StudyCard/StudyCard.tsx";
import { Link } from "react-router-dom";

const NewStudyBottom = () => {
  return (
    <div className={"w-4/6 flex items-center justify-center"}>
      <div className={"w-full flex flex-col"}>
        <div className={"flex justify-between"}>
          <div>
            <p className={"text-white font-medium text-3xl"}>신규 스터디</p>
            <span className={"text-lg text-[#898686] font-medium"}>
              새로 생긴 프로젝트에 참여해보세요!
            </span>
          </div>
          <Link to={"/recruit"}>
            <div>
              <p
                className={
                  "text-lg text-white/80 hover:cursor-pointer hover:text-white hover:font-medium"
                }
              >
                모두 보기{">"}
              </p>
            </div>
          </Link>
        </div>
        <div
          className={"w-full mt-10 list-none flex justify-center items-center"}
        >
          <StudyCard />
          <StudyCard />
          <StudyCard />
        </div>
      </div>
    </div>
  );
};

export default NewStudyBottom;
