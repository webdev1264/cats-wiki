import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Scale from "../Scale/Scale";
import style from "./breedDetails.module.scss";
import { useStoreContext } from "../../context/store";
import Loading from "../Loading";
import { observer } from "mobx-react-lite";

const BreedDetails: React.FC = () => {
  const { name } = useParams();
  const { store } = useStoreContext();
  const { breed } = store;
  const chars = { ...breed.characteristics };

  useEffect(() => {
    if (name) {
      store.getBreed(name);
    }
  }, [store, name]);

  if (store.isLoading) {
    return (
      <div className={style.loading}>
        <Loading />
      </div>
    );
  }

  return (
    <main className={style.wrapper}>
      <img
        src={breed.previewImg}
        className={style.breedImg}
        alt={breed.breed}
      />
      <h1 className={style.header}>{breed.breed}</h1>
      <p className={style.description}>{breed.description}</p>
      <p className={style.description}>
        <span className={style.characterName}>Temperament: </span>
        {breed.temperament}
      </p>
      <p className={style.description}>
        <span className={style.characterName}>Origin: </span>
        {breed.origin}
      </p>
      <p className={style.description}>
        <span className={style.characterName}>Life Span: </span>
        {breed.lifeSpan}
      </p>
      <ul className={style.scales}>
        <Scale name="Adaptability:" num={parseInt(chars["adaptability"])} />
        <Scale
          name="Affection level:"
          num={parseInt(chars["affectionLevel"])}
        />
        <Scale name="Child Friendly" num={parseInt(chars["childFriendly"])} />
        <Scale name="Grooming" num={parseInt(chars["grooming"])} />
        <Scale name="Intelligence" num={parseInt(chars["intelligence"])} />
        <Scale name="Health Issues" num={parseInt(chars["healthIssues"])} />
        <Scale name="Social Needs" num={parseInt(chars["socialNeeds"])} />
        <Scale
          name="Stranger Friendly"
          num={parseInt(chars["strangerFriendly"])}
        />
      </ul>
      <h2 className={style.photosHeader}>Other photos</h2>
      <div className={style.photosWrapper}>
        {store.breed.imgs?.map((img) => {
          return (
            <img
              key={img}
              className={style.breedPhoto}
              src={img}
              alt={breed.breed}
            />
          );
        })}
      </div>
    </main>
  );
};

const ObservableBreedDetails = observer(BreedDetails);
export default ObservableBreedDetails;
