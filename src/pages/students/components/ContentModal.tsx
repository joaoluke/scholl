import { ChangeEvent } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

import { UploaderFile } from "../../../components";
import { useStudentContext } from "../../../contexts/Student";

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
  handleBirthDate(event: Date | null): void;
  handleImage(files: FileList | null): void;
  image: File;
};

export const ContentModal = () => {
  const {
    errorsInputs,
    name,
    handleName,
    cpf,
    handleCPF,
    rg,
    handleRG,
    email,
    handleEmail,
    birthDate,
    handleBirthDate,
    phone,
    handlePhone,
    image,
    handleImage,
  } = useStudentContext();

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
              error={errorsInputs.name && Boolean(errorsInputs.name.length)}
              helperText={errorsInputs.name && errorsInputs.name[0]}
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
              helperText={errorsInputs.cpf && errorsInputs.cpf[0]}
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
              label="Email"
              type="email"
              variant="outlined"
              value={email}
              onChange={handleEmail}
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
              error={errorsInputs.phone && Boolean(errorsInputs.phone.length)}
              helperText={errorsInputs.phone && errorsInputs.phone[0]}
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
