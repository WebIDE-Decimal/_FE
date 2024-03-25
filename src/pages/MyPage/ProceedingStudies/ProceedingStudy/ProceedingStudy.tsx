import { Post } from "../../../../store/posts/post.type.ts";
import React,{useNavigate} from "react";

type ProceedingStudyProps = {
  study: Post;
};

const ProceedingStudy: React.FC<ProceedingStudyProps> = ({ study }) => {
  const date = new Date(study.createdAt);
  const navigate = useNavigate();
  
  const formattedDate =
    date.getFullYear() +
    "년 " +
    ("0" + (date.getMonth() + 1)).slice(-2) +
    "월 " +
    ("0" + date.getDate()).slice(-2) +
    "일";

  // 포스트를 클릭했을 때 세션 생성 및 작성자 초대
  const handlePostClick = async (post: Post) => {
    try {
      // 세션 생성
      // const sessionId = await initializeSession({
      //   properties: { customSessionId: post.title },
      //   isPublisher: true,
      // });
      // console.log("세션 생성 완료:", sessionId);

      // // 2번 작성자를 초대
      // // await inviteUserToSession(sessionId, "2");
      // console.log("작성자 초대 완료");
      navigate(`/ide/${post.id}`);
    } catch (error) {
      console.error("세션 생성 및 초대 실패:", error);
    }
  };
  return (
    <div className={"w-1/3 px-4 pt-4 flex mb-10 justify-center"}>
      <li
        className={
          "bg-studyCardBg/80 p-3 w-full flex flex-col justify-between h-48 flex-shrink-0 rounded-lg shadow-cardShadow hover:shadow-hoverShadow"
                 
}
      onClick={() => handlePostClick(study)} >
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
