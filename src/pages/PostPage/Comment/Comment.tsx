const Comment = () => {
  return (
    <div>
      <div className="mt-2">
        <p className="font-semibold text-2xl text-white">댓글</p>
      </div>
      <form className="mt-4">
        <textarea
          className="resize-none w-full h-40 rounded-lg p-2"
          placeholder="코멘트를 작성하세요."
        />
        <div>
          <button className="bg-gray/90 rounded-lg float-end px-3 py-2 hover:text-white hover:bg-gray text-white/70 font-semibold text-lg">
            댓글쓰기
          </button>
        </div>
      </form>
    </div>
  );
};

export default Comment;
