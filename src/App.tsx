import PostsList from "./components/posts/PostsList";
import AddPostForm from "./components/posts/AddPostForm";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import SinglePostPage from "./components/posts/SinglePostPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<PostsList />} />

        <Route path="post">
          <Route index element={<AddPostForm />} />
          <Route path=":postId" element={<SinglePostPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
