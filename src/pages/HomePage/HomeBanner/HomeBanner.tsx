import NewStudy from "./NewStudy/NewStudy.tsx";
import NewStudyBottom from "./NewStudy/NewStudyBottom.tsx";

const HomeBanner = () => {
  return (
    <div className={"w-full h-full flex flex-col"}>
      <div className={"w-full py-14 bg-[#2F3031]"}>
        <NewStudy />
      </div>
      <div className={"w-full py-14 flex items-center justify-center"}>
        <NewStudyBottom />
      </div>
    </div>
  );
};

export default HomeBanner;
