import { ReactNode } from "react";

export type ButtonProps = {
  children: string;
  icon: ReactNode;
  onClick: () => void;
};
