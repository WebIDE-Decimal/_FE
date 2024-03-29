import { Post } from "../../../../store/posts/post.type.ts";
import React from "react";
import { Link } from "react-router-dom";

type AppliedForStudyProps = {
  study: Post;
};

const AppliedForStudy: React.FC<AppliedForStudyProps> = ({ study }) => {
  const truncate = (str: string, n: number) => {
    return str?.length > n ? str.substring(0, n - 1) + "..." : str;
  };

  return (
    <div className={"w-1/3 px-4 pt-4 flex mb-10 justify-center"}>
      <Link to={`../post/${study.id}`} className={"w-full flex justify-center"}>
        <li
          className={
            "bg-studyCardBg/80 flex flex-col justify-between w-full h-48 flex-shrink-0 rounded-lg hover:cursor-pointer shadow-cardShadow hover:shadow-hoverShadow"
          }
        >
          <div className={"flex ml-3 mt-3"}>
            <p
              className={`${study.state ? "text-darkgreen" : "text-gray/90"} font-bold mr-4`}
            >
              {study.state ? "모집중" : "모집 완료"}
            </p>
            <p className={"font-bold text-white/80"}>
              {truncate(study.title, 20)}
            </p>
          </div>
          <div className={"mx-3"}>
            <p className={"font-light text-white"}>
              {truncate(study.content, 100)}
            </p>
          </div>
          <div className={"flex justify-between items-center mr-4 mb-2"}>
            <div className={"mx-3"}>
              {study.myState === "WAITING" ? (
                <p className={"text-gray font-semibold"}>수락 대기중</p>
              ) : study.myState === "APPROVE" ? (
                <p className={"text-darkgreen font-semibold"}>지원 수락</p>
              ) : (
                study.myState === "DISAPPROVE" && (
                  <p className={"text-red-500 font-semibold"}>지원 거절</p>
                )
              )}
            </div>
            <p className={"text-[#898686]"}>
              모집인원{" "}
              <span>
                {" "}
                {study.applied} / {study.recruited}
              </span>
            </p>
          </div>
        </li>
      </Link>
    </div>
  );
};

export default AppliedForStudy;
