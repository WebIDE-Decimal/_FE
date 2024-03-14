import newSaly from "../../../../assets/newSaly.png";
import HomeBannerBg from "../../../../assets/HomeBannerBg.png";

const NewStudy = () => {
  return (
    <div className={"flex w-full justify-center items-center h-full"}>
      <div className={"flex justify-between h-5/6 w-3/5"}>
        <div className={"relative"}>
          <div className={"h-5/6 w-5/6"}>
            <img src={HomeBannerBg} />
          </div>
          <div className={"h-5/6 w-5/6 absolute left-14 bottom-20"}>
            <img src={newSaly} />
          </div>
        </div>
        <div
          className={"flex flex-col justify-center items-center h-full pb-10"}
        >
          <div className={"w-full"}>
            <p className={"text-4xl float-right font-bold text-white"}>
              목표를 세우고
            </p>
          </div>
          <p className={"text-4xl font-bold text-white"}>
            스터디를 진행해 보세요
          </p>
        </div>
      </div>
    </div>
  );
};

export default NewStudy;
