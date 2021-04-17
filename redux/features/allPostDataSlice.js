import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllPosts = createAsyncThunk(
  "posts/fetchingAllPosts",
  async () => {
    return axios("api/fetch-all-posts", {
      method: "GET",
    }).then((res) => {
      return res.data;
    });
  }
);

export const allPostDataSlice = createSlice({
  name: "allPostData",
  initialState: {
    data: [],
  },
  extraReducers: {
    [getAllPosts.fulfilled]: (state, action) => {
      state.data = action.payload.posts;
    },
    [getAllPosts.rejected]: (state) => {
      state.data = [];
    },
  },
});

export default allPostDataSlice.reducer;
