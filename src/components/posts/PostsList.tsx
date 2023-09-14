import {
  selectAllPosts,
  selectPostIds,
  selectPostsError,
  selectPostsStatus,
} from "../../store/slices/postsSlice";
import PostsExcerpt from "./PostsExcerpt";
import { useAppSelector } from "../../hooks/hooks";

const PostsList = () => {
  const orderedPosts = useAppSelector(selectPostIds);
  const error = useAppSelector(selectPostsError);
  const status = useAppSelector(selectPostsStatus);

  let content;
  if (status === "loading") {
    content = <p>"Loading..."</p>;
  } else if (status === "succeeded") {
    content = orderedPosts.map((postId) => (
      <PostsExcerpt key={postId} postId={postId} />
    ));
  } else if (status === "failed") {
    content = <p>{error}</p>;
  }

  return <section>{content}</section>;
};
export default PostsList;
