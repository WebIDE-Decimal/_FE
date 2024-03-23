import { useEffect, useState } from "react";
import api from "../../../../api";
import Applicant from "./Applicant/Applicant.tsx";

type ApplyManagementProps = {
  id: number;
};

const ApplyManagement = ({ id }: ApplyManagementProps) => {
  const [totalApplies, setTotalApplies] = useState([]);

  useEffect(() => {
    response();
  }, []);

  console.log(totalApplies);

  const response = async () => {
    await api
      .get(`/recruitInfo/${id}`)
      .then((res) => setTotalApplies(res.data))
      .catch((err) => console.log(err));
    return response;
  };

  return (
    <div className={"text-white min-h-[478px]"}>
      {totalApplies.length !== 0 ? (
        totalApplies.map((apply) => (
          <Applicant key={apply.motivation} apply={apply} />
        ))
      ) : (
        <div className={"text-white text-3xl text-center"}>
          지원자가 없습니다.
        </div>
      )}
    </div>
  );
};

export default ApplyManagement;
