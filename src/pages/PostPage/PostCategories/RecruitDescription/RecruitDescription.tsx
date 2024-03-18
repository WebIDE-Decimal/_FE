
import React from "react";
import { Post } from "../../../../store/posts/post.type.ts";
interface Post {
  id: string;
  title: string;
  content: string;
  // post 객체에 포함된 다른 필요한 필드들을 여기에 추가하세요.
}

interface RecruitDescriptionProps {
  post: Post;
}


interface RecruitDescriptionProps {
  post: Post;
}

const RecruitDescription: React.FC<RecruitDescriptionProps>: React.FC<RecruitDescriptionProps> = ({ post }) => {
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
