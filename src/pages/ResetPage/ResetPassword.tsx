import { Link } from "react-router-dom";

const ResetPassword = () => {
  return (
    <div className="bg-back w-full min-h-screen flex flex-col justify-center items-center">
      <div className="w-1/3 flex flex-col items-center mb-48">
        <div className="w-full mb-4">
          <h2 className="text-title text-center font-semibold text-5xl">
            CosMo&apos;s
          </h2>
          <p className="text-center font-semibold text-white/90 text-2xl my-6">
            비밀번호 재설정
          </p>
          <p className="text-center text-white/80">
            가입한 이메일 주소를 입력해주세요.
            <br />
            이메일 인증 완료 후 비밀번호를 재설정할 수 있습니다.
          </p>
        </div>
        <form className="w-full">
          <div className="my-4">
            <input
              className="w-full h-12 pl-4 rounded-md placeholder:font-medium placeholder:text-lg"
              type="text"
              placeholder="이메일"
            />
          </div>
          <div className="flex justify-between items-center">
            <Link className="text-sky-500 hover:text-sky-400" to={`/login`}>
              로그인으로 돌아가기
            </Link>
            <button className="my-2 px-4 font-semibold bg-loginBtn text-btnwhite h-12 rounded-md hover:bg-login">
              인증 메일 전송
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
