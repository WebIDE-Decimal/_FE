const MyStudy = () => {
  return (
    <div className="w-full">
      <div className="flex w-full border-b border-gray/30 py-6 ">
        <div className="pl-6">
          <span className="text-gray font-medium text-lg hover:text-white hover:cursor-pointer">
            진행중인 스터디
          </span>
        </div>
        <div className="pl-4">
          <span className="text-gray font-medium text-lg hover:text-white hover:cursor-pointer">
            내가 신청한 스터디
          </span>
        </div>
        <div className="pl-4">
          <span className="text-gray font-medium text-lg hover:text-white hover:cursor-pointer">
            종료된 스터디
          </span>
        </div>
      </div>
    </div>
  );
};

export default MyStudy;
