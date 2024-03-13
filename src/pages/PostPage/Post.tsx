import { useParams } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";
import defaultUser from "../../assets/user.png";

const Post = () => {
  const { posts } = useAppSelector((state) => state.posts);
  const { id } = useParams();
  const post = { ...posts.filter((post) => post.id === id)[0] };

  return (
    <div className={"h-full"}>
      <div className="flex justify-center h-full items-center">
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
            <div className={"w-full mt-5"}>
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
              </div>
              <div
                className={
                  "flex w-full justify-end pb-4 mb-4 border-b border-[#46494E]"
                }
              >
                <div className={"border-x border-white"}>
                  <span
                    className={
                      "mx-3 text-lg text-[#818181] font-medium hover:text-[#fdfdfd] hover:cursor-pointer"
                    }
                  >
                    모집 내용
                  </span>
                </div>
                <div>
                  <span
                    className={
                      "px-3 text-lg text-[#818181] font-medium hover:text-[#fdfdfd] hover:cursor-pointer"
                    }
                  >
                    지원 관리
                  </span>
                </div>
                <div className={"border-x border-white"}>
                  <span
                    className={
                      "px-3 text-lg text-[#818181] font-medium hover:text-[#fdfdfd] hover:cursor-pointer"
                    }
                  >
                    스터디 설정
                  </span>
                </div>
              </div>
            </div>
            <div className={"h-80 w-full"}>
              <p className={"text-white font-bold text-xl mb-4"}>모집 내용</p>
              <p className={"pl-4 text-white font-light"}>{post.content}</p>
            </div>
            <div className={"w-full"}>
              <p className={"text-white font-bold text-xl mb-4"}>지원 현황</p>
              <div className={"flex w-1/2 items-center justify-between"}>
                <p className={"text-white font-light"}>JAVA 스터디원</p>
                <span className={"text-white font-light"}>3</span>
                <button className={"bg-[#4CAF50] text-white rounded px-1 py-1"}>
                  지원자 확인
                </button>
              </div>
            </div>
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
