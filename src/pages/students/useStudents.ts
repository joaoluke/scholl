import { useState, ChangeEvent } from "react";
import { format } from "date-fns";
import request from "axios";

import { useStudentContext } from "../../contexts/Student";
import { API } from "../../services/connection";
import { StudentProps } from "../../types";
import { formatCPF, formatPhone, formattedRG } from "../../utils";
import { useAlertsContext } from "../../contexts/Alerts";

export default () => {
  const { handleInputErrors, errorsInputs, resetInputErrors, handleStudents } =
    useStudentContext();
  const { handleOpenAlertSuccess } = useAlertsContext();

  const [studentsData, setStudentsData] = useState<StudentProps[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [cpf, setCPF] = useState<string>("");
  const [rg, setRG] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [birthDate, setBirthDate] = useState<Date>(new Date());
  const [phone, setPhone] = useState<string>("");
  const [image, setImage] = useState<any>("");
  const [loadingButtonSave, setLoadingButtonSave] = useState<boolean>(false);

  const [totalStudents, setTotalStudents] = useState<any>("");
  const [page, setPage] = useState<any>(1);

  const checkEmptyInput = () => () =>
    Boolean(
      name.length &&
        cpf.length &&
        rg.length &&
        email.length &&
        birthDate &&
        phone.length &&
        image.length
    );

  const getStudents = async (pageNumber = 1) => {
    setPage(pageNumber);
    const response = await API.get(`students/?page=${pageNumber}`);
    setStudentsData(response.data.results);
    handleStudents(response.data.results);
    setTotalStudents(response.data.count);
  };

  const getStudent = async (id: number) => {
    const response = await API.get(`students/${id}`);
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

    console.log(formData, "formData");
    try {
      const response = await API.post("students/", formData);
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

  const handleName = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

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

  const handleEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleBirthDate = (date: Date) => {
    setBirthDate(date);
  };

  const handlePhone = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length <= 12) {
      setPhone(formatPhone(event.target.value));
    }
  };

  const handleImage = (files: FileList) => {
    setImage(files[0]);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  return {
    name,
    handleName,
    cpf,
    handleCPF,
    rg,
    handleRG,
    email,
    handleEmail,
    phone,
    handlePhone,
    birthDate,
    handleBirthDate,
    image,
    handleImage,
    getStudents,
    closeModal,
    openModal,
    studentsData,
    modalIsOpen,
    saveStudent,
    totalStudents,
    page,
    checkEmptyInput,
    errorsInputs,
    loadingButtonSave,
  };
};
