import { configureStore } from "@reduxjs/toolkit";
import cardList from "./cardList/cardList.slice";

export const store = configureStore({
  reducer: {
    cardList,
  },
});

export type RootReducer = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
