import { configureStore } from "@reduxjs/toolkit";
import posts from "./posts/posts.slice";

export const store = configureStore({
  reducer: {
    posts,
  },
});

export type RootReducer = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
