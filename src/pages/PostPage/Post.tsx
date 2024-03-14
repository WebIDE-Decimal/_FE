import { useParams } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";
import defaultUser from "../../assets/user.png";
import PostCategories from "./PostCategories/PostCategories.tsx";
import RecruitDescription from "./PostCategories/RecruitDescription/RecruitDescription.tsx";
import ApplyManagement from "./PostCategories/ApplyManagement/ApplyManagement.tsx";
import AlertModal from "../../components/Modal/AlertModal/AlertModal.tsx";

const Post = () => {
  const { posts } = useAppSelector((state) => state.posts);
  const { id } = useParams();
  const post = { ...posts.filter((post) => post.id === id)[0] };
  const { viewApplyManagement, viewRecruitDescription } = useAppSelector(
    (state) => state.postPage,
  );
  const { viewAlertModal } = useAppSelector((state) => state.modal);

  return (
    <div className={"h-full"}>
      <div className="flex justify-center h-full items-center">
        {viewAlertModal && (
          <AlertModal
            text={"게시글을 삭제하시겠습니까?"}
            type={"삭제하기"}
            id={id}
          />
        )}
        <div
          className={
            "w-3/4 flex justify-between bg-studyCardBg/80 h-[700px] rounded-lg shadow-cardShadow px-6"
          }
        >
          <div className={"w-2/3"}>
            <div className={"mt-4"}>
              <button
                className={"w-3 h-3 bg-[#F44336] mr-2 rounded-full"}
              ></button>
              <button
                className={"w-3 h-3 bg-[#FFC107] mr-2 rounded-full"}
              ></button>
              <button
                className={"w-3 h-3 bg-[#4CAF50] mr-2 rounded-full"}
              ></button>
            </div>
            <div className={"w-full mt-5 pb-4 mb-4 border-b border-[#46494E]"}>
              <div>
                <p className={"text-4xl font-bold text-white/80"}>
                  {post.title}
                </p>
                <p className={"mt-3 text-white font-bold text-lg"}>모집 현황</p>
                <div className={"flex w-1/2 items-center justify-between my-3"}>
                  <p className={"text-white"}>JAVA 스터디원</p>
                  <p className={"text-white"}>1/3</p>
                  <button
                    className={"bg-[#4CAF50] text-white rounded px-2 py-1"}
                  >
                    지원하기
                  </button>
                </div>
                <PostCategories id={id} />
              </div>
            </div>
            {viewRecruitDescription && <RecruitDescription post={post} />}
            {viewApplyManagement && <ApplyManagement />}
          </div>
          <div className={"w-1/3 mt-9"}>
            <img
              className={"float-right w-40 h-40"}
              src={defaultUser}
              alt={"Author Image"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
