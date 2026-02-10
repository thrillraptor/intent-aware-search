import { Routes, Route } from "react-router";
import { HomePage, PostsPage } from "./page/index";

export default function App() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path={"/posts"} element={<PostsPage />} />
    </Routes>
  );
}
