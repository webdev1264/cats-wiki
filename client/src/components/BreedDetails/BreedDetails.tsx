import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BreedRespInterface } from "../../types/interfaces";
import api from "../../http";
import Scale from "../Scale/Scale";
import style from "./breedDetails.module.scss";

const BreedDetails: React.FC = () => {
  const [breed, setBreed] = useState<BreedRespInterface>(
    {} as BreedRespInterface
  );
  const { name } = useParams();
  useEffect(() => {
    (async () => {
      const response = await api.get<BreedRespInterface[]>(`/breeds/${name}`);
      setBreed(response.data[0]);
    })();
  }, [name]);

  const chars = { ...breed.characteristics };

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
      <ul>
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
    </main>
  );
};

export default BreedDetails;
