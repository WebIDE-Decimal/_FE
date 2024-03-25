import StudyCard from "../../../../components/Card/StudyCard/StudyCard.tsx";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux.ts";
import { useEffect } from "react";
import { fetchPosts } from "../../../../store/posts/posts.slice.ts";

const NewStudyBottom = () => {
  const dispatch = useAppDispatch();
  const { posts } = useAppSelector((state) => state.posts);
  const newPosts = posts?.slice(0, 3) || [];

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  if (newPosts.length === 0) {
    return (
      <div className={"text-white font-medium text-2xl"}>
        신규 게시글이 없습니다.
      </div>
    );
  }

  return (
    <div className={"w-4/6 flex items-center justify-center"}>
      <div className={"w-full flex flex-col"}>
        <div className={"flex justify-between"}>
          <div>
            <p className={"text-white font-medium text-3xl"}>신규 스터디</p>
            <span className={"text-lg text-[#898686] font-medium"}>
              새로 생긴 프로젝트에 참여해보세요!
            </span>
          </div>
          <Link to={"/recruit"}>
            <div>
              <p
                className={
                  "text-lg text-white/80 hover:cursor-pointer hover:text-white hover:font-medium"
                }
              >
                모두 보기{">"}
              </p>
            </div>
          </Link>
        </div>
        <div
          className={"w-full mt-10 list-none flex justify-center items-center"}
        >
          {newPosts.map((post) => (
            <StudyCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewStudyBottom;
