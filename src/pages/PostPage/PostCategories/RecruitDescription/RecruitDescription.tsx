const RecruitDescription = ({ post }) => {
  return (
    <>
      <div className={"h-80 w-full"}>
        <p className={"text-white font-bold text-xl mb-4"}>모집 내용</p>
        <p
          className={
            "p-4 text-white bg-[#1b1b1b] rounded-lg font-light max-h-[260px] overflow-y-auto scrollbar-thin scrollbar-thumb-studyCardBg scrollbar-track-gray"
          }
        >
          {post.content}
        </p>
      </div>
      <div className={"w-full"}>
        <p className={"text-white font-bold text-xl mb-4"}>지원 현황</p>
        <div className={"flex w-1/2 items-center justify-between"}>
          <p className={"text-white font-light"}>JAVA 스터디원</p>
          <span className={"text-white font-light"}>3</span>
          <button className={"bg-[#4CAF50] text-white rounded px-1 py-1"}>
            지원자 확인
          </button>
        </div>
      </div>
    </>
  );
};

export default RecruitDescription;
