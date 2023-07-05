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
  isModal: boolean;
}

const Search: React.FC<SearchProps> = ({ handleOnSearchClick, isModal }) => {
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

  const handleOnClick = (e: React.MouseEvent) => {
    if (!isModal && window.innerWidth < 992) {
      handleOnSearchClick(e);
    }
  };

  const getDebouncedData = useMemo(() => {
    return debounce<React.Dispatch<React.SetStateAction<string>>>(
      setSearchValue,
      500
    );
  }, []);

  useEffect(() => {
    store.searchBreeds(searchValue);
  }, [searchValue, store]);

  return (
    <div
      className={`${style.searchWrapper} ${
        isModal ? style.modalSearchWrapper : ""
      }`}
      onClick={handleOnClick}
    >
      {isModal && (
        <div className={style.xMarkWrapper}>
          <FontAwesomeIcon
            className={style.xMark}
            icon={faXmark}
            onClick={handleOnSearchClick}
          />
        </div>
      )}
      <div
        className={`${style.searchBarWrapper} ${
          isModal ? style.modalSearchBarWrapper : ""
        }`}
      >
        <input
          className={`${style.searchBar} ${
            isModal ? style.modalSearchBar : ""
          }`}
          onChange={handleOnChange}
          type="text"
          name="search"
          placeholder="Search"
        />
        <div
          className={`${style.searchIconWrapper} ${
            isModal ? style.modalSearchIconWrapper : ""
          }`}
        >
          {store.isSearchLoading ? (
            <FontAwesomeIcon
              className={style.spinnerIcon}
              icon={faSpinner}
              spin
            />
          ) : (
            <FontAwesomeIcon
              className={style.searchIcon}
              icon={faMagnifyingGlass}
            />
          )}
        </div>
      </div>
      {!!store.breeds.length && (
        <div
          className={`${style.resultWrapper} ${
            isModal ? style.modalResultWrapper : ""
          }`}
        >
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
      )}
    </div>
  );
};

const ObservableSearch = observer(Search);
export default ObservableSearch;
