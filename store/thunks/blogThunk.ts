import { firestore } from "@/src/config/firebase";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs, doc, getDoc, orderBy, query, limit } from "firebase/firestore";

export interface BlogPost {
  id: string;
  title: string;
  description: string; // HTML content
  imageUrl: string;
  createdAt: any;
  updatedAt: any;
  category?: string;
  author?: string;
  excerpt?: string;
}

export interface BlogState {
  posts: BlogPost[];
  currentPost: BlogPost | null;
  loading: boolean;
  error: string | null;
  categories: string[];
}

// Fetch all blog posts
export const loadBlogPosts = createAsyncThunk(
  "blog/loadBlogPosts",
  async (limitCount: number = 50, { rejectWithValue }) => {
    try {
      // First try with ordering, if it fails, try without ordering
      let snapshot;
      try {
        const q = query(
          collection(firestore, "blogs"),
          orderBy("createdAt", "desc"),
          limit(limitCount)
        );
        snapshot = await getDocs(q);
      } catch (orderError) {
        console.log("Ordering failed, trying without order:", orderError);
        // Fallback: get all documents without ordering
        const q = query(
          collection(firestore, "blogs"),
          limit(limitCount)
        );
        snapshot = await getDocs(q);
      }
      
      console.log("Firestore snapshot:", { 
        empty: snapshot.empty, 
        size: snapshot.size,
        docs: snapshot.docs.length 
      });
      
      const posts: BlogPost[] = snapshot.docs.map((doc) => {
        const data = doc.data();
        console.log("Blog post data:", { id: doc.id, data });
        return {
          id: doc.id,
          title: data.title || "",
          description: data.description || "",
          imageUrl: data.imageUrl || "",
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
          category: data.category || "Blog",
          author: data.author || "Lords Hub Team",
          excerpt: data.excerpt || extractExcerpt(data.description || ""),
        };
      });

      console.log("Processed posts:", posts);
      return posts;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Fetch single blog post by ID
export const loadBlogPost = createAsyncThunk(
  "blog/loadBlogPost",
  async (postId: string, { rejectWithValue }) => {
    try {
      const docRef = doc(firestore, "blogs", postId);
      const docSnap = await getDoc(docRef);
      
      if (!docSnap.exists()) {
        throw new Error("Blog post not found");
      }

      const data = docSnap.data();
      const post: BlogPost = {
        id: docSnap.id,
        title: data.title || "",
        description: data.description || "",
        imageUrl: data.imageUrl || "",
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        category: data.category || "Blog",
        author: data.author || "Lords Hub Team",
        excerpt: data.excerpt || extractExcerpt(data.description || ""),
      };

      return post;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Helper function to extract excerpt from HTML content
function extractExcerpt(htmlContent: string, maxLength: number = 150): string {
  // Remove HTML tags
  const textContent = htmlContent.replace(/<[^>]*>/g, '');
  // Trim and limit length
  return textContent.length > maxLength 
    ? textContent.substring(0, maxLength).trim() + '...'
    : textContent.trim();
}