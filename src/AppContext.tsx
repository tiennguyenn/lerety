import { createContext, ReactNode, useContext, useReducer } from "react";
import { User } from "./api/authenticate";

type State = {
  user: undefined | User;
  loading: boolean;
  permissions: undefined | string[];
};

const initialState: State = {
  user: undefined,
  loading: false,
  permissions: undefined,
};

type Action =
  | { type: "authenticate" }
  | { type: "authenticated"; user: User }
  | { type: "authorize" }
  | { type: "authorized"; permissions: string[] };

type AppContextType = State & {
  dispatch: React.Dispatch<Action>;
};

const AppContext = createContext<AppContextType>({
  ...initialState,
  dispatch: () => {},
});

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "authenticate":
      return { ...state, loading: true };

    case "authenticated":
      return { ...state, loading: false, user: action.user };

    case "authorize":
      return { ...state, loading: true };

    case "authorized":
      return { ...state, loading: false, permissions: action.permissions };

    default:
      return state;
  }
};

type Props = {
  children: ReactNode;
};

export function AppProvider({ children }: Props) {
  const [{ user, loading, permissions }, dispatch] = useReducer(
    reducer,
    initialState
  );

  return (
    <>
      <AppContext.Provider value={{ user, loading, permissions, dispatch }}>
        {children}
      </AppContext.Provider>
    </>
  );
}

export const useAppContext = () => useContext(AppContext);
