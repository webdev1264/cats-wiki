import { useEffect } from "react";
import { useStoreContext } from "../../context/store";
import style from "./allBreeds.module.scss";
import { observer } from "mobx-react-lite";
import Loading from "../Loading";

const AllBreeds: React.FC = () => {
  const { store } = useStoreContext();
  useEffect(() => {
    store.getAllBreeds();
  }, []);
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
        {store.breeds.map((breed) => {
          return (
            <li key={breed.breed} className={style.breedItem}>
              <h3 className={style.breedHeader}>{breed.breed}</h3>
              <img
                className={style.breedImg}
                src={breed.previewImg}
                alt={breed.breed}
              />
              <p className={style.breedDescr}>{breed.description}</p>
            </li>
          );
        })}
      </ul>
    </main>
  );
};

const ObservableAllBreeds = observer(AllBreeds);
export default ObservableAllBreeds;
