const Withdrawal = () => {
  return (
    <div className="flex w-full flex-col h-96 justify-center items-center">
      <div className="flex flex-col items-center">
        <p className="text-white text-2xl mb-2">회원 탈퇴</p>
        <span className="pb-3 text-warning font-semibold">
          회원 탈퇴를 하게 되면 저장된 모든 자료가 삭제되며 복구할 수 없습니다.
        </span>
        <span className="text-white pt-3 text-lg">
          회원 탈퇴를 위해 비밀번호를 재입력 하세요.
        </span>
      </div>
      <div className="flex w-96 flex-col my-4">
        <input
          type="password"
          className="h-10 rounded-lg px-3"
          placeholder="비밀번호를 입력하세요."
        />
        <div className="mt-4">
          <button className="float-right bg-loginBtn text-btnwhite px-3 py-2 rounded-lg hover:cursor-pointer">
            회원 탈퇴
          </button>
        </div>
      </div>
    </div>
  );
};

export default Withdrawal;
