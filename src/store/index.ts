import { configureStore } from "@reduxjs/toolkit";
import posts from "./posts/posts.slice";
import myAccount from "./myPage/myAccount/myAccountSlice.ts";
import viewPage from "./myPage/viewPage/viewPageSlice.ts";
import modal from "./modal/modalSlice";
import user from "./user/user.slice.ts";
import postPage from "./postPage/postPageSlice.ts";
import chatPage from "./chatPage/chatPageSlice.ts";
import openViduReducer from "./openVidu/openViduSlice.ts";
import postCategories from "./posts/postCategories.slice.ts";
import post from "./posts/post.slice.ts";
import chatReducer from "./chatPage/chatSlice.ts";

export const store = configureStore({
  reducer: {
    posts,
    myAccount,
    post,
    viewPage,
    modal,
    postPage,
    chatPage,
    user,
    openViduReducer,
    postCategories,
    chatReducer,
  },
});

export type RootReducer = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
