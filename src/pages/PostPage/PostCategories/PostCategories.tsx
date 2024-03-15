import PostCategory from "./PostCategory/PostCategory.tsx";

interface PostCategoriesProps {
  id?: string;
}
const PostCategories = ({ id }: PostCategoriesProps) => {
  return (
    <div className={"flex w-full justify-end"}>
      <PostCategory text={"모집 내용"} />
      <PostCategory text={"지원 관리"} />
      <PostCategory text={"스터디 설정"} id={id} />
    </div>
  );
};

export default PostCategories;
