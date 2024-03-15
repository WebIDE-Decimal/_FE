import { Link } from "react-router-dom";
import { useState } from "react";

const RecruitCategory = () => {
  const [checkbox, setCheckbox] = useState({
    total: true,
    proceeding: false,
    finished: false,
  });

  return (
    <div className={"w-1/3 my-3 mb-12"}>
      <div className={"float-right h-full border-r border-gray/30 pr-16"}>
        <div className={"pb-4"}>
          <input
            id={"total-check"}
            className={"w-5 hover:cursor-pointer"}
            type={"checkbox"}
            checked={checkbox.total}
            onChange={() =>
              setCheckbox({ total: true, proceeding: false, finished: false })
            }
          />
          <label
            htmlFor={"total-check"}
            className={
              "pl-2 text-xl text-white font-medium hover:cursor-pointer"
            }
          >
            전체보기
          </label>
        </div>
        <div className={"pb-4"}>
          <input
            id={"recruiting"}
            className={"w-5 hover:cursor-pointer"}
            type={"checkbox"}
            checked={checkbox.proceeding}
            onChange={() =>
              setCheckbox({ total: false, proceeding: true, finished: false })
            }
          />
          <label
            htmlFor={"recruiting"}
            className={
              "pl-2 text-xl text-white font-medium hover:cursor-pointer"
            }
          >
            모집 중
          </label>
        </div>
        <div>
          <input
            id={"finished"}
            className={"w-5 hover:cursor-pointer"}
            type={"checkbox"}
            checked={checkbox.finished}
            onChange={() =>
              setCheckbox({ total: false, proceeding: false, finished: true })
            }
          />
          <label
            htmlFor={"finished"}
            className={
              "pl-2 text-xl text-white font-medium hover:cursor-pointer"
            }
          >
            모집 완료
          </label>
        </div>
        <Link to={`/write`}>
          <button
            className={
              "bg-darkgreen mt-8 text-white font-bold px-6 py-2 rounded"
            }
          >
            직접 작성하기
          </button>
        </Link>
      </div>
    </div>
  );
};

export default RecruitCategory;
