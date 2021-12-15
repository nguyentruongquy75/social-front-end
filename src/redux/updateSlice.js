import { createSlice } from "@reduxjs/toolkit";

const updateSlice = createSlice({
  name: "update",
  initialState: {
    hasChangeNewsfeed: false,
    hasChangePostReaction: false,
    hasChangeNotifications: false,
  },
  reducers: {
    changeNewsfeed(state) {
      state.hasChangeNewsfeed = !state.hasChangeNewsfeed;
    },
    changePostReaction: (state) => {
      state.hasChangePostReaction = !state.hasChangePostReaction;
    },
    changeNotifications(state) {
      state.hasChangeNotifications = !state.hasChangeNotifications;
    },
  },
});

export const { changeNewsfeed, changeNotifications, changePostReaction } =
  updateSlice.actions;

export default updateSlice.reducer;
