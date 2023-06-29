import React, { useEffect, useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faSpinner,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import debounce from "../../utils/debounce";
import { useStoreContext } from "../../context/store";
import style from "./search.module.scss";
import { observer } from "mobx-react-lite";

interface SearchProps {
  handleOnSearchClick: React.MouseEventHandler;
}

const Search: React.FC<SearchProps> = ({ handleOnSearchClick }) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const { store } = useStoreContext();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value) {
      store.setIsSearchLoading(true);
    } else {
      store.setIsSearchLoading(false);
    }
    getDebouncedData(value);
  };

  const getDebouncedData = useMemo(() => {
    return debounce<React.Dispatch<React.SetStateAction<string>>>(
      setSearchValue,
      500
    );
  }, []);

  useEffect(() => {
    store.searchBreeds(searchValue);
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
          onChange={handleOnChange}
          type="text"
          name="search"
        />
        <div className={style.searchIcon}>
          {store.isSearchLoading ? (
            <FontAwesomeIcon icon={faSpinner} spin />
          ) : (
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          )}
        </div>
      </div>
      <ul className={style.resultList}>
        {store.breeds.map((breed) => (
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

const ObservableSearc = observer(Search);
export default ObservableSearc;
