// chatSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ChatState {
  chats: string[];
  selectedChatId: string | null;
  selectedChat: string | null;
}

const initialState: ChatState = {
  chats: [],
  selectedChatId: null,
  selectedChat: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setSelectedChatId(state, action: PayloadAction<string | null>) {
      state.selectedChatId = action.payload;
      state.selectedChat =
        state.chats.find(
          (chat, index) => index.toString() === action.payload
        ) || null;
    },
    setChats(state, action: PayloadAction<string[]>) {
      state.chats = action.payload;
    },
  },
});

export const { setSelectedChatId, setChats } = chatSlice.actions;
export default chatSlice.reducer;
