import { combineReducers, configureStore } from "@reduxjs/toolkit";
import allPostDataSlice from "../redux/features/allPostDataSlice";
import userPostDataSlice from "../redux/features/userPostDataSlice";

export default configureStore({
  reducer: combineReducers({
    userPostData: userPostDataSlice,
    allPostData: allPostDataSlice,
  }),
});
