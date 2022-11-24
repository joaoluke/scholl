import { RiPassportLine } from "react-icons/ri";
import { BsFilePersonFill } from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai";

import { Container } from "./style";

export const Card = ({ photoURL, name, birthDate, email, cpf, rg }) => {
  return (
    <Container>
      <div className="card-header">
        <img src={photoURL} alt="city" />
      </div>
      <div className="card-body">
        <span className="tag tag-red">{birthDate}</span>
        <h4 className="name">{name}</h4>
        <p><AiOutlineMail/>{email}</p>
        <span>
          <RiPassportLine />
          {cpf}
        </span>
        <span>
          <BsFilePersonFill />
          {rg}
        </span>
      </div>
    </Container>
  );
};
