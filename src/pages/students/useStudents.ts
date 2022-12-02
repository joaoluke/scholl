import { format } from "date-fns";
import { useState, ChangeEvent } from "react";

import { API } from "../../services/connection";
import { StudentProps } from "../../types";
import { formatCPF, formatPhone, formattedRG } from "../../utils";

export default () => {
  const [studentsData, setStudentsData] = useState<StudentProps[]>([]);
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [cpf, setCPF] = useState<string>("");
  const [rg, setRG] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [birthDate, setBirthDate] = useState<Date>(new Date());
  const [phone, setPhone] = useState<string>("");
  const [image, setImage] = useState<any>("");

  const [totalStudents, setTotalStudents] = useState<any>("");
  const [page, setPage] = useState<any>(1);

  const [errorsInputs, setErrorsInputs] = useState({
    name: "",
    cpf: "",
    rg: "",
  });

  const getStudents = async (pageNumber = 1) => {
    setPage(pageNumber);
    const response = await API.get(`students/?page=${pageNumber}`);
    setStudentsData(response.data.results);
    setTotalStudents(response.data.count);
  };

  const saveStudent = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("cpf", cpf);
    formData.append("rg", rg);
    formData.append("email", email);
    formData.append("birth_data", format(birthDate, "yyyy-MM-dd"));
    formData.append("phone", phone);
    formData.append("photo", image);

    console.log(formData, "formData");
    const response = await API.post("students/", formData);
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

  const handleImage = (file: any) => {
    setImage(file);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
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
  };
};
