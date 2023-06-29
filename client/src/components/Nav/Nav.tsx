import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import Search from "../Search/Search";
import Loading from "../Loading";
import { useStoreContext } from "../../context/store";
import style from "./nav.module.scss";

const Nav: React.FC = () => {
  const [isSearch, setIsSearch] = useState(false);
  const { store } = useStoreContext();

  useEffect(() => {
    store.getInitialBreeds();
  }, [store]);

  const handleOnSearchClick = () => {
    setIsSearch(!isSearch);
  };

  return (
    <nav className={style.navWrapper}>
      {isSearch && <Search handleOnSearchClick={handleOnSearchClick} />}
      <div className={style.searchWrapper}>
        <h2 className={style.searchHeader}>CatWiki</h2>
        <p className={style.searchDescr}>
          Get to know more about your cat breed
        </p>
        {!isSearch && (
          <div className={style.inputWrapper}>
            <input
              className={style.search}
              type="text"
              name="search"
              placeholder="Search"
              onClick={handleOnSearchClick}
            />
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className={style.searchIcon}
            />
          </div>
        )}
      </div>
      <div className={style.popularWrapper}>
        <h2 className={style.popularHeader}>Most Searched Breeds</h2>
        <div className={style.divider}></div>
        <p className={style.popularDescr}>Breeds For you to discover</p>
        <div className={style.cardsWrapper}>
          {store.isLoading ? (
            <div className={style.loading}>
              <Loading />
            </div>
          ) : (
            <>
              {store.initialBreeds.map((breed) => (
                <div key={breed.breed} className={style.card}>
                  <Link
                    to={`/details/${breed.breed}`}
                    className={style.cardLink}
                  >
                    <img src={breed.previewImg} alt={breed.breed} />
                    <p className={style.cardName}>{breed.breed}</p>
                  </Link>
                </div>
              ))}
              <Link to="/all-breeds" className={style.link}>
                See more &rarr;
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

const ObservableNav = observer(Nav);
export default ObservableNav;
