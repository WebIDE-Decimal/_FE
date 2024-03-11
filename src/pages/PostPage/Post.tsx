import { useNavigate, useParams } from "react-router-dom";
import AlertModal from "../../components/Modal/AlertModal/AlertModal";
import ApplyStudyModal from "../../components/Modal/ApplyStudyModal/ApplyStudyModal";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  toggleAlertModal,
  toggleApplyStudyModal,
} from "../../store/modal/modalSlice";
import Comments from "./Comments/Comments";

const Post = () => {
  const { posts } = useAppSelector((state) => state.posts);
  const { id } = useParams();
  const post = { ...posts.filter((post) => post.id === id)[0] };
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { viewApplyStudyModal, viewAlertModal } = useAppSelector(
    (state) => state.modal
  );
  const handleRemoveClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    dispatch(toggleAlertModal(true));
  };

  const handleEditClick = () => {
    navigate(`/write/${post.id}`);
  };

  const handleApplyClick = () => {
    dispatch(toggleApplyStudyModal(true));
  };

  return (
    <div className="w-full flex flex-col items-center justify-center">
      {viewApplyStudyModal && <ApplyStudyModal />}
      {viewAlertModal && (
        <AlertModal
          text={"모집글을 삭제하시겠습니까?"}
          id={post.id}
          type={"삭제하기"}
        />
      )}
      <div className="w-full flex items-center justify-center mt-4">
        <h2 className="text-title font-semibold text-5xl">CosMo&apos;s</h2>
      </div>
      <div className="mt-8">
        <h2 className="text-white font-bold text-3xl">{post.title}</h2>
      </div>
      <div className="flex items-center justify-between w-3/5 mt-8 mb-6">
        <p className="font-semibold text-2xl text-white">
          모집인원: <span className="text-forestGreen">{post.recruit}</span>명
        </p>
        <div className="bg-skyBlue py-2 px-3 rounded-lg">
          <span className="text-xl font-medium">모집중</span>
        </div>
      </div>
      <div className="w-3/5 my-4">
        <p className="font-semibold text-2xl text-white">스터디 정보:</p>
        <div className="mt-2 bg-btnwhite/90 rounded">
          <p className="p-3 font-medium">{post.content}</p>
        </div>
      </div>
      <div className="w-3/5">
        <Comments />
      </div>
      <div onClick={handleApplyClick} className="bg-gold my-6 rounded-lg">
        <button className="px-4 py-3 text-navy font-semibold text-lg">
          신청하기
        </button>
      </div>
      <div>
        <button
          className="bg-gray rounded-lg mx-2 px-4 py-3 text-white/80 font-semibold text-lg"
          onClick={handleRemoveClick}
        >
          삭제하기
        </button>
        <button
          className="bg-green/80 mx-2 rounded-lg px-4 py-3 font-semibold text-lg"
          onClick={handleEditClick}
        >
          수정하기
        </button>
      </div>
    </div>
  );
};

export default Post;
