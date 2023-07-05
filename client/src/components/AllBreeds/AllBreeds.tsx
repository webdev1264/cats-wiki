import { useEffect, useState } from "react";
import { useStoreContext } from "../../context/store";
import style from "./allBreeds.module.scss";
import { observer } from "mobx-react-lite";
import Loading from "../Loading";
import Pagination from "../Pagination/Pagination";
import { Link } from "react-router-dom";

const AllBreeds: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { store } = useStoreContext();
  const elementsPerPage = 2;

  const from = (currentPage - 1) * elementsPerPage;
  const to = currentPage * elementsPerPage;

  const onClick = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    store.getAllBreeds();
  }, [store]);

  if (store.isLoading) {
    return (
      <div className={style.loading}>
        <Loading />
      </div>
    );
  }
  return (
    <main className={style.wrapper}>
      <ul className={style.breedsWrapper}>
        {store.breeds.slice(from, to).map((breed) => {
          return (
            <Link
              key={breed.breed}
              to={`../details/${breed.breed}`}
              className={style.link}
            >
              <li className={style.breedItem}>
                <div>
                  <img
                    className={style.breedImg}
                    src={breed.previewImg}
                    alt={breed.breed}
                  />
                </div>
                <div>
                  <h3 className={style.breedHeader}>{breed.breed}</h3>
                  <p className={style.breedDescr}>{breed.description}</p>
                </div>
              </li>
            </Link>
          );
        })}
      </ul>
      <Pagination
        currentPage={currentPage}
        elementsPerPage={elementsPerPage}
        totalElements={store.breeds.length}
        onClick={onClick}
      />
    </main>
  );
};

const ObservableAllBreeds = observer(AllBreeds);
export default ObservableAllBreeds;
