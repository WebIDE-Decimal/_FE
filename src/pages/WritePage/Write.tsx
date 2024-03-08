import { useRef, useState } from "react";
import { MdGroups } from "react-icons/md";
import { SlMinus, SlPlus } from "react-icons/sl";
import { useNavigate, useParams } from "react-router-dom";
import { v4 } from "uuid";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { addPost, editPost } from "../../store/posts/posts.slice";
import { toast } from "react-toastify";

const Write = () => {
  const { id } = useParams();
  const { posts } = useAppSelector((state) => state.posts);
  const post = { ...posts.filter((post) => post.id === id)[0] };
  const [peopleNumber, setPeopleNumber] = useState(post?.recruit || 1);
  const [title, setTitle] = useState(post?.title || "");
  const [content, setContent] = useState(post?.content || "");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const handleMinusClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (peopleNumber === 1) {
      return;
    }
    setPeopleNumber(peopleNumber - 1);
  };

  const handlePlusClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setPeopleNumber(peopleNumber + 1);
  };

  const handleRecruitClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();

    if (title === "") {
      titleRef.current?.focus();
      toast.warning("스터디 이름을 입력하세요!");
      return;
    }

    if (content === "") {
      contentRef.current?.focus();
      toast.warning("스터디 설명을 입력하세요!");
      return;
    }

    const newPost = {
      id: v4(),
      title,
      author: "정개똥",
      recruit: peopleNumber,
      content,
    };

    dispatch(addPost(newPost));
    navigate(`/`);
    toast.success("모집 글이 등록되었습니다.");
  };

  const handleEditClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();
    if (title === "") {
      titleRef.current?.focus();
      toast.warning("스터디 이름을 입력하세요!");
      return;
    }

    if (content === "") {
      contentRef.current?.focus();
      toast.warning("스터디 설명을 입력하세요!");
      return;
    }

    const editedPost = {
      id: post.id,
      title,
      content,
      recruit: peopleNumber,
    };

    dispatch(editPost(editedPost));
    navigate(`/post/${post.id}`);
    toast.success("글이 수정되었습니다.");
  };

  return (
    <div>
      <div className="w-full mt-4">
        <h2 className="text-title text-center font-semibold text-5xl">
          CosMo&apos;s
        </h2>
      </div>
      <div className="w-full mt-6 bg-writeSubBg">
        <p className="text-2xl italic font-semibold pt-4 pl-6 text-btnwhite">
          스터디 모집
        </p>
        <div className="text-lg pl-6 font-medium py-2 text-btnwhite italic">
          <span>함께할 팀원을 모집해 보세요!</span>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <form className="w-3/4 shadow-writeShadow px-8">
          <div className="pt-6 pb-4">
            <span className="text-2xl text-white font-medium">
              스터디 이름:{" "}
            </span>
            <div className="my-3">
              <input
                ref={titleRef}
                className="w-full h-12 text-xl rounded-md pl-2 placeholder:text-lg placeholder:font-medium"
                type="text"
                placeholder="스터디 이름을 입력하세요."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </div>
          <div className="flex w-1/5 items-center my-4">
            <p className="text-2xl flex-grow font-medium text-white">
              모집 인원
            </p>
            <div className="flex w-1/2 justify-between">
              <button
                className="text-white text-2xl"
                onClick={handleMinusClick}
              >
                <SlMinus />
              </button>
              <p className="text-3xl text-green/80"> {peopleNumber} </p>
              <button className="text-white text-2xl" onClick={handlePlusClick}>
                <SlPlus />
              </button>
            </div>
          </div>
          <div className="pt-4">
            <span className="text-2xl text-white font-medium">
              스터디 설명:{" "}
            </span>
            <div className="my-3">
              <textarea
                ref={contentRef}
                className="resize-none w-full h-96 rounded-md p-2 text-lg"
                placeholder="어떤 스터디를 만들고 싶은지 소개해 주세요."
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-center border-t-2 border-gray/40 my-6">
            {post.id ? (
              <div
                className="text-btnwhite flex items-center mt-6 bg-loginBtn px-4 py-3 rounded-lg"
                onClick={handleEditClick}
              >
                <button>수정하기</button>
              </div>
            ) : (
              <div
                className="text-btnwhite flex items-center mt-6 bg-loginBtn px-4 py-3 rounded-lg"
                onClick={handleRecruitClick}
              >
                <MdGroups className="absolute text-2xl" />
                <button className="ml-8">팀원 모집하기</button>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Write;
