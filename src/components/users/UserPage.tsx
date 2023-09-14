import { Link, useParams } from "react-router-dom";
import { useAppSelector } from "../../hooks/hooks";
import { getUserById } from "../../store/slices/usersSlice";
import { selectPostsByUser } from "../../store/slices/postsSlice";

const UserPage = () => {
  const { userId } = useParams();
  const user = useAppSelector((state) => getUserById(state, userId as string));

  const postsForUser = useAppSelector((state) =>
    selectPostsByUser(state, Number(userId))
  );

  const postTitles = postsForUser.map((post) => (
    <li key={post.id}>
      <Link to={`/post/${post.id}`}>{post.title}</Link>
    </li>
  ));

  return (
    <section>
      <h2>{user?.name}</h2>

      <ol>{postTitles}</ol>
    </section>
  );
};

export default UserPage;
