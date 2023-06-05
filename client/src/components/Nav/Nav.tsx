import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import bengal from "../../data/img/Bengal.jpg";
import style from "./nav.module.scss";

const Nav = () => {
  return (
    <nav className={style.navWrapper}>
      <div className={style.searchWrapper}>
        <h2 className={style.searchHeader}>CatWiki</h2>
        <p className={style.searchDescr}>
          Get to know more about your cat breed
        </p>
        <div className={style.inputWrapper}>
          <input className={style.search} type="text" placeholder="Search" />
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className={style.searchIcon}
          />
        </div>
      </div>
      <div className={style.popularWrapper}>
        <h2 className={style.popularHeader}>Most Searched Breeds</h2>
        <div className={style.divider}></div>
        <p className={style.popularDescr}>66+ Breeds For you to discover</p>
        <div className={style.cardsWrapper}>
          <div className={style.card}>
            <img src={bengal} alt="Bengal" />
            <p className={style.cardName}>Bengal</p>
          </div>
          <div className={style.card}>
            <img src={bengal} alt="Bengal" />
            <p className={style.cardName}>Bengal</p>
          </div>
          <div className={style.card}>
            <img src={bengal} alt="Bengal" />
            <p className={style.cardName}>Bengal</p>
          </div>
          <div className={style.card}>
            <img src={bengal} alt="Bengal" />
            <p className={style.cardName}>Bengal</p>
          </div>
        </div>
        <button className={style.btn}>See more &rarr;</button>
      </div>
    </nav>
  );
};

export default Nav;
