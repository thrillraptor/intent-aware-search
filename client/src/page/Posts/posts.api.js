import api from "../../lib/api/api";

export const postServices = {
  getPosts: async () => {
    const { data } = await api.get("/posts");
    return { data };
  },

  searchPosts: async ({ searchQuery, topK = 5 }) => {
    const { data } = await api.post("/search", {
      searchQuery,
      topK,
    });
    return { data };
  },
};
