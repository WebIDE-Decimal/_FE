import NewStudy from "./NewStudy/NewStudy.tsx";
import NewStudyBottom from "./NewStudy/NewStudyBottom.tsx";

const HomeBanner = () => {
  return (
    <div className={"w-full h-full"}>
      <div
        className={"w-full h-1/2 flex justify-center items-center bg-[#2F3031]"}
      >
        <NewStudy />
      </div>
      <ul className={"w-full h-1/2 flex justify-center items-center"}>
        <NewStudyBottom />
      </ul>
    </div>
  );
};

export default HomeBanner;
