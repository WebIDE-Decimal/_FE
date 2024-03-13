import ProceedingStudy from "./ProceedingStudy/ProceedingStudy.tsx";

const ProceedingStudies = () => {
  return (
    <div className={"w-full flex mt-12"}>
      <ul
        className={
          "flex w-full px-4 h-full flex-wrap overflow-y-auto max-h-[500px] hide-scrollbar"
        }
      >
        <ProceedingStudy />
      </ul>
    </div>
  );
};

export default ProceedingStudies;
