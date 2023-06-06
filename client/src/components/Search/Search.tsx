import { ChangeEvent, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";
import { BreedRespInterface } from "../../types/interfaces";
import { Link } from "react-router-dom";
import api from "../../http";
import style from "./search.module.scss";

interface SearchProps {
  handleOnSearchClick: () => void;
}

let breeds: BreedRespInterface[] = [] as BreedRespInterface[];

const Search: React.FC<SearchProps> = ({ handleOnSearchClick }) => {
  const [searchValue, setSearchValue] = useState<string>("");
  // const [breeds, setBreeds] = useState<BreedRespInterface[]>([]);

  const fetchData = async (searchQuery: string) => {
    try {
      const response = await api.get<BreedRespInterface[]>(
        `/breeds?name=${searchQuery}`
      );
      return response;
    } catch (e) {
      console.log(e);
    }
  };

  const handleOnChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (!inputValue) {
      breeds = [];
    }
    setSearchValue(inputValue);
    const getData = async () => {
      const resp = await fetchData(inputValue);
      if (resp) {
        return (breeds = resp.data);
      }
      breeds = [];
    };
    getData();
  };

  console.log("=======RENDERED");
  

  return (
    <div className={style.searchWrapper}>
      <div className={style.xMarkWrapper}>
        <FontAwesomeIcon
          className={style.xMark}
          icon={faXmark}
          onClick={handleOnSearchClick}
        />
      </div>
      <div className={style.searchBarWrapper}>
        <input
          className={style.searchBar}
          onChange={handleOnChange}
          type="text"
          value={searchValue}
        />
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className={style.searchIcon}
        />
      </div>
      <ul className={style.resultList}>
        {breeds.map((breed) => (
          <Link
            className={style.resultItemLink}
            key={breed.breed}
            to={`/details/${breed.breed}`}
          >
            <li className={style.resultItem}>{breed.breed}</li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Search;
