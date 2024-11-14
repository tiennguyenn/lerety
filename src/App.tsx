import { Provider } from "react-redux";
import { Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { store } from "./store";
import Header from "./Header";
import "./App.css";

function App() {
  const queryClient = new QueryClient();
  return (
    <div className="App">
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Header />
          <Outlet />
        </QueryClientProvider>
      </Provider>
    </div>
  );
}

export default App;
