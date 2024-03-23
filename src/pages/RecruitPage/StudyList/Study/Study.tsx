import { Link } from "react-router-dom";
import { Post } from "../../../../store/posts/post.type.ts";
import { FC } from "react";

interface StudyProps {
  post: Post;
}

const Study: FC<StudyProps> = ({ post }) => {
  const truncate = (str: string, n: number) => {
    return str?.length > n ? str.substring(0, n - 1) + "..." : str;
  };

  return (
    <div className={"w-full pt-4 flex mb-10 justify-center"}>
      <Link className={"w-3/5"} to={`../../../post/${post.id}`}>
        <li
          className={
            "bg-studyCardBg/80 w-full h-48 flex flex-col justify-between flex-shrink-0 rounded-lg shadow-cardShadow hover:shadow-hoverShadow"
          }
        >
          <div className={"flex max-h-[30px] px-6 py-4"}>
            <p
              className={`${post.state ? "text-darkgreen" : "text-gray/90"} font-bold pr-4`}
            >
              {post.state ? "모집중" : "모집 완료"}
            </p>
            <p className={"font-bold text-white/80"}>
              {truncate(post.title, 30)}
            </p>
          </div>
          <div className={"px-6 max-h-[100px]"}>
            <p className={"font-light text-white"}>
              {truncate(post.content, 160)}
            </p>
          </div>
          <div className={"flex justify-end items-center mr-4 mb-2"}>
            <p className={"text-[#898686]"}>
              모집인원{" "}
              <span>
                {/*{post.joinedPeople ? post.joinedPeople : 0} / {post.totalPeople}*/}
              </span>
            </p>
          </div>
        </li>
      </Link>
    </div>
  );
};

export default Study;
