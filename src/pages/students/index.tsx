import { useEffect, useState, ChangeEvent } from "react";
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
import AddIcon from "@mui/icons-material/Add";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

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
  const [openLoading, setOpenLoading] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCloseLoading = () => {
    setOpen(false);
  };

  const handlePagination = async (
    event: ChangeEvent<unknown>,
    value: number
  ) => {
    setOpenLoading(true);
    await getStudents(value);
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
    setOpenLoading(false);
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
          <Button onClick={saveStudent} autoFocus variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openLoading}
        // onClick={handleCloseLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Style.Container>
        <Style.Header>
          Students enrolled
          <Button
            startIcon={<AddIcon />}
            variant="contained"
            onClick={handleClickOpen}
          >
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
          onChange={handlePagination}
          count={Math.ceil(totalStudents / 10)}
          sx={{ margin: 3 }}
          color="primary"
        />
      </Style.Container>
    </>
  );
};
