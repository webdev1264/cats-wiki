import React, { useEffect, useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";
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
    setSearchValue(e.target.value);
  };

  const getDebouncedData = useMemo(() => {
    return debounce<React.ChangeEventHandler<HTMLInputElement>>(
      handleOnChange,
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
          onChange={getDebouncedData}
          type="text"
          name="search"
        />
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className={style.searchIcon}
        />
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
