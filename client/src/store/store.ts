import { makeAutoObservable } from "mobx";
import api from "../http";
import { BreedRespInterface } from "../types/interfaces";

class Store {
  initialBreeds = [] as BreedRespInterface[];
  breed = {} as BreedRespInterface;
  breeds = [] as BreedRespInterface[];
  error = "";
  isLoading = false;
  isSearchLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  setInitialBreeds(breeds: BreedRespInterface[]) {
    this.initialBreeds = breeds;
  }

  setBreed(breed: BreedRespInterface) {
    this.breed = breed;
  }

  setBreeds(breeds: BreedRespInterface[]) {
    this.breeds = breeds;
  }

  setError(err: string) {
    this.error = err;
  }

  setIsLoading(bool: boolean) {
    this.isLoading = bool;
  }

  setIsSearchLoading(bool: boolean) {
    this.isSearchLoading = bool;
  }

  async getBreed(name: string) {
    try {
      this.setIsLoading(true);
      const response = await api.get<BreedRespInterface[]>(`/breeds/${name}`);
      if (response.status === 200) {
        this.setBreed(response.data[0]);
      }
    } catch (e) {
      console.log(e);
    } finally {
      this.setIsLoading(false);
    }
  }

  async searchBreeds(searchQuery: string) {
    try {
      if (!searchQuery) {
        return this.setBreeds([]);
      }
      const response = await api.get<BreedRespInterface[]>(
        `/breeds?name=${searchQuery}`
      );
      if (response.status === 200) {
        this.setBreeds(response.data);
      }
    } catch (e) {
      console.log(e);
    } finally {
      this.setIsSearchLoading(false);
    }
  }

  async getInitialBreeds() {
    this.setIsLoading(true);
    try {
      const response = await api.get<BreedRespInterface[]>(
        "/breeds?name=bengal,norwegian%20forest,savannah,selkirk%20rex"
      );
      if (response.status === 200) {
        this.setInitialBreeds(response.data.slice(0, 4));
      }
    } catch (e) {
      console.log(e);
    } finally {
      this.setIsLoading(false);
    }
  }

  async getAllBreeds() {
    this.setIsLoading(true);
    try {
      const response = await api.get<BreedRespInterface[]>("/breeds/all");
      if (response.status === 200) {
        this.setBreeds(response.data);
      }
    } catch (e) {
      console.log(e);
    } finally {
      this.setIsLoading(false);
    }
  }
}

export default Store;
