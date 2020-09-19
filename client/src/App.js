import React from "react";
import Home from "./page";
import { Provider } from "react-redux";
import store from "./store";
function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Home />
      </Provider>
    </div>
  );
}

export default App;
