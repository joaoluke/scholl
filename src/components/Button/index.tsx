import { ButtonProps } from "../../types";

import * as Style from "./style";

export const Button = ({ children, icon, onClick }: ButtonProps) => {
  return (
    <Style.Container onClick={onClick}>
      {icon}
      {children}
    </Style.Container>
  );
};
