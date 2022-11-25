import { LOGO } from "../../config/Images";

import * as Style from "./style";

export const Header = () => {
  return (
    <Style.Container>
      <a href="#default" className="logo">
        <Style.LOGO src={LOGO} />
      </a>
      <div className="header-right">
        <a className="active" href="#home">
          Home
        </a>
        <a href="#contact">Students</a>
        <a href="#about">Curses</a>
      </div>
    </Style.Container>
  );
};
