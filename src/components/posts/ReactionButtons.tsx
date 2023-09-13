import { useDispatch } from "react-redux";
import { reactionAdded } from "../../store/slices/postsSlice";
import { reactionEmoji } from "../../constants/postConsts";
import { Post, StringReactions } from "../../store/types";

interface reactionButtonsProps {
  post: Post;
}

const ReactionButtons: React.FC<reactionButtonsProps> = ({ post }) => {
  const dispatch = useDispatch();

  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <button
        key={name}
        type="button"
        className="reactionButton"
        onClick={() =>
          dispatch(reactionAdded({ postId: post.id, reaction: name }))
        }
      >
        {emoji} {post.reactions[name as StringReactions]}
      </button>
    );
  });

  return <div>{reactionButtons}</div>;
};
export default ReactionButtons;
