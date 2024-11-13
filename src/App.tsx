import { Provider } from "react-redux";
import { store } from "./store";
import Header from "./Header";
import "./App.css";
import Main from "./Main";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Header />
        <Main />
      </Provider>
    </div>
  );
}

export default App;
