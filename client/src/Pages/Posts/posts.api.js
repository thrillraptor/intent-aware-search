import apiClient from "../../lib/api/apiClient";

export const postServices = {
  getPosts: async () => {
    const { data } = await apiClient.get("/posts");
    return { data };
  },

  searchPosts: async ({ searchQuery, topK = 5 }) => {
    const { data } = await apiClient.post("/search", {
      searchQuery,
      topK,
    });
    return { data };
  },
};