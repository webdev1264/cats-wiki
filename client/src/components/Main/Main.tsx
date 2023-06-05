import Footer from "../Footer/Footer";
import style from "./main.module.scss";
import MainLogo from "../MainLogo/MainLogo";
import { Link, Outlet } from "react-router-dom";

const Main: React.FC = () => {
  return (
    <div className={style.container}>
      <main className={style.main}>
        <Link to="/" className={style.link}>
          <MainLogo />
        </Link>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Main;
