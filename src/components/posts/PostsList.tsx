import { useSelector } from "react-redux";
import { fetchPosts, postsSelector } from "../../store/slices/postsSlice";
import { useEffect } from "react";
import PostsExcerpt from "./PostsExcerpt";
import { useAppDispatch } from "../../hooks/hooks";

const PostsList = () => {
  const dispatch = useAppDispatch();

  const { posts, error, status } = useSelector(postsSelector);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPosts());
    }
  }, [status, dispatch]);

  let content;
  if (status === "loading") {
    content = <p>"Loading..."</p>;
  } else if (status === "succeeded") {
    const orderedPosts = posts
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date));
    content = orderedPosts.map((post) => (
      <PostsExcerpt key={post.id} post={post} />
    ));
  } else if (status === "failed") {
    content = <p>{error}</p>;
  }

  return <section>{content}</section>;
};
export default PostsList;
