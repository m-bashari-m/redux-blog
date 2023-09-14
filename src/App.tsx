import PostsList from "./components/posts/PostsList";
import AddPostForm from "./components/posts/AddPostForm";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import SinglePostPage from "./components/posts/SinglePostPage";
import EditPostForm from "./components/posts/EditPostFrom";
import UsersList from "./components/users/UsersList";
import UserPage from "./components/users/UserPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<PostsList />} />

        <Route path="post">
          <Route index element={<AddPostForm />} />
          <Route path=":postId" element={<SinglePostPage />} />
          <Route path="edit/:postId" element={<EditPostForm />} />
        </Route>

        <Route path="user">
          <Route index element={<UsersList />} />
          <Route path=":userId" element={<UserPage />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
