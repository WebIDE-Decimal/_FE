import { useState, useRef, useEffect } from "react";
import { Editor } from "@monaco-editor/react";
import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";
import { MonacoBinding } from "y-monaco";
import { editor } from "monaco-editor";

const serverWsUrl = import.meta.env.VITE_SERVER_WS_URL;
// const serverWsUrl = "wss://localhost:8080/api";

export default function Editors() {
  const editorRef = useRef<editor.IStandaloneCodeEditor>();
  const [language, setLanguage] = useState<string>("javascript");
  const [editorValue, setEditorValue] = useState("// your code here");

  function handleEditorDidMount(editor: editor.IStandaloneCodeEditor) {
    editorRef.current = editor;

    // Initialize yjs
    const doc = new Y.Doc(); // collection of shared objects

    // Connect to peers with WebSocket
    const provider: WebsocketProvider = new WebsocketProvider(
      serverWsUrl,
      "change",
      doc
    );

    const type = doc.getText("monaco");

    // Bind yjs doc to Manaco editor
    const binding = new MonacoBinding(
      type,
      editorRef.current!.getModel()!,
      new Set([editorRef.current!])
    );
  }

  useEffect(() => {
    // Subscribe to changes in the Yjs document
    editorRef.current!.onDidChangeModelContent((event) => {
      const content = editorRef.current!.getValue();
      // Send content changes to the server via WebSocket
      // You need to implement this part to send content changes to the server
    });
  }, []);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
  };

  return (
    <>
      <select value={language} onChange={handleLanguageChange}>
        <option value="javascript">JavaScript</option>
        <option value="typescript">TypeScript</option>
        <option value="html">HTML</option>
        <option value="css">CSS</option>
        <option value="java">Java</option>
        <option value="python">Python</option>
      </select>
      <Editor
        height="90vh"
        language={language}
        defaultValue={editorValue}
        theme="vs-dark"
        onMount={handleEditorDidMount}
      />
    </>
  );
}
