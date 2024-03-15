import PostCategory from "./PostCategory/PostCategory.tsx";

interface postProp {
  id: string;
}
const PostCategories = ({ id }: postProp) => {
  return (
    <div className={"flex w-full justify-end"}>
      <PostCategory text={"모집 내용"} id={id} />
      <PostCategory text={"지원 관리"} id={id} />
      <PostCategory text={"스터디 설정"} id={id} />
    </div>
  );
};

export default PostCategories;
