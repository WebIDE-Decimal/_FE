import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import defaultUser from "../../assets/user.png";
import PostCategories from "./PostCategories/PostCategories.tsx";
import RecruitDescription from "./PostCategories/RecruitDescription/RecruitDescription.tsx";
import ApplyManagement from "./PostCategories/ApplyManagement/ApplyManagement.tsx";
import AlertModal from "../../components/Modal/AlertModal/AlertModal.tsx";
import React, { useEffect, useState } from "react";
import { toggleApplyStudyModal } from "../../store/modal/modalSlice.ts";
import ApplyStudyModal from "../../components/Modal/ApplyStudyModal/ApplyStudyModal.tsx";
import { fetchPost } from "../../store/posts/post.slice.ts";
import api from "../../api";

const Post = () => {
  const { post } = useAppSelector((state) => state.post);
  const { id } = useParams();
  const [clickComplete, setClickComplete] = useState<boolean>(
    post?.state || true,
  );
  const { viewApplyManagement, viewRecruitDescription } = useAppSelector(
    (state) => state.postPage,
  );
  const { viewAlertModal, viewApplyStudyModal } = useAppSelector(
    (state) => state.modal,
  );
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleApplyClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(toggleApplyStudyModal(true));
  };

  useEffect(() => {
    dispatch(fetchPost(Number(id)));
  }, []);

  const handleCompleteButton = async (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    await api.patch(`/recruit/${id}/state?newState=false`).then(() => {
      setClickComplete(!post.state);
    });
  };

  if (!id && !post) {
    return <div>존재하지 않는 게시글 입니다.</div>;
  } else {
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
              id={Number(id)}
            />
          )}
          {viewApplyStudyModal && <ApplyStudyModal id={id} />}
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
              <div
                className={"w-full mt-5 pb-4 mb-4 border-b border-[#46494E]"}
              >
                <div>
                  <div className={"w-full"}>
                    <p className={"text-4xl font-bold text-white/80"}>
                      {post.title}
                    </p>
                  </div>
                  <p className={"mt-3 text-white font-bold text-lg"}>
                    모집 현황
                  </p>
                  <div className={"flex items-center justify-between my-3"}>
                    <div className={"flex"}>
                      <p className={"text-white mr-2"}>{post.target}</p>
                      <p className={"text-white ml-2"}>0 / {post.recruited}</p>
                    </div>
                    {!post.isWriter && clickComplete ? (
                      <button
                        onClick={handleApplyClick}
                        className={
                          "bg-[#4CAF50]/90 hover:bg-[#4CAF50] text-white rounded px-2 py-1"
                        }
                      >
                        지원하기
                      </button>
                    ) : (
                      post.isWriter && (
                        <button
                          onClick={handleCompleteButton}
                          className={`${!clickComplete ? "bg-[#4CAF50]/90 hover:bg-[#4CAF50]" : "bg-gray hover:cursor-not-allowed"} text-white rounded px-2 py-1`}
                        >
                          모집 완료
                        </button>
                      )
                    )}
                  </div>
                  {post.isWriter && <PostCategories id={id} />}
                </div>
              </div>
              {viewRecruitDescription && <RecruitDescription post={post} />}
              {viewApplyManagement && (
                <ApplyManagement clickComplete={clickComplete} id={id} />
              )}
            </div>
            <div className={"flex flex-col items-center w-1/3 mt-9"}>
              <div>
                <img
                  className={"float-right w-56 h-56"}
                  src={defaultUser}
                  alt={"Author Image"}
                />
              </div>
              {!post.isWriter && (
                <div className={"flex mt-4 w-full items-center justify-center"}>
                  <button
                    className={
                      "bg-[#FFC107] rounded font-bold text-white px-6 py-3"
                    }
                  >
                    1 : 1 채팅하기
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Post;
