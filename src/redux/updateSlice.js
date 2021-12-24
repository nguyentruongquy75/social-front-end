import { createSlice } from "@reduxjs/toolkit";

const updateSlice = createSlice({
  name: "update",
  initialState: {
    popupChat: [],
  },
  reducers: {
    addPopupChat(state, action) {
      const existChat = state.popupChat.find(
        (chat) =>
          chat._id === action.payload._id && chat.type === action.payload.type
      );

      if (!existChat) {
        state.popupChat = [...state.popupChat, action.payload].slice(-2);
      }
    },
    removePopupChat(state, action) {
      state.popupChat = state.popupChat.filter(
        (chat) =>
          chat._id !== action.payload._id || chat.type !== action.payload.type
      );
    },
  },
});

export const { addPopupChat, removePopupChat } = updateSlice.actions;

export default updateSlice.reducer;
