import { useNavigate } from "react-router-dom";
interface Post {
  id: string;
  title: string;
  content: string;
  // post 객체에 포함된 다른 필요한 필드들을 여기에 추가하세요.
}

interface RecruitDescriptionProps {
  post: Post;
}
const Study = ({ post }: RecruitDescriptionProps) => {
  const navigate = useNavigate();

  const handlePostClick = () => {
    navigate(`../post/${post.id}`);
  };

  const truncate = (str: string, n: number) => {
    return str?.length > n ? str.substring(0, n - 1) + "..." : str;
  };
  return (
    <div className={"w-full pt-4 flex mb-10 justify-center"}>
      <li
        onClick={handlePostClick}
        className={
          "bg-studyCardBg/80 w-3/5 h-48 flex flex-col justify-between flex-shrink-0 rounded-lg shadow-cardShadow hover:shadow-hoverShadow"
        }
      >
        <div className={"flex px-6 py-4"}>
          <p className={"font-bold text-darkgreen pr-4"}>모집중</p>
          <p className={"font-bold text-white/80"}>{post.title}</p>
        </div>
        <div className={"px-6"}>
          <p className={"font-light text-white"}>
            {truncate(post.content, 180)}
          </p>
        </div>
        <div className={"flex justify-end items-center pr-3 pb-2"}>
          <span className={"text-[#898686]"}>모집인원 1/3</span>
        </div>
      </li>
    </div>
  );
};

export default Study;
