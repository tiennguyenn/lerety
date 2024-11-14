import { FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { RootType } from "./store";
import { authenticate } from "./api/authenticate";
import {
  authenticateAction,
  authenticatedAction,
  authorizeAction,
  authorizedAction,
} from "./store/userSlice";
import { authorize } from "./api/authorize";

function Header() {
  const user = useSelector((state: RootType) => state.user.user);
  const loading = useSelector((state: RootType) => state.user.loading);
  const navigate = useNavigate();
  const [_, setSearchParams] = useSearchParams();

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

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const search = formData.get("search") as string;
    setSearchParams({ search });
    navigate(`products/?search=${search}`);
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
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="products">Products</NavLink>
      </nav>
      <form onSubmit={handleSubmit}>
        <input name="search" placeholder="Search" />
      </form>
    </>
  );
}

export default Header;
