import * as Yup from "yup";
import { useState } from "react";
import { Formik, Form, Field } from "formik";
import Grid from "@mui/material/Unstable_Grid2";
import InputMask from "react-input-mask";
import StringMask from "string-mask";

import * as Style from "./style";

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  lastName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
});

const CustomInput = (props) => (
  <InputMask {...props}>
    {(inputProps) => <Style.INPUT {...inputProps} />}
  </InputMask>
);

const DELIMITER = "-";
const DELIMITER_TWO = ".";
const MASK = "000.000.000-00";

export const ContentModal = () => {
  const [cpf, setCPF] = useState("");

  function removeTrailingCharIfFound(
    str: string,
    char: string,
    charTwo: string
  ): string {
    return str
      .split(/[.-]+/)
      .filter((segment) => segment !== "")
      .join(/[.-]+/);
  }

  function formatValue(str: string): string {
    let unmaskedValue = str.split(DELIMITER).join("");
    unmaskedValue = str.split(DELIMITER_TWO).join("");
    console.log(unmaskedValue, "unmaskedValue");
    const formatted = StringMask.process(unmaskedValue, MASK);
    console.log(formatted, "FORMATE");
    return removeTrailingCharIfFound(
      formatted.result,
      DELIMITER,
      DELIMITER_TWO
    );
  }

  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
      }}
      validationSchema={SignupSchema}
      onSubmit={(values) => {
        return;
        console.log(values);
      }}
    >
      {({ errors, touched }) => (
        <Style.FORM>
          <Grid container spacing={2}>
            <Grid xs={12}>
              <Style.label>First Name:</Style.label>
              <Style.INPUT name="firstName" />

              {errors.firstName && touched.firstName ? (
                <div>{errors.firstName}</div>
              ) : null}
            </Grid>
            <Grid xs={6}>
              <Style.label>First Name:</Style.label>
              <Field name="firstName">
                {(fieldProps) => (
                  <Style.INPUT
                    {...fieldProps.field}
                    onChange={(event) => {
                      fieldProps.field.onChange(event.target.name)(
                        formatValue(event.target.value)
                      );
                    }}
                  />
                )}
              </Field>
              {errors.firstName && touched.firstName ? (
                <div>{errors.firstName}</div>
              ) : null}
            </Grid>
            <Grid xs={6}>
              <Style.label>First Name:</Style.label>
              <Style.INPUT name="firstName" />

              {errors.firstName && touched.firstName ? (
                <div>{errors.firstName}</div>
              ) : null}
            </Grid>
          </Grid>

          {/* <Field name="lastName" />
          {errors.lastName && touched.lastName ? (
            <div>{errors.lastName}</div>
          ) : null}
          <Field name="email" type="email" />
          {errors.email && touched.email ? <div>{errors.email}</div> : null}
          <button type="submit">Submit</button> */}
        </Style.FORM>
      )}
    </Formik>
  );
};
