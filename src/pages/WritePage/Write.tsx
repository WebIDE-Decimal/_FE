import React, { useRef, useState } from "react";
import { SlMinus, SlPlus } from "react-icons/sl";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { toast } from "react-toastify";
import { clickStudySettingModal } from "../../store/postPage/postPageSlice.ts";
import api from "../../api";
import { getMemberProfile, initializeSession } from "../../api/chatAPI.ts";
import { createFolder } from "../../api/folderAPI.ts";

const Write = () => {
  const { id } = useParams();
  const { post } = useAppSelector((state) => state.post);
  const [totalPeople, setTotalPeople] = useState((id && post?.recruited) || 1);
  const [title, setTitle] = useState((id && post?.title) || "");
  const [content, setContent] = useState((id && post?.content) || "");
  const [overPeople, setOverPeople] = useState(false);
  const [target, setTarget] = useState((id && post?.target) || "");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const targetRef = useRef<HTMLInputElement>(null);
  const { user } = useAppSelector((state) => state.user);
  const member = getMemberProfile(user);

  const handleMinusClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (totalPeople === 1) {
      return;
    }
    if (totalPeople === 10) {
      setOverPeople(false);
    }
    setTotalPeople(totalPeople - 1);
  };

  const handlePlusClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (totalPeople >= 10) {
      setOverPeople(true);
      return;
    }
    setTotalPeople(totalPeople + 1);
  };

  const handleRecruitClick = async (
    e: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (title === "") {
      titleRef.current?.focus();
      toast.warning("스터디 이름을 입력하세요!😠");
      return;
    }

    if (content === "") {
      contentRef.current?.focus();
      toast.warning("스터디 설명을 입력하세요!😠");
      return;
    }

    if (target === "") {
      targetRef.current?.focus();
      toast.warning("모집 대상을 입력하세요!😠");
      return;
    }

    const newPost = {
      content,
      title,
      target,
      recruited: totalPeople,
    };
    await api
      .post("/recruit", newPost)
      .then(() => {
        navigate(`/recruit`);
        const properties = {
          properties: {
            id: "ses_" + id,
            object: "session",
            createdAt: 1538481996019,
            mediaMode: "ROUTED",
            recordingMode: "MANUAL",
            defaultRecordingProperties: {
              name: "MyRecording",
              hasAudio: true,
              hasVideo: true,
              outputMode: "COMPOSED",
              recordingLayout: "BEST_FIT",
              resolution: "1280x720",
              frameRate: 25,
              shmSize: 536870912,
              mediaNode: "media_i-po39jr3e10rkjsdfj",
            },
            customSessionId: "ses_" + id,
            connections: {
              numberOfElements: 0,
              content: [],
            },
            recording: false,
            broadcasting: false,
            forcedVideoCodec: "VP8",
            allowTranscoding: false,
            mediaNodeId: "media_i-po39jr3e10rkjsdfj",
          },
        };
        initializeSession({ properties });
        if (member !== undefined && id !== null && id !== undefined) {
          createFolder({
            folderName: newPost.title,
            parentId: parseInt(id),
            fileName: newPost.title,
          });
        }
        toast.success("모집 글이 등록되었습니다.👏");
      })
      .catch((err) => console.log(err));
  };

  const handleEditClick = async (
    e: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (title === "") {
      titleRef.current?.focus();
      toast.warning("스터디 이름을 입력하세요!😠");
      return;
    }

    if (content === "") {
      contentRef.current?.focus();
      toast.warning("스터디 설명을 입력하세요!😠");
      return;
    }

    const editPost = {
      content,
      title,
      target,
      recruited: totalPeople,
    };

    await api
      .put(`/recruit/${id}`, editPost)
      .then(() => {
        dispatch(clickStudySettingModal(false));
        navigate(`/post/${post.id}`);
        toast.success("글이 수정되었습니다.👌");
      })
      .catch((err) => console.log(err));
  };

  const handleCloseClick = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (post.id) {
      navigate(-1);
      return;
    }
    navigate(`../recruit`);
  };

  return (
    <div className={"h-full"}>
      <div className="flex justify-center h-full items-center mt-24">
        <form className="w-3/4 bg-studyCardBg/80 rounded-lg shadow-cardShadow px-6">
          <div className={"mt-4"}>
            <button
              onClick={handleCloseClick}
              className={
                "w-3 h-3 bg-[#F44336] mr-2 rounded-full hover:bg-red-600"
              }
            ></button>
          </div>
          <div className="pt-6 pb-3 px-2">
            <span className="text-xl text-white font-bold">스터디 이름 *</span>
            <div className="my-3">
              <input
                ref={titleRef}
                className="w-full text-white h-12 text-xl bg-[#1b1b1b] rounded-lg pl-4 placeholder:text-lg placeholder:text-[#64758B] placeholder:font-medium"
                type="text"
                placeholder="한글명 ex) 우리 스터디"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </div>
          <div className="pb-2 px-2">
            <span className="text-xl text-white font-bold">모집 대상</span>
            <div className="my-3">
              <input
                ref={targetRef}
                onChange={(e) => setTarget(e.target.value)}
                value={target}
                className="w-full text-white h-12 text-xl bg-[#1b1b1b] rounded-lg pl-4 placeholder:text-lg placeholder:text-[#64758B] placeholder:font-medium"
                type="text"
                placeholder="JAVA, JavaScript, Node.js ..."
              />
            </div>
          </div>
          <div className="flex w-full items-center px-2">
            <p className="text-xl w-32 font-bold text-white">모집 인원</p>
            <div className="flex w-1/4 items-center">
              <div className={"flex items-center"}>
                <button
                  className="text-white/80 text-xl hover:text-white mr-8"
                  onClick={handleMinusClick}
                >
                  <SlMinus />
                </button>
                <p className="text-2xl text-green">{totalPeople}</p>
                <button
                  className="text-white/80 text-xl ml-8 hover:text-white"
                  onClick={handlePlusClick}
                >
                  <SlPlus />
                </button>
              </div>
              {overPeople && (
                <p className={"ml-4 text-warning"}>
                  최대 모집 인원은 10명 입니다.
                </p>
              )}
            </div>
          </div>
          <div className={"border-b mt-3 border-[#46494E]"} />
          <div className="pt-3 px-2">
            <span className="text-xl text-white font-bold">모집 내용 *</span>
            <div className="mt-3">
              <textarea
                ref={contentRef}
                className="resize-none placeholder:text-[#64758B] placeholder:text-lg text-white w-full h-80 bg-[#1b1b1b] rounded-lg p-4 text-lg"
                placeholder="COSMS's 에서 스터디 기반으로 회원을 모집하고 공부해보세요."
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
            <div className="flex justify-end">
              {id && post.id ? (
                <div
                  className="text-white mb-6 flex items-center mt-1 bg-darkgreen px-16 py-3 font-bold rounded"
                  onClick={handleEditClick}
                >
                  <button>수정하기</button>
                </div>
              ) : (
                <div
                  className="text-white mb-6 flex items-center mt-1 bg-darkgreen/90 px-16 py-3 font-bold rounded hover:cursor-pointer hover:bg-darkgreen"
                  onClick={handleRecruitClick}
                >
                  <button className={"text-lg"}>등록하기</button>
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Write;
