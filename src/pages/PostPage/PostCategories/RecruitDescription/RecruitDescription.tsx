import React from "react";
import { Post } from "../../../../store/posts/post.type.ts";

interface RecruitDescriptionProps {
  post: Post;
}

const RecruitDescription: React.FC<RecruitDescriptionProps> = ({ post }) => {
  return (
    <>
      <div className={"w-full h-full"}>
        <p className={"text-white font-bold text-xl mb-4"}>모집 내용</p>
        <div className={"h-full pb-16"}>
          <p
            className={
              "p-4 text-white h-[370px] bg-[#1b1b1b] rounded-lg font-light max-h-[370px] overflow-y-auto scrollbar-thin scrollbar-thumb-studyCardBg scrollbar-track-gray"
            }
          >
            {post.content}
          </p>
        </div>
      </div>
    </>
  );
};

export default RecruitDescription;
