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
}: ContentModalProps) => {
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
            <TextField
              value={email}
              onChange={handleEmail}
              label="Email"
              type="email"
              variant="outlined"
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
            <UploaderFile onChange={handleImage} value={image}/>
          </FormControl>
        </Grid>
      </Grid>
    </Style.FORM>
  );
};
