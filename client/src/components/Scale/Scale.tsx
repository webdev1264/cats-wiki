import style from "./scale.module.scss";

interface ScaleProps {
  name: string;
  num: number;
}

const Scale: React.FC<ScaleProps> = ({ name, num = 0 }) => {
  const scaleList = new Array(5).fill("");
  return (
    <li>
      <div className={style.characterWrapper}>
        <span className={style.character}>{name}</span>
        <div className={style.scaleWrapper}>
          {scaleList.map((_, index) => (
            <div
              key={index}
              className={`${style.scaleItem} ${num > index ? style.dark : ""}`}
            ></div>
          ))}
        </div>
      </div>
    </li>
  );
};

export default Scale;
