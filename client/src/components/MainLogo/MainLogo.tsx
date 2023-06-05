import React from "react";
import CatLogo from "../CatLogo";
import style from "./mainLogo.module.scss";

interface MainLogoProps {
  wrapperClass?: string;
  nameClass?: string;
  logoClass?: string;
}

const MainLogo: React.FC<MainLogoProps> = ({
  wrapperClass = "",
  nameClass = "",
  logoClass = "",
}) => {
  return (
    <div className={`${style.logoWrapper} ${wrapperClass}`}>
      <div className={`${style.name} ${nameClass}`}>CatWiki</div>
      <CatLogo className={`${style.logo} ${logoClass}`} />
    </div>
  );
};

export default MainLogo;
