import { createSlice } from "@reduxjs/toolkit";

interface ChatPageState {
  viewChatSettingModal: boolean;
}

const initialState: ChatPageState = {
  viewChatSettingModal: false,
};

const chatPageSlice = createSlice({
  name: "chatPage",
  initialState,
  reducers: {
    clickChatSettingModal: (state, { payload }) => {
      state.viewChatSettingModal = payload;
    },
  },
});

export const { clickChatSettingModal } = chatPageSlice.actions;

export default chatPageSlice.reducer;
