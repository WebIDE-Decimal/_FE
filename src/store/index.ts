import { configureStore } from "@reduxjs/toolkit";
import posts from "./posts/posts.slice";
import myAccount from "./myPage/myAccount/myAccount";
import viewPage from "./myPage/viewPage/viewPage";

export const store = configureStore({
  reducer: {
    posts,
    myAccount,
    viewPage,
  },
});

export type RootReducer = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
