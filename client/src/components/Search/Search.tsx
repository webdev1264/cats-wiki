import React, { useEffect, useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";
import { BreedRespInterface } from "../../types/interfaces";
import { Link } from "react-router-dom";
import api from "../../http";
import debounce from "../../utils/debounce";
import style from "./search.module.scss";

interface SearchProps {
  handleOnSearchClick: () => void;
}

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

const Search: React.FC<SearchProps> = ({ handleOnSearchClick }) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [breeds, setBreeds] = useState<BreedRespInterface[]>([]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const getDebouncedData = useMemo(() => {
    return debounce<React.ChangeEventHandler<HTMLInputElement>>(
      handleOnChange,
      500
    );
  }, []);

  useEffect(() => {
    if (!searchValue) {
      setBreeds([]);
      return;
    }
    const getData = async () => {
      const resp = await fetchData(searchValue);
      if (resp) {
        return setBreeds(resp.data);
      }
      setBreeds([]);
    };
    getData();
  }, [searchValue]);

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
          onChange={getDebouncedData}
          type="text"
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
