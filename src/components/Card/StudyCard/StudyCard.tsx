import { Post } from "../../../store/posts/post.type.ts";
import { Link } from "react-router-dom";

type StudyCardProps = {
  post: Post;
};

const StudyCard = ({ post }: StudyCardProps) => {
  const truncate = (str: string, n: number) => {
    return str?.length > n ? str.substring(0, n - 1) + "..." : str;
  };
  return (
    <Link
      to={`../post/${post.id}`}
      className={"w-1/3 px-4 pt-4 flex mx-1 mb-10 justify-center"}
    >
      <li
        className={
          "bg-studyCardBg/80 flex flex-col justify-between w-full h-48 flex-shrink-0 rounded-lg hover:cursor-pointer shadow-cardShadow hover:shadow-hoverShadow"
        }
      >
        <div className={"flex ml-3 mt-3"}>
          <p
            className={`${post.state ? "text-darkgreen" : "text-gray/90"} font-bold mr-4`}
          >
            {post.state ? "모집중" : "모집 완료"}
          </p>
          <p className={"font-bold text-white/80"}>
            {truncate(post.title, 20)}
          </p>
        </div>
        <div className={"mx-3"}>
          <p className={"font-light text-white"}>
            {truncate(post.content, 100)}
          </p>
        </div>
        <div className={"flex justify-end items-center mr-4 mb-2"}>
          <p className={"text-[#898686]"}>
            모집인원{" "}
            <span>
              {" "}
              {post.applied} / {post.recruited}
            </span>
          </p>
        </div>
      </li>
    </Link>
  );
};

export default StudyCard;
