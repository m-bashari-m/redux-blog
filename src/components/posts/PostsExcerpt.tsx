import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../hooks/hooks";
import { selectPostsById } from "../../store/slices/postsSlice";
import { EntityId } from "@reduxjs/toolkit";

interface postsExcerptProps {
  postId: EntityId;
}

const PostsExcerpt: React.FC<postsExcerptProps> = ({ postId }) => {
  const post = useAppSelector((state) => selectPostsById(state, postId));

  if (!post) return <h2>Post Not Found!</h2>;

  return (
    <article>
      <h2>{post.title}</h2>
      <p className="excerpt">{post.body.substring(0, 75)}...</p>
      <p className="postCredit">
        <Link to={`post/${post.id}`}>Virw Post</Link>
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />
      </p>
      <ReactionButtons post={post} />
    </article>
  );
};
export default PostsExcerpt;
