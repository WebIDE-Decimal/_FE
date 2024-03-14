import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/layout/Layout";
import Login from "./pages/LoginPage/LoginPage";
import SignUp from "./pages/SignUpPage/SignUp";
import ResetPassword from "./pages/ResetPage/ResetPassword";
import Post from "./pages/PostPage/Post";
import Write from "./pages/WritePage/Write";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import My from "./pages/MyPage/My";
import Home from "./pages/HomePage/Home.tsx";
import Recruit from "./pages/RecruitPage/Recruit.tsx";
import Chat from "./pages/ChatPage/Chat.tsx";
import VideoChat from "./pages/VideoChatPage/VideoChat.tsx";

function App() {
  return (
    <div>
      <ToastContainer
        position="bottom-right"
        theme="dark"
        pauseOnHover
        autoClose={2500}
      />

      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/recruit" element={<Recruit />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/reset" element={<ResetPassword />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="write" element={<Write />} />
          <Route path="write/:id" element={<Write />} />
          <Route path="mypage" element={<My />} />
          <Route path="chat" element={<Chat />} />
          <Route path="videoChat" element={<VideoChat />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
