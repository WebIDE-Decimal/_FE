import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";

const Post = () => {
  const { posts } = useAppSelector((state) => state.posts);
  const navigate = useNavigate();

  const truncate = (str: string, n: number) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };

  return (
    <>
      {posts &&
        posts.map((post) => (
          <li
            key={post.id}
            onClick={() => navigate(`/post/${post.id}`)}
            className="list-none w-96 h-48 mx-8 mt-10 rounded-lg hover:drop-shadow-shadow hover:cursor-pointer bg-white"
          >
            <div className="m-3">
              <div className="mb-2">
                <p className="text-xl">
                  <span>스터디 이름: </span>
                  {post.title}
                </p>

                <p>
                  <span>작성자: </span>
                  {post.author}
                </p>
              </div>
              <div className="mb-2">
                <p className="text-lg">
                  <span>모집 인원: </span>
                  {post.recruit}
                </p>
              </div>
              <div>
                <p>
                  <span className="text-lg">스터디 설명: </span>
                  {truncate(post?.content, 80)}
                </p>
              </div>
            </div>
          </li>
        ))}
    </>
  );
};

export default Post;
