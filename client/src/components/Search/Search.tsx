import { ChangeEvent, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";
import { BreedRespInterface } from "../../types/interfaces";
import style from "./search.module.scss";
import api from "../../http";

interface SearchProps {
  handleOnSearchClick: () => void;
}

const Search: React.FC<SearchProps> = ({ handleOnSearchClick }) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [breeds, setBreeds] = useState<BreedRespInterface[]>(
    [] as BreedRespInterface[]
  );

  const handleOnChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const response = await api.get<BreedRespInterface[]>(
      `/breeds?name=${inputValue}`
    );
    setSearchValue(inputValue);
    if (inputValue) {
      return setBreeds(response.data);
    }
    setBreeds([]);
  };

  console.log("===========RENDERED");

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
      <ul>
        {breeds.map((breed) => (
          <li key={breed.breed}>{breed.breed}</li>
        ))}
      </ul>
    </div>
  );
};

export default Search;
