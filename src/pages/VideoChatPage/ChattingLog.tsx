// ChattingLog.tsx
import React from "react";

interface TextData {
  myStreamId: string;
  connectionId: string;
  message: string;
}

interface ChattingLogProps {
  textData: TextData;
}

const ChattingLog: React.FC<ChattingLogProps> = ({ textData }) => {
  const isMyMessage = textData.connectionId !== textData.myStreamId;

  return (
    <div className={`p-2 ${isMyMessage ? "text-right" : ""}`}>
      <span
        className={`inline-block p-2 rounded-lg ${isMyMessage ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"}`}
      >
        {textData.message}
      </span>
    </div>
  );
};

export default ChattingLog;
