import { ButtonProps } from "../../types";

import * as Style from "./style";

export const Button = ({ children, icon }: ButtonProps) => {
  return (
    <Style.Container>
      {icon}
      {children}
    </Style.Container>
  );
};
