import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Context, store } from "./context/store.ts";
import "./index.scss";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Context.Provider value={{ store }}>
    <App />
  </Context.Provider>
);
