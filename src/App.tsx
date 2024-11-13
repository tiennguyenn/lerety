import React, { useReducer } from "react";
import "./App.css";
import Header from "./Header";
import Main from "./Main";
import { authenticate, User } from "./api/authenticate";
import { authorize } from "./api/authorize";

type State = {
  user: undefined | User;
  loading: boolean;
  permissions: undefined | string[];
};

type Action =
  | { type: "authenticate" }
  | { type: "authenticated"; user: User }
  | { type: "authorized"; permissions: string[] };

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "authenticate":
      return {
        ...state,
        loading: true,
      };

    case "authenticated":
      return {
        ...state,
        loading: false,
        user: action.user,
      };

    case "authorized":
      return {
        ...state,
        permissions: action.permissions,
      };

    default:
      return state;
  }
};

const initialState = {
  user: undefined,
  loading: false,
  permissions: undefined,
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleLogin = async () => {
    dispatch({ type: "authenticate" });
    const user = await authenticate();
    dispatch({ type: "authenticated", user: user });
    const permissions = await authorize();
    dispatch({ type: "authorized", permissions });
  };

  return (
    <div className="App">
      <Header
        user={state.user}
        loading={state.loading}
        handleLogin={handleLogin}
      />
      <Main user={state.user} permissions={state.permissions} />
    </div>
  );
}

export default App;
