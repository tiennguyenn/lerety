import "./App.css";
import { AppProvider } from "./AppContext";
import Header from "./Header";
import Main from "./Main";

function App() {
  return (
    <div className="App">
      <h1>Lerety</h1>
      <AppProvider>
        <Header />
        <Main />
      </AppProvider>
    </div>
  );
}

export default App;
