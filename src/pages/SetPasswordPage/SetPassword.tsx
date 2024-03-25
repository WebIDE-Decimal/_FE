import { useSearchParams } from "react-router-dom";

const setPassword = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const type = searchParams.get("type");
  const token = searchParams.get("token");
  console.log(type, token);

  return <div>패스워드 입력 페이지</div>;
};

export default setPassword;
