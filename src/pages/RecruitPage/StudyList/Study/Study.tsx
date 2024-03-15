const Study = ({ post }) => {
  const truncate = (str: string, n: number) => {
    return str?.length > n ? str.substring(0, n - 1) + "..." : str;
  };
  return (
    <div className={"w-full pt-4 flex mb-10 justify-center"}>
      <li
        className={
          "bg-studyCardBg/80 w-3/5 h-48 flex flex-col justify-between flex-shrink-0 rounded-lg shadow-cardShadow hover:shadow-hoverShadow"
        }
      >
        <div className={"flex max-h-[30px] px-6 py-4"}>
          <p className={"font-bold text-darkgreen pr-4"}>모집중</p>
          <p className={"font-bold text-white/80"}>
            {truncate(post.title, 30)}
          </p>
        </div>
        <div className={"px-6 max-h-[100px]"}>
          <p className={"font-light text-white"}>
            {truncate(post.content, 160)}
          </p>
        </div>
        <div className={"flex justify-end items-center mr-3 mb-2"}>
          <span className={"text-[#898686]"}>모집인원 1/3</span>
        </div>
      </li>
    </div>
  );
};

export default Study;
