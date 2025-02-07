import {
  uploadImage,
  addPost,
  getPosts,
  getPostById,
  addComment,
  getCommentsByPostId,
} from "../../services/firebaseStore";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createPost = createAsyncThunk(
  "post/createPost",
  async (postData, { rejectWithValue }) => {
    try {
      return await addPost(postData);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const loadPosts = createAsyncThunk(
  "post/loadPosts",
  async (id, { rejectWithValue }) => {
    try {
      return await getPosts(id);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const loadPostById = createAsyncThunk(
  "post/loadPostById",
  async (id, { rejectWithValue }) => {
    return await getPostById(id);
  }
);

export const createComment = createAsyncThunk(
  "post/createComment",
  async (comment, { rejectWithValue }) => {
    return await addComment(comment);
  }
);

export const loadComments = createAsyncThunk(
  "post/loadComments",
  async (id, { rejectWithValue }) => {
    return await getCommentsByPostId(id);
  }
);
