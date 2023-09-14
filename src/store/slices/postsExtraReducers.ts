import {
  ActionReducerMapBuilder,
  PayloadAction,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import axios from "axios";
import { POSTS_URL } from "../../constants/storeConsts";
import { Post, PostsSliceType } from "../types";
import { sub } from "date-fns";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await axios.get(POSTS_URL);
  return response.data;
});

export const addNewPost = createAsyncThunk(
  "posts/addNewPost",
  async (initialPost: { title: string; body: string; userId: string }) => {
    const response = await axios.post(POSTS_URL, initialPost);
    return response.data;
  }
);

export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async (initialPost: Post) => {
    const { id } = initialPost;
    const response = await axios.put(`${POSTS_URL}/${id}`, initialPost);
    return response.data;
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (initialPost: { id: string }) => {
    const { id } = initialPost;
    const response = await axios.delete(`${POSTS_URL}/${id}`);
    if (response?.status === 200) return initialPost;
    return `${response?.status}: ${response?.statusText}`;
  }
);

export const postsExtraReducers = (
  builder: ActionReducerMapBuilder<PostsSliceType>
) => {
  builder
    .addCase(fetchPosts.pending, (state) => {
      state.status = "loading";
    })
    .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
      state.status = "succeeded";
      // Adding date and reactions
      let min = 1;
      const loadedPosts = action.payload.map((post) => {
        post.date = sub(new Date(), { minutes: min++ }).toISOString();
        post.reactions = {
          thumbsUp: 0,
          wow: 0,
          heart: 0,
          rocket: 0,
          coffee: 0,
        };
        return post;
      });

      // Add any fetched posts to the array
      state.posts = state.posts.concat(loadedPosts);
    })

    .addCase(fetchPosts.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    })
    .addCase(addNewPost.fulfilled, (state, action) => {
      // Fix for API post IDs:
      // Creating sortedPosts & assigning the id
      // would be not be needed if the fake API
      // returned accurate new post IDs
      const sortedPosts = state.posts.sort((a, b) => {
        if (a.id > b.id) return 1;
        if (a.id < b.id) return -1;
        return 0;
      });
      action.payload.id = String(
        Number(sortedPosts[sortedPosts.length - 1].id) + 1
      );
      // End fix for fake API post IDs

      action.payload.userId = Number(action.payload.userId);
      action.payload.date = new Date().toISOString();
      action.payload.reactions = {
        thumbsUp: 0,
        hooray: 0,
        heart: 0,
        rocket: 0,
        eyes: 0,
      };
      state.posts.push(action.payload);
    })
    .addCase(updatePost.fulfilled, (state, action: PayloadAction<Post>) => {
      state.status = "succeeded";
      if (!action.payload?.id) {
        console.log("update colud not complete");
        return;
      }
      const { id } = action.payload;
      // action.payload.date = new Date().toISOString();
      const posts = state.posts.filter((post) => post.id !== id);
      state.posts = [...posts, action.payload];
    })
    .addCase(deletePost.fulfilled, (state, action) => {
      if (typeof action.payload === "string") {
        console.log("Delete could not complete");
        console.log(action.payload);
        return;
      }
      const { id } = action.payload;
      const posts = state.posts.filter((post) => post.id !== id);
      state.posts = posts;
    });
};
