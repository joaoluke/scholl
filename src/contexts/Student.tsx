import {
  createContext,
  useState,
  useContext,
  ReactNode,
  ChangeEvent,
} from "react";
import { format } from "date-fns";
import request from "axios";

import { API } from "../services/connection";
import { StudentProps, Errors, StudentContextData } from "../types";
import { formatCPF, formatPhone, formattedRG } from "../utils";
import { useAlertsContext } from "./Alerts";

type PropsStudentProviders = {
  children: ReactNode;
};

const StudentContext = createContext({} as StudentContextData);

const errorInInputs = {
  name: [],
  cpf: [],
  rg: [],
  email: [],
  phone: [],
};

const StudentContextProvider = ({ children }: PropsStudentProviders) => {
  const { handleOpenAlertError, handleOpenAlertSuccess } = useAlertsContext();

  const [students, setStudents] = useState<StudentProps[]>([]);
  const [errorsInputs, setErrorsInputs] = useState<Errors>(errorInInputs);
  const [page, setPage] = useState<number>(1);
  const [totalStudents, setTotalStudents] = useState<number>(0);
  const [name, setName] = useState<string>("");
  const [cpf, setCPF] = useState<string>("");
  const [rg, setRG] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [birthDate, setBirthDate] = useState<Date>(new Date());
  const [phone, setPhone] = useState<string>("");
  const [image, setImage] = useState<any>("");

  const resetInputs = () => {
    setName("");
    setCPF("");
    setRG("");
    setEmail("");
    setBirthDate(new Date());
    setPhone("");
  };

  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const [loadingButton, setLoadingButton] = useState<boolean>(false);

  const [openModalConfirmationDelete, setOpenModalConfirmationDelete] =
    useState<number>(-1);

  const changeModalConfirmationDelete = (value: number) => {
    setOpenModalConfirmationDelete(value);
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

  const handleInputErrors = (errors: Errors) => {
    setErrorsInputs(errors);
  };

  const handleStudents = (value: StudentProps[]) => {
    setStudents(value);
  };

  const resetInputErrors = () => {
    setErrorsInputs(errorInInputs);
  };

  const getStudentsContext = async (search = "", pageNumber = 1) => {
    const response = await API.get("students/", {
      params: {
        search: search,
        page: pageNumber,
      },
    });
    setPage(pageNumber);
    setTotalStudents(response.data.count);
    setStudents(response.data.results);
    return response.data;
  };

  const saveStudent = async () => {
    setLoadingButton(true);
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
      resetInputs();
      handleOpenAlertSuccess("Student successfully saved!");
    } catch (error) {
      if (request.isAxiosError(error) && error.response) {
        handleInputErrors(error.response?.data);
      } else {
        handleOpenAlertError("Error saving student");
      }
    } finally {
      setLoadingButton(false);
    }
  };

  const deleteStudent = async (id: string) => {
    try {
      setLoadingButton(true);
      await API.delete(`students/${id}/`);
      handleOpenAlertSuccess("Student removed successfully");
      await getStudentsContext("", page);
    } catch (err) {
      handleOpenAlertError("Error deleting student");
    } finally {
      setLoadingButton(false);
      setOpenModalConfirmationDelete(-1);
    }
  };

  return (
    <StudentContext.Provider
      value={{
        name,
        cpf,
        rg,
        email,
        birthDate,
        phone,
        image,
        students,
        page,
        modalIsOpen,
        closeModal,
        openModal,
        loadingButton,
        totalStudents,
        openModalConfirmationDelete,
        handleStudents,
        handleInputErrors,
        resetInputErrors,
        errorsInputs,
        getStudentsContext,
        saveStudent,
        handleName,
        handleCPF,
        handleRG,
        handleEmail,
        handleBirthDate,
        handlePhone,
        handleImage,
        deleteStudent,
        changeModalConfirmationDelete,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};

export const useStudentContext = () => {
  return useContext(StudentContext);
};

export default StudentContextProvider;
