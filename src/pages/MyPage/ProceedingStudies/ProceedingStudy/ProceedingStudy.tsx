import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../../api";
import { useAppSelector } from "../../../../hooks/redux";
import {
  initializeSession,
  inviteUserToSession,
} from "../../../../api/chatAPI";
import { Post } from "../../../../store/posts/post.type";

const ProceedingStudy = () => {
  const { user } = useAppSelector((state) => state.user);
  const [posts, setPosts] = useState<Post[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // GET 요청을 보내는 함수
    const fetchData = async () => {
      const URL = "recruit/myPost";

      try {
        const response = await api.get(URL);

        console.log("데이터 가져오기 성공:", response.data);
        setPosts(response.data);
      } catch (error) {
        console.error("데이터 가져오기 실패:", error);
      }
    };

    // fetchData 함수 호출
    fetchData();
  }, [user.accessToken]);

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
      {posts.map((post, index) => (
        <li
          key={index}
          className={
            "bg-studyCardBg/80 w-full h-48 flex-shrink-0 rounded-lg shadow-cardShadow hover:shadow-hoverShadow cursor-pointer"
          }
          onClick={() => handlePostClick(post)}
        >
          <div className={"flex"}>
            <p className={"font-bold text-white/80"}>{post.title}</p>
          </div>
          <div>
            <p className={"font-light text-white"}>{post.content}</p>
          </div>
        </li>
      ))}
    </div>
  );
};

export default ProceedingStudy;
