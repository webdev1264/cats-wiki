import { useState } from "react";
import cat1 from "../../data/img/cat1.png";
import cat2 from "../../data/img/cat2.png";
import cat3 from "../../data/img/cat3.png";
import style from "./info.module.scss";

const Info: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleOnClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <section className={style.info}>
      <div className={style.infoDescr}>
        <div className={style.divider}></div>
        <h2 className={style.header}>Why should you have a cat?</h2>
        <p className={`${style.text} ${isExpanded ? style.expandText : ""}`}>
          Having a cat around you can actually trigger the release of calming
          chemicals in your body which lower your stress and anxiety leves,
          promoting overall well-being. Cats have long been recognized for their
          soothing presence and ability to provide comfort to their human
          companions. The therapeutic benefits of owning a cat extend beyond
          their mere companionship, as scientific studies have shown that
          interactions with cats can have a profound impact on our mental and
          physical health. One of the key ways in which cats help to reduce
          stress and anxiety is through the release of calming chemicals in our
          bodies. When we interact with a cat, whether it's through stroking
          their soft fur, playing with them, or simply watching them go about
          their daily activities, our bodies respond by releasing oxytocin,
          often referred to as the "love hormone." Oxytocin is a
          neurotransmitter that promotes feelings of relaxation and bonding, and
          it plays a crucial role in reducing stress levels.
        </p>
        <button className={style.btn} onClick={handleOnClick}>
          READ {isExpanded ? "LESS" : "MORE"} &rarr;
        </button>
      </div>
      <div className={style.catsWrapper}>
        <div className={style.catGroup}>
          <div className={style.cat}>
            <img src={cat2} alt="cat" />
          </div>
          <div className={`${style.cat} ${style.imgMargin}`}>
            <img src={cat1} alt="cat" />
          </div>
        </div>
        <div className={style.catGroup}>
          <div className={style.cat}>
            <img src={cat3} alt="cat" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Info;
