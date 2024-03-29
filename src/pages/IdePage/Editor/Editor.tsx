import { useRef, useState, useEffect } from "react";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import { io, Socket } from "socket.io-client";

interface CodeChangeDto {
  userId: string;
  fileId: number;
  sessionId: string;
  content: string;
  timestamp: number;
}

const Editor = ({ sessionId }: { sessionId: string }) => {
  const [editor, setEditor] =
    useState<monaco.editor.IStandaloneCodeEditor | null>(null);
  const monacoEl = useRef<HTMLDivElement>(null);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (monacoEl.current && !editor) {
      const newEditor = monaco.editor.create(monacoEl.current, {
        value: ["function x() {", '\tconsole.log("Hello world!");', "}"].join(
          "\n"
        ),
        language: "typescript",
        theme: "vs-dark",
      });

      newEditor.onDidChangeModelContent((event) => {
        const content = newEditor.getValue();
        const dto: CodeChangeDto = {
          userId: "1", // Replace with actual user ID
          fileId: 1, // Replace with actual file ID
          sessionId: sessionId, // Replace with actual session ID
          content: content,
          timestamp: Date.now(),
        };

        // 웹소켓을 통해 서버로 데이터 전송
        if (socket) {
          socket.emit("changes", dto);
        }
      });

      setEditor(newEditor);
    }

    return () => {
      editor?.dispose();
    };
  }, [editor, sessionId, socket]);

  useEffect(() => {
    const newSocket = io("wss://groomcosmos.site/wss/"); // 웹소켓 서버 주소에 맞게 설정
    setSocket(newSocket);

    console.log("socketconnected");
    return () => {
      newSocket.disconnect();
    };
  }, []);

  return <div className="w-full h-full" ref={monacoEl}></div>;
};

export default Editor;
