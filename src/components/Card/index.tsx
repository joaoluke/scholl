import { RiPassportLine } from "react-icons/ri";
import { BsFilePersonFill } from "react-icons/bs";
import { AiOutlineMail, AiFillPhone } from "react-icons/ai";
import { parseISO, format } from "date-fns";

import { CardProps } from "../../types";

import * as Style from "./style";

export const Card = ({
  photoURL,
  name,
  birthDate,
  email,
  cpf,
  rg,
}: CardProps) => {
  return (
    <Style.Container>
      <div className="card-header">
        <img src={photoURL} alt="city" />
      </div>
      <div className="card-body">
        <span className="tag tag-red">
          {format(parseISO(birthDate), "MM/dd/yyyy")}
        </span>
        <h4 className="name">{name}</h4>
        <p>
          <AiOutlineMail style={{ marginRight: "5px" }} />
          {email}
        </p>
        <p>
          <AiFillPhone style={{ marginRight: "5px" }} />
          {email}
        </p>
        <span>
          <RiPassportLine style={{ marginRight: "5px" }} />
          <b>CPF: </b>{cpf}
        </span>
        <span>
          <BsFilePersonFill style={{ marginRight: "5px" }} />
          <b>RG: </b>{rg}
        </span>
      </div>
    </Style.Container>
  );
};
