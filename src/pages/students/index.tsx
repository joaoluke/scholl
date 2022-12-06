import { useEffect, useState } from "react";
import { GrAdd } from "react-icons/gr";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Pagination from "@mui/material/Pagination";
import AddIcon from '@mui/icons-material/Add';

import { CardComponent } from "../../components";
import { ContentModal } from "./components/ContentModal";
import useStudents from "./useStudents";

import * as Style from "./style";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export const Students = () => {
  const {
    getStudents,
    name,
    handleName,
    cpf,
    handleCPF,
    rg,
    handleRG,
    email,
    handleEmail,
    studentsData,
    phone,
    handlePhone,
    birthDate,
    handleBirthDate,
    image,
    handleImage,
    saveStudent,
    totalStudents,
    page,
    modalIsOpen,
    closeModal,
    openModal,
  } = useStudents();

  useEffect(() => {
    getStudents();
  }, []);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>Add new Student</DialogTitle>
        <DialogContent>
          <ContentModal
            name={name}
            handleName={handleName}
            cpf={cpf}
            handleCPF={handleCPF}
            rg={rg}
            handleRG={handleRG}
            email={email}
            handleEmail={handleEmail}
            phone={phone}
            handlePhone={handlePhone}
            birthDate={birthDate}
            handleBirthDate={handleBirthDate}
            handleImage={handleImage}
            image={image}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={saveStudent} autoFocus>
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Style.Container>
        <Style.Header>
          Students enrolled
          <Button startIcon={<AddIcon />} variant="contained" onClick={handleClickOpen}>
            Add New Student
          </Button>
        </Style.Header>
        <Style.Content>
          {studentsData.map((student) => (
            <CardComponent
              key={student.id}
              photoURL={student.photo}
              name={student.name}
              birthDate={student.birth_data}
              email={student.email}
              cpf={student.cpf}
              rg={student.rg}
              phoneNumber={student.phone}
            />
          ))}
        </Style.Content>
        <Pagination
          page={page}
          onChange={(event, value) => getStudents(value)}
          count={Math.ceil(totalStudents / 10)}
          style={{ margin: "1rem" }}
        />
      </Style.Container>
    </>
  );
};
