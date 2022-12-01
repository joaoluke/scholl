import * as Yup from "yup";
import { useState, ChangeEvent } from "react";
import { Formik, Form, Field } from "formik";
import Grid from "@mui/material/Unstable_Grid2";
import InputMask from "react-input-mask";

import { formatCPF, formattedRG } from "../../../utils";

import * as Style from "./style";

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  cpf: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  rg: Yup.string().email("Invalid email").required("Required"),
});

export const ContentModal = () => {
  const [cpf, setCPF] = useState("");
  const [rg, setRG] = useState("");

  const handleCPF = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length <= 14) {
      setCPF(formatCPF(event.target.value));
    }
  };

  const handleRG = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length <= 12) {
      setRG(formattedRG(event.target.value));
    }
  };

  return (
    <Formik
      initialValues={{
        name: "",
        cpf: "",
        rg: "",
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
              <Style.label>Name:</Style.label>
              <Style.INPUT name="name" />
              {errors.name && touched.name ? (
                <div>{errors.name}</div>
              ) : null}
            </Grid>

            <Grid xs={6}>
              <Style.label>CPF:</Style.label>
              <Style.INPUT name="cpf" onChange={handleCPF} value={cpf} />
              {errors.cpf && touched.cpf ? (
                <div>{errors.cpf}</div>
              ) : null}
            </Grid>

            <Grid xs={6}>
              <Style.label>RG:</Style.label>
              <Style.INPUT name="rg" onChange={handleRG} value={rg} />

              {errors.rg && touched.rg ? (
                <div>{errors.rg}</div>
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
