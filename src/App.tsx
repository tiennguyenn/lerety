import { Provider } from "react-redux";
import "./App.css";
import { store } from "./store";
import Header from "./Header";
import Main from "./Main";

function App() {
  return (
    <div className="App">
      <h1>Lerety</h1>
      <Provider store={store}>
        <Header />
        <Main />
      </Provider>
    </div>
  );
}

export default App;
