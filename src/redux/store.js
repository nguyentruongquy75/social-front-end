import { configureStore } from "@reduxjs/toolkit";
import updateSlice from "./updateSlice";

const store = configureStore({
  reducer: {
    update: updateSlice,
  },
});

export default store;
