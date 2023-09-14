import { useSelector } from "react-redux";
import { postsSelector } from "../../store/slices/postsSlice";
import PostsExcerpt from "./PostsExcerpt";

const PostsList = () => {
  const { posts, error, status } = useSelector(postsSelector);

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
