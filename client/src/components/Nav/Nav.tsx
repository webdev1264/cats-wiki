import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import React, { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import api from "../../http";
import { BreedRespInterface } from "../../types/interfaces";
import { Link } from "react-router-dom";
import Search from "../Search/Search";
import Loading from "../Loading";
import { Context } from "../../context/store";
import style from "./nav.module.scss";

const Nav: React.FC = () => {
  const [breeds, setBreeds] = useState<BreedRespInterface[]>(
    [] as BreedRespInterface[]
  );
  const [isSearch, setIsSearch] = useState(false);
  const { store } = useContext(Context);

  useEffect(() => {
    store.setIsLoading(true);
    (async () => {
      try {
        const response = await api.get<BreedRespInterface[]>(
          "/breeds?name=bengal,norwegian%20forest,savannah,selkirk%20rex"
        );
        if (response.status === 200) {
          setBreeds(response.data.slice(0, 4));
        }
      } catch (e) {
        console.log(e);
      } finally {
        store.setIsLoading(false);
      }
    })();
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
        <p className={style.popularDescr}>66+ Breeds For you to discover</p>
        <div className={style.cardsWrapper}>
          {store.isLoading ? (
            <div className={style.loading}>
              <Loading />
            </div>
          ) : (
            <>
              {breeds.map((breed) => (
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
              <button className={style.btn}>See more &rarr;</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

const ObservableNav = observer(Nav);
export default ObservableNav;
