import styled from "styled-components";
import { Form, Field } from "formik";

export const INPUT = styled(Field)`
  font-family: inherit;
  width: 100%;
  border: 0;
  border-bottom: 2px solid #cecece;
  outline: 0;
  font-size: 1.3rem;
  color: $white;
  padding: 7px 0;
  background: transparent;
  transition: border-color 0.2s;

  &::placeholder {
    color: transparent;
  }

  .form__label {
    font-size: 1.3rem;
    cursor: text;
    top: 20px;
  }

  &:focus {
    padding-bottom: 6px;
    font-weight: 700;
    border-width: 3px;
    border-image: linear-gradient(to right, #11998e, #38ef7d);
    border-image-slice: 1;
  }
`;

export const label = styled.label`
  display: block;
  transition: 0.2s;
  font-size: 1rem;
  color: #cecece; ;
`;

export const FORM = styled(Form)`
  position: relative;
  padding: 15px 0 0;
  margin-top: 10px;
`;
