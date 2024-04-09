import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import store from "./App/store.js";
import { PersistGate } from "redux-persist/integration/react";
import persistStore from "redux-persist/es/persistStore.js";
import {Provider} from "react-redux"
import "./main.scss"

const persistor = persistStore(store)

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
        <div className="app-container">
          <App />
        </div>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);