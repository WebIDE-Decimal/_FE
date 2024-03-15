const StudyCard = () => {
  return (
    <div className={"w-full px-4 pt-4 flex mx-1 mb-10 justify-center"}>
      <li
        className={
          "bg-studyCardBg/80 w-full h-48 flex-shrink-0 rounded-lg hover:cursor-pointer shadow-cardShadow hover:shadow-hoverShadow"
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

export default StudyCard;
