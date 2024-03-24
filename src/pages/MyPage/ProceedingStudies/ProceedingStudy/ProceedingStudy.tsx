import { Post } from "../../../../store/posts/post.type.ts";
import React from "react";

type ProceedingStudyProps = {
  study: Post;
};

const ProceedingStudy: React.FC<ProceedingStudyProps> = ({ study }) => {
  const date = new Date(study.createdAt);
  const formattedDate =
    date.getFullYear() +
    "년 " +
    ("0" + (date.getMonth() + 1)).slice(-2) +
    "월 " +
    ("0" + date.getDate()).slice(-2) +
    "일";

  return (
    <div className={"w-1/3 px-4 pt-4 flex mb-10 justify-center"}>
      <li
        className={
          "bg-studyCardBg/80 p-3 w-full flex flex-col justify-between h-48 flex-shrink-0 rounded-lg shadow-cardShadow hover:shadow-hoverShadow"
        }
      >
        <div className={"flex"}>
          <p className={"font-bold text-white/80"}>{study.title}</p>
        </div>
        <div>
          <p className={"font-light text-white"}>{study.content}</p>
        </div>
        <div>
          <p className={"font-light text-white"}>
            스터디 시작일: {formattedDate}
          </p>
        </div>
      </li>
    </div>
  );
};

export default ProceedingStudy;
