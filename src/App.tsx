import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/layout/Layout";
import HomePage from "./pages/HomePage/HomePage";
import Login from "./pages/LoginPage/LoginPage";
import SignUp from "./pages/SignUpPage/SignUp";
import ResetPassword from "./pages/ResetPage/ResetPassword";
import Post from "./pages/PostPage/Post";
import Write from "./pages/WritePage/Write";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import My from "./pages/MyPage/My";
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
          <Route index element={<HomePage />} />
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
