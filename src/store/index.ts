import { configureStore } from "@reduxjs/toolkit";
import posts from "./posts/posts.slice";
import myAccount from "./myPage/myAccount/myAccount";
import viewPage from "./myPage/viewPage/viewPage";
import modal from "./modal/modalSlice";
import comments from "./posts/comments/comments";

export const store = configureStore({
  reducer: {
    posts,
    myAccount,
    viewPage,
    modal,
    comments,
  },
});

export type RootReducer = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
