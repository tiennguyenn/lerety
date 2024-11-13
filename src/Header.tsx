import { authenticate } from "./api/authenticate";
import { authorize } from "./api/authorize";
import { useAppContext } from "./AppContext";

function Header() {
  const { user, loading, dispatch } = useAppContext();

  const handleLogin = async () => {
    dispatch({ type: "authenticate" });
    const user = await authenticate();
    dispatch({ type: "authenticated", user });

    if (user.id) {
      dispatch({ type: "authorize" });
      const permissions = await authorize(user.id);
      dispatch({ type: "authorized", permissions });
    }
  };

  return (
    <>
      {user ? (
        <p>Welcome {user.name}</p>
      ) : (
        <button onClick={handleLogin} disabled={loading}>
          Login
        </button>
      )}
    </>
  );
}

export default Header;
