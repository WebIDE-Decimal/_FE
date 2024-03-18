import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import defaultUser from "../../assets/user.png";
import PostCategories from "./PostCategories/PostCategories.tsx";
import RecruitDescription from "./PostCategories/RecruitDescription/RecruitDescription.tsx";
import ApplyManagement from "./PostCategories/ApplyManagement/ApplyManagement.tsx";
import AlertModal from "../../components/Modal/AlertModal/AlertModal.tsx";
import React from "react";
import { toggleApplyStudyModal } from "../../store/modal/modalSlice.ts";
import ApplyStudyModal from "../../components/Modal/ApplyStudyModal/ApplyStudyModal.tsx";

const Post = () => {
  const { posts } = useAppSelector((state) => state.posts);
  const { id } = useParams<{ id?: string }>();
  const post = posts.find((post) => post.id.toString() === id);
  const { viewApplyManagement, viewRecruitDescription } = useAppSelector(
    (state) => state.postPage
  );
  const { viewAlertModal, viewApplyStudyModal } = useAppSelector(
    (state) => state.modal
  );
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleApplyClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(toggleApplyStudyModal(true));
  };

  if (!id || !post) {
    return <div>게시글을 찾을 수 없습니다.</div>;
  }
  return (
    <div className={"h-full flex w-full"}>
      <div
        className={
          "flex w-full h-full pb-12 min-h-screen justify-center items-center"
        }
      >
        {viewAlertModal && (
          <AlertModal
            text={"게시글을 삭제하시겠습니까?"}
            type={"삭제하기"}
            id={id}
          />
        )}
        {viewApplyStudyModal && <ApplyStudyModal />}
        <div
          className={
            "w-3/4 flex mt-28 justify-between bg-studyCardBg/80 rounded-lg shadow-cardShadow px-6"
          }
        >
          <div className={"w-2/3 flex flex-col"}>
            <div className={"mt-4"}>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`../recruit`);
                }}
                className={
                  "w-3 h-3 bg-[#F44336] mr-2 rounded-full hover:bg-red-600"
                }
              ></button>
            </div>
            <div className={"w-full mt-5 pb-4 mb-4 border-b border-[#46494E]"}>
              <div>
                <div className={"w-full"}>
                  <p className={"text-4xl font-bold text-white/80"}>
                    {post.title}
                  </p>
                </div>
                <p className={"mt-3 text-white font-bold text-lg"}>모집 현황</p>
                <div className={"flex w-1/2 items-center justify-between my-3"}>
                  <p className={"text-white"}>JAVA 스터디원</p>
                  <p className={"text-white"}>1/3</p>
                  <button
                    onClick={handleApplyClick}
                    className={
                      "bg-[#4CAF50]/90 hover:bg-[#4CAF50] text-white rounded px-2 py-1"
                    }
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
          <div className={"flex flex-col items-center w-1/3 mt-9"}>
            <div>
              <img
                className={"float-right w-56 h-56"}
                src={defaultUser}
                alt={"Author Image"}
              />
            </div>
            <div className={"flex mt-4 w-full items-center justify-center"}>
              <button
                className={
                  "bg-[#FFC107] rounded font-bold text-white px-6 py-3"
                }
              >
                1 : 1 채팅하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
