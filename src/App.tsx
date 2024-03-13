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
import Recruit from "./pages/RecruitPage/Recruit.tsx";

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
          <Route path="/" element={<Recruit />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/reset" element={<ResetPassword />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="write" element={<Write />} />
          <Route path="write/:id" element={<Write />} />
          <Route path="mypage" element={<My />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
