import { configureStore } from "@reduxjs/toolkit";
import posts from "./posts/posts.slice";
import myAccount from "./myPage/myAccount/myAccountSlice.ts";
import viewPage from "./myPage/viewPage/viewPageSlice.ts";
import modal from "./modal/modalSlice";

import postPage from "./postPage/postPageSlice.ts";
import chatPage from "./chatPage/chatPageSlice.ts";
import openViduReducer from "./openVidu/openViduSlice.ts";

export const store = configureStore({
  reducer: {
    posts,
    myAccount,
    viewPage,
    modal,
    postPage,
    chatPage,
    openViduReducer,
  },
});

export type RootReducer = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
