import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getUserPosts = createAsyncThunk(
  "posts/fetchingUserPosts",
  async () => {
    return axios("api/fetch-user-posts", { method: "GET" }).then(
      (res) => res.data
    );
  }
);

export const userPostDataSlice = createSlice({
  name: "userPostData",
  initialState: {
    data: [],
  },
  extraReducers: {
    [getUserPosts.fulfilled]: (state, action) => {
      state.data = action.payload.posts;
    },
    [getUserPosts.rejected]: (state) => {
      state.data = [];
    },
  },
});

export default userPostDataSlice.reducer;
