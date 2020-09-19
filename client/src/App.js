import React from "react";
import Home from "./page";
import { Provider } from "react-redux";
import store from "./store";
import { SocketProvider } from "./context/socket";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <SocketProvider>
          <Home />
        </SocketProvider>
      </Provider>
    </div>
  );
}

export default App;
