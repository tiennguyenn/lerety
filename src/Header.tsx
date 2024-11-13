import { User } from "./api/authenticate";

type Props = {
  user: undefined | User;
  handleLogin: () => void;
  loading: boolean;
};

function Header({ user, loading, handleLogin }: Props) {
  return (
    <>
      <h2>Header</h2>

      {user ? (
        <p>Welcome {user.name}</p>
      ) : (
        <button disabled={loading} onClick={handleLogin}>
          {loading ? "..." : "Log in"}
        </button>
      )}
    </>
  );
}

export default Header;
