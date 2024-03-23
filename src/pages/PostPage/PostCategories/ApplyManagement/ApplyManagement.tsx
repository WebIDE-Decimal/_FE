import { useEffect } from "react";
import api from "../../../../api";

type ApplyManagementProps = {
  id: number;
};

const ApplyManagement = ({ id }: ApplyManagementProps) => {
  useEffect(() => {
    response();
  }, []);

  const response = async () => {
    await api
      .get(`/recruitInfo/${id}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    return response;
  };

  return <div className={"text-white min-h-[478px]"}>ApplyManagement</div>;
};

export default ApplyManagement;
