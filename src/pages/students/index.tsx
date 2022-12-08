import { useEffect, useState, ChangeEvent } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Pagination from "@mui/material/Pagination";
import AddIcon from "@mui/icons-material/Add";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import SaveIcon from "@mui/icons-material/Save";
import LoadingButton from "@mui/lab/LoadingButton";

import { CardComponent } from "../../components";
import { ContentModal } from "./components/ContentModal";
import { useStudentContext } from "../../contexts/Student";
import useStudents from "./useStudents";

import * as Style from "./style";

export const Students = () => {
  const {
    saveStudent,
    getStudents,
    loadingButtonSave,
    modalIsOpen,
    closeModal,
    openModal,
  } = useStudents();

  const {
    students,
    page,
    totalStudents,
    name,
    cpf,
    rg,
    email,
    birthDate,
    phone,
    image,
  } = useStudentContext();

  useEffect(() => {
    getStudents();
  }, []);

  const [enableSaveButton, setEnableSaveButton] = useState(true);


  useEffect(() => {
    setEnableSaveButton(
      !Boolean(
        name.length &&
          cpf.length &&
          rg.length &&
          email.length &&
          birthDate &&
          phone.length &&
          image
      )
    );
  }, [name, cpf, rg, email, birthDate, phone, image]);

  const [openLoading, setOpenLoading] = useState(false);

  const handlePagination = async (
    event: ChangeEvent<unknown>,
    value: number
  ) => {
    setOpenLoading(true);
    await getStudents("", value);
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
    setOpenLoading(false);
  };

  const handleCloseLoading = () => {
    setOpenLoading(false);
  };

  return (
    <>
      <Dialog open={modalIsOpen} onClose={closeModal}>
        <DialogTitle>Add new Student</DialogTitle>
        <DialogContent>
          <ContentModal />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal}>Close</Button>
          {loadingButtonSave ? (
            <LoadingButton
              loading
              loadingPosition="start"
              startIcon={<SaveIcon />}
              variant="outlined"
            >
              Save
            </LoadingButton>
          ) : (
            <Button
              onClick={saveStudent}
              disabled={enableSaveButton}
              autoFocus
              variant="contained"
            >
              Save
            </Button>
          )}
        </DialogActions>
      </Dialog>

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openLoading}
        onClick={handleCloseLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Style.Container>
        <Style.Header>
          Students enrolled
          <Button
            startIcon={<AddIcon />}
            variant="contained"
            onClick={openModal}
          >
            Add New Student
          </Button>
        </Style.Header>
        <Style.Content>
          {students.map((student) => (
            <CardComponent
              key={student.id}
              id={student.id}
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
        {totalStudents > 10 && (
          <Pagination
            page={page}
            onChange={handlePagination}
            count={Math.ceil(totalStudents / 10)}
            sx={{ margin: 3 }}
            color="primary"
          />
        )}
      </Style.Container>
    </>
  );
};
