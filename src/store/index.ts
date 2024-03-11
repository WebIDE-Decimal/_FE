import { configureStore } from "@reduxjs/toolkit";
import posts from "./posts/posts.slice";
import myAccount from "./myPage/myAccount/myAccount";
import viewPage from "./myPage/viewPage/viewPage";
import modal from "./modal/modalSlice";

export const store = configureStore({
  reducer: {
    posts,
    myAccount,
    viewPage,
    modal,
  },
});

export type RootReducer = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
