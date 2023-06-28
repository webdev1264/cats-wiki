import { createContext, useContext } from "react";
import Store from "../store/store";

const store = new Store();

const Context = createContext({
  store,
});

const useStoreContext = () => {
  return useContext(Context);
};

export { Context, store, useStoreContext };
