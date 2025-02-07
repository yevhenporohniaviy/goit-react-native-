import { createSlice } from "@reduxjs/toolkit";
import {
  createPost,
  loadPosts,
  loadPostById,
  createComment,
  loadComments,
} from "./postOperations";

const postSlice = createSlice({
  name: "post",
  initialState: {
    postCreate: {
      lastPost: {},
      isLoading: false,
      error: null,
    },
    posts: {
      posts: [],
      isLoading: false,
      error: null,
    },
    postById: {
      post: {},
      isLoading: false,
      error: null,
    },
    comments: {
      comments: [],
      isLoading: false,
      error: null,
    },
    commentCreate: {
      lastComment: {},
      isLoading: false,
      error: null,
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadPostById.fulfilled, (state, { payload }) => {
        state.postById.post = payload;
        state.postById.isLoading = false;
        state.postById.error = null;
      })
      .addCase(loadPostById.pending, (state) => {
        state.postById.isLoading = true;
        state.postById.error = null;
      })
      .addCase(loadPostById.rejected, (state, { payload }) => {
        state.postById.error = payload;
        state.postById.isLoading = false;
      })
      .addCase(loadComments.fulfilled, (state, { payload }) => {
        state.comments.comments = payload;
        state.comments.isLoading = false;
        state.comments.error = null;
      })
      .addCase(loadComments.pending, (state) => {
        state.comments.isLoading = true;
        state.comments.error = null;
      })
      .addCase(loadComments.rejected, (state, { payload }) => {
        state.comments.error = payload;
        state.comments.isLoading = false;
      })
      .addCase(createComment.fulfilled, (state, { payload }) => {
        state.commentCreate.lastComment = payload;
        state.commentCreate.isLoading = false;
        state.commentCreate.error = null;
      })
      .addCase(createComment.pending, (state) => {
        state.commentCreate.isLoading = true;
        state.commentCreate.error = null;
      })
      .addCase(createComment.rejected, (state, { payload }) => {
        state.commentCreate.error = payload;
        state.commentCreate.isLoading = false;
      })
      .addCase(loadPosts.fulfilled, (state, { payload }) => {
        state.posts.posts = payload;
        state.posts.isLoading = false;
        state.posts.error = null;
      })
      .addCase(loadPosts.pending, (state) => {
        state.posts.isLoading = true;
        state.posts.error = null;
      })
      .addCase(loadPosts.rejected, (state, { payload }) => {
        state.posts.error = payload;
        state.posts.isLoading = false;
      })
      .addCase(createPost.fulfilled, (state, { payload }) => {
        state.postCreate.lastPost = payload;
        state.postCreate.isLoading = false;
        state.postCreate.error = null;
      })
      .addCase(createPost.pending, (state) => {
        state.postCreate.isLoading = true;
        state.postCreate.error = null;
      })
      .addCase(createPost.rejected, (state, { payload }) => {
        state.postCreate.error = payload;
        state.postCreate.isLoading = false;
      });
  },
});

export default postSlice.reducer;
