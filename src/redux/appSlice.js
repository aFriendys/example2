import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  page: 0,
  totalPages: 0,
  dataIsOver: false,
  isNavigated: false,
};

const appSlice = createSlice({
  name: "appSlice",
  initialState,
  reducers: {
    addPage(state) {
      state.page++;
      if (state.page === state.totalPages) state.dataIsOver = true;
      state.isNavigated = false;
    },
    addPosts(state, action) {
      state.posts.push(...action.payload);
    },
    setTotalPages(state, action) {
      state.totalPages = action.payload;
    },
    setIsNavigated(state, action) {
      state.isNavigated = action.payload;
    },
  },
});

export const { addPage, addPosts, setTotalPages, setIsNavigated } =
  appSlice.actions;
export default appSlice;
