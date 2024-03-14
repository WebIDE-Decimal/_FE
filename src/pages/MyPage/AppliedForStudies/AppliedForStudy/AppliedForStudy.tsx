const AppliedForStudy = () => {
  const truncate = (str: string, n: number) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };

  return (
    <div className={"w-1/3 px-4 pt-4 flex mb-10 justify-center"}>
      <li
        className={
          "bg-studyCardBg/80 w-full h-48 flex-shrink-0 rounded-lg shadow-cardShadow hover:shadow-hoverShadow"
        }
      >
        <div className={"flex"}>
          <p className={"font-bold text-white/80"}></p>
        </div>
        <div>
          <p className={"font-light text-white"}></p>
        </div>
      </li>
    </div>
  );
};

export default AppliedForStudy;
