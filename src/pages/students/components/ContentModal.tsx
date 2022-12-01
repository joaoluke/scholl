import * as Yup from "yup";
import { useState, ChangeEvent } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

import { formatCPF, formattedRG } from "../../../utils";
import { UploaderFile } from "../../../components";

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
    <Style.FORM>
      <Grid container spacing={2}>
        <Grid xs={12}>
          <FormControl fullWidth>
            <TextField label="Name" variant="outlined" />
          </FormControl>
        </Grid>

        <Grid xs={6}>
          <FormControl fullWidth>
            <TextField
              label="CPF"
              variant="outlined"
              value={cpf}
              onChange={handleCPF}
            />
          </FormControl>
        </Grid>

        <Grid xs={6}>
          <FormControl fullWidth>
            <TextField
              label="RG"
              variant="outlined"
              value={rg}
              onChange={handleRG}
            />
          </FormControl>
        </Grid>

        <Grid xs={12}>
          <FormControl fullWidth>
            <TextField label="Name" variant="outlined" />
          </FormControl>
        </Grid>

        <Grid xs={6}>
          <FormControl fullWidth>
            <DesktopDatePicker
              label="Birth Date"
              inputFormat="MM/dd/yyyy"
              value={new Date()}
              onChange={(date) => console.log(date)}
              renderInput={(
                params: JSX.IntrinsicAttributes & TextFieldProps
              ) => <TextField {...params} />}
            />
          </FormControl>
        </Grid>

        <Grid xs={6}>
          <FormControl fullWidth>
            <TextField
              label="Phone"
              variant="outlined"
              value={rg}
              onChange={handleRG}
            />
          </FormControl>
        </Grid>

        <Grid xs={12}>
          <FormControl fullWidth>
            <UploaderFile/>
          </FormControl>
        </Grid>
      </Grid>
    </Style.FORM>
  );
};
