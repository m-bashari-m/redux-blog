import { useSelector } from "react-redux";
import { usersSelector } from "../../store/slices/usersSlice";

interface postAuthorProps {
  userId?: string;
}

const PostAuthor: React.FC<postAuthorProps> = ({ userId }) => {
  const users = useSelector(usersSelector);

  const author = users.find((user) => user.id === userId);

  return <span>by {author ? author.name : "Unknown author"}</span>;
};
export default PostAuthor;
