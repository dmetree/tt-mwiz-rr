import { configureStore } from "@reduxjs/toolkit";
import imagesReducer from "./images/images.slice";

export const store = configureStore({
  reducer: {
    imagesReducer
  },
});
