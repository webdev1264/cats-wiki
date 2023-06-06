import { makeAutoObservable } from "mobx";

class Store {
  error = "";
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  setError(err: string) {
    this.error = err;
  }

  setIsLoading(bool: boolean) {
    this.isLoading = bool;
  }
}

export default Store;
