import AppliedForStudy from "./AppliedForStudy/AppliedForStudy.tsx";

const AppliedForStudies = () => {
  return (
    <div className={"w-full flex mt-12"}>
      <ul
        className={
          "flex w-full px-4 h-full flex-wrap overflow-y-auto max-h-[500px] hide-scrollbar"
        }
      >
        <AppliedForStudy />
      </ul>
    </div>
  );
};

export default AppliedForStudies;
