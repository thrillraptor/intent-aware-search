import { Routes, Route } from "react-router";
import PostPage from "./Pages/Posts/PostsPage";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import HomePage from "./Pages/Home/HomePage";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path={"/"} element={<HomePage />} />
        <Route path={"/posts"} element={<PostPage />} />
      </Routes>
    </QueryClientProvider>
  );
}
