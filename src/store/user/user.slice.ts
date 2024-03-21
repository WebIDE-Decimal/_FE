import { createSlice } from "@reduxjs/toolkit";

interface UserState {
  isLoading: boolean;
  user: { accessToken?: string };
  error: string;
}

const initialState: UserState = {
  isLoading: false,
  user: {
    accessToken: localStorage.getItem("access_token")
      ? localStorage.getItem("access_token")!
      : "",
  },
  error: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clickLogin: (state, { payload }) => {
      state.user.accessToken = payload;
      localStorage.setItem("access_token", payload);
    },
    clickLogout: () => {
      localStorage.removeItem("access_token");
    },
  },
});

export const { clickLogin, clickLogout } = userSlice.actions;
export default userSlice.reducer;
