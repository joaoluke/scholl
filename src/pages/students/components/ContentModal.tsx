import { ChangeEvent } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

import { UploaderFile } from "../../../components";

import * as Style from "./style";

type ContentModalProps = {
  name: string;
  handleName(event: ChangeEvent<HTMLInputElement>): void;
  cpf: string;
  handleCPF(event: ChangeEvent<HTMLInputElement>): void;
  rg: string;
  handleRG(event: ChangeEvent<HTMLInputElement>): void;
  email: string;
  handleEmail(event: ChangeEvent<HTMLInputElement>): void;
  phone: string;
  handlePhone(event: ChangeEvent<HTMLInputElement>): void;
  birthDate: Date;
  handleBirthDate(event: Date): void;
};

export const ContentModal = ({
  name,
  handleName,
  handleCPF,
  cpf,
  handleRG,
  rg,
  email,
  handleEmail,
  phone,
  handlePhone,
  birthDate,
  handleBirthDate,
  handleImage,
  image,
  errorsInputs,
}: ContentModalProps) => {
  console.log(errorsInputs);
  return (
    <Style.FORM>
      <Grid container spacing={2}>
        <Grid xs={12}>
          <FormControl fullWidth>
            <TextField
              label="Name"
              variant="outlined"
              value={name}
              onChange={handleName}
            />
          </FormControl>
        </Grid>

        <Grid xs={6}>
          <FormControl fullWidth>
            <TextField
              label="CPF"
              variant="outlined"
              value={cpf}
              onChange={handleCPF}
              error={errorsInputs.cpf && Boolean(errorsInputs.cpf.length)}
              helperText={ errorsInputs.cpf && errorsInputs.cpf[0]}
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
              error={errorsInputs.rg && Boolean(errorsInputs.rg.length)}
              helperText={errorsInputs.rg && errorsInputs.rg[0]}
            />
          </FormControl>
        </Grid>

        <Grid xs={12}>
          <FormControl fullWidth>
            <TextField
              value={email}
              onChange={handleEmail}
              label="Email"
              type="email"
              variant="outlined"
              error={errorsInputs.email && Boolean(errorsInputs.email.length)}
              helperText={errorsInputs.email && errorsInputs.email[0]}
            />
          </FormControl>
        </Grid>

        <Grid xs={6}>
          <FormControl fullWidth>
            <DesktopDatePicker
              label="Birth Date"
              inputFormat="MM/dd/yyyy"
              value={birthDate}
              onChange={handleBirthDate}
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
              value={phone}
              onChange={handlePhone}
            />
          </FormControl>
        </Grid>

        <Grid xs={12}>
          <FormControl fullWidth>
            <UploaderFile onChange={handleImage} value={image} />
          </FormControl>
        </Grid>
      </Grid>
    </Style.FORM>
  );
};
