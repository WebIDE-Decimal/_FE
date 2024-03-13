const RecruitCategory = () => {
  return (
    <div className={"w-1/3 my-3"}>
      <div className={"float-right h-full border-r border-gray/30 pr-16"}>
        <div className={"pb-4"}>
          <input
            id={"total-check"}
            className={"w-5 hover:cursor-pointer"}
            type={"checkbox"}
          />
          <label
            htmlFor={"total-check"}
            className={
              "pl-2 text-xl text-white font-medium hover:cursor-pointer"
            }
          >
            전체보기
          </label>
        </div>
        <div className={"pb-4"}>
          <input className={"w-5 hover:cursor-pointer"} type={"checkbox"} />
          <label
            className={
              "pl-2 text-xl text-white font-medium hover:cursor-pointer"
            }
          >
            모집 중
          </label>
        </div>
        <div>
          <input className={"w-5 hover:cursor-pointer"} type={"checkbox"} />
          <label
            className={
              "pl-2 text-xl text-white font-medium hover:cursor-pointer"
            }
          >
            모집 완료
          </label>
        </div>
        <button
          className={"bg-darkgreen mt-8 text-white font-bold px-6 py-2 rounded"}
        >
          직접 작성하기
        </button>
      </div>
    </div>
  );
};

export default RecruitCategory;
