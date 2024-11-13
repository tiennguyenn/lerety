import { Provider } from "react-redux";
import { Outlet } from "react-router-dom";
import { store } from "./store";
import Header from "./Header";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Header />
        <Outlet />
      </Provider>
    </div>
  );
}

export default App;
