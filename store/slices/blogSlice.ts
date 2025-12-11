import { createSlice } from "@reduxjs/toolkit";
import { loadBlogPosts, loadBlogPost, BlogState } from "../thunks/blogThunk";

const initialState: BlogState = {
  posts: [],
  currentPost: null,
  loading: false,
  error: null,
  categories: ["All"],
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    clearCurrentPost: (state) => {
      state.currentPost = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Load blog posts
    builder
      .addCase(loadBlogPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadBlogPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
        
        // Extract unique categories from posts
        const postCategories = action.payload
          .map(post => post.category || "Blog")
          .filter((category, index, arr) => arr.indexOf(category) === index)
          .filter(category => category && category !== "Blog");
        
        state.categories = ["All", ...postCategories];
      })
      .addCase(loadBlogPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Load single blog post
    builder
      .addCase(loadBlogPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadBlogPost.fulfilled, (state, action) => {
        state.loading = false;
        state.currentPost = action.payload;
      })
      .addCase(loadBlogPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearCurrentPost, clearError } = blogSlice.actions;
export default blogSlice.reducer;