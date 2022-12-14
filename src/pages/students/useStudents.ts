import { useState, ChangeEvent } from "react";
import { format } from "date-fns";
import request from "axios";

import { useStudentContext } from "../../contexts/Student";
import { API } from "../../services/connection";
import { StudentProps } from "../../types";
import { formatCPF, formatPhone, formattedRG } from "../../utils";
import { useAlertsContext } from "../../contexts/Alerts";

export default () => {
  const {
    handleInputErrors,
    getStudentsContext,
    errorsInputs,
    resetInputErrors,
    handleStudents,
    name,
    cpf,
    rg,
    email,
    birthDate,
    phone,
    image,
  } = useStudentContext();
  const { handleOpenAlertSuccess } = useAlertsContext();

  const [studentsData, setStudentsData] = useState<StudentProps[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [loadingButtonSave, setLoadingButtonSave] = useState<boolean>(false);

  const [totalStudents, setTotalStudents] = useState<any>("");
  const [page, setPage] = useState<any>(1);

  const getStudent = async (id: number) => {
    const response = await API.get(`students/${id}`);
  };

  const getStudents = async (search = "", pageNumber = 1) => {
    setPage(pageNumber);
    const response = await getStudentsContext(search, pageNumber);
    setStudentsData(response.results);
    handleStudents(response.results);
    setTotalStudents(response.count);
  };

  const saveStudent = async () => {
    setLoadingButtonSave(true);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("cpf", cpf);
    formData.append("rg", rg);
    formData.append("email", email);
    formData.append("birth_data", format(birthDate, "yyyy-MM-dd"));
    formData.append("phone", phone);
    formData.append("photo", image);

    try {
      await API.post("students/", formData);
      closeModal();
      resetInputErrors();
      handleOpenAlertSuccess("Student successfully saved!");
    } catch (error) {
      if (request.isAxiosError(error) && error.response) {
        handleInputErrors(error.response?.data);
      }
    } finally {
      setLoadingButtonSave(false);
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  return {
    closeModal,
    openModal,
    studentsData,
    modalIsOpen,
    saveStudent,
    totalStudents,
    page,
    getStudents,
    errorsInputs,
    loadingButtonSave,
  };
};
