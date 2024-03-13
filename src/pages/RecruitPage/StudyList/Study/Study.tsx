const Study = ({ post }) => {
  return (
    <div className={"w-full pt-4 flex mb-10 justify-center"}>
      <li
        className={
          "bg-studyCardBg/80 w-3/5 h-48 flex-shrink-0 rounded-lg shadow-cardShadow hover:shadow-hoverShadow"
        }
      >
        <div className={"flex"}>
          <p className={"font-bold text-darkgreen"}>모집중</p>
          <p className={"font-bold text-white/80"}>{post.title}</p>
        </div>
        <div>
          <p className={"font-light text-white"}>{post.content}</p>
        </div>
      </li>
    </div>
  );
};

export default Study;
