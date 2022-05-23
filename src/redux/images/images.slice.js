import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import imagesAPI from "../../api/images";

export const fetchImages = createAsyncThunk("images/fetchImages", async () => {
  const { data } = await imagesAPI.fetchImages();
  return data;
});

const imagesSlice = createSlice({
  name: "images",
  initialState: { images: [], currentSlide: 0, loading: "idle" },
  reducers: {
    changeCurrentSlide: (state, action) => {
      if (action.payload.direction === 'next') {
        state.currentSlide = (state.currentSlide === action.payload.length - 1 ? 0 : state.currentSlide + 1)
      } else if (action.payload.direction === 'prev') {
        state.currentSlide = (state.currentSlide === 0 ? action.payload.length - 1 : state.currentSlide - 1)
      } else {
        state.currentSlide = action.payload.newCurrent
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchImages.pending, (state, action) => {
      state.loading = "pending";
    });
    builder.addCase(fetchImages.fulfilled, (state, action) => {
      state.loading = "success";
      state.images = action.payload;
    });
    builder.addCase(fetchImages.rejected, (state, action) => {
      state.loading = "failed";
    });
  },
});

export const { changeCurrentSlide } = imagesSlice.actions
export default imagesSlice.reducer;
