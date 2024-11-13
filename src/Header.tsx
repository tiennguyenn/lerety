import { useDispatch, useSelector } from "react-redux";
import { RootType } from "./store";
import {
  authenticateAction,
  authenticatedAction,
  authorizeAction,
  authorizedAction,
} from "./store/userSlice";
import { authenticate } from "./api/authenticate";
import { authorize } from "./api/authorize";

function Header() {
  const user = useSelector((state: RootType) => state.user.user);
  const loading = useSelector((state: RootType) => state.user.loading);
  const dispatch = useDispatch();

  const handleLogin = async () => {
    dispatch(authenticateAction());
    const authUser = await authenticate();
    dispatch(authenticatedAction(authUser));
    if (authUser) {
      dispatch(authorizeAction());
      const permissions = await authorize(authUser.id);
      dispatch(authorizedAction(permissions));
    }
  };

  return (
    <>
      <h2>Header</h2>
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
