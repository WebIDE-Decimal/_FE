import RecruitingStudy from "./RecruitingStudy/RecruitingStudy.tsx";

const RecruitingStudies = () => {
  return (
    <div className={"w-full flex mt-12"}>
      <ul
        className={
          "flex w-full px-4 h-full flex-wrap overflow-y-auto max-h-[500px] hide-scrollbar"
        }
      >
        <RecruitingStudy />
      </ul>
    </div>
  );
};

export default RecruitingStudies;
