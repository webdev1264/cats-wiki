import { useEffect } from "react";
import { useStoreContext } from "../../context/store";

const AllBreeds: React.FC = () => {
  const { store } = useStoreContext();
  useEffect(() => {
    store.getAllBreeds();
  }, [store]);
  return (
    <div>
      <h2>AllBreeds</h2>
      <ul>
        {store.breeds.map((breed) => {
          return <li key={breed.breed}>{breed.breed}</li>;
        })}
      </ul>
    </div>
  );
};

export default AllBreeds;
