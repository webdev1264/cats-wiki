import style from "./footer.module.scss";
import MainLogo from "../MainLogo/MainLogo";

const Footer: React.FC = () => {
  return (
    <footer>
      <div className={style.container}>
        <MainLogo
          wrapperClass={style.logoWrapper}
          nameClass={style.name}
          logoClass={style.logo}
        />
        <div className={style.content}>
          <div>
            <span className={style.copyright}>&copy;</span>
          </div>
          <div>
            by{" "}
            <a
              href="https://github.com/webdev1264"
              className={style.link}
              target="_blank"
            >
              webdev1264
            </a>{" "}
            -
            <a
              href="https://devchallenges.io/"
              className={style.link}
              target="_blank"
            >
              devChallenge.io
            </a>{" "}
            {new Date().getFullYear()}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
