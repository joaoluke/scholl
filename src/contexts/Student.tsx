import {
  createContext,
  useState,
  useContext,
  ReactNode,
  ChangeEvent,
} from "react";

import { API } from "../services/connection";
import { StudentProps, StudentResponse } from "../types";
import { formatCPF, formatPhone, formattedRG } from "../utils";

interface Errors {
  rg?: String[];
  cpf?: String[];
  email?: String[];
  photo?: String[];
  phone?: String[];
  name?: String[];
}
interface StudentContextData {
  students: StudentProps[];
  page: number;
  totalStudents: number;
  errorsInputs: Errors;
  name: string;
  cpf: string;
  rg: string;
  email: string;
  birthDate: Date;
  phone: string;
  image: any;
  handleName(event: ChangeEvent<HTMLInputElement>): void;
  handleCPF(event: ChangeEvent<HTMLInputElement>): void;
  handleRG(event: ChangeEvent<HTMLInputElement>): void;
  handleEmail(event: ChangeEvent<HTMLInputElement>): void;
  handleBirthDate(date: Date | null): void;
  handlePhone(event: ChangeEvent<HTMLInputElement>): void;
  handleImage(files: FileList): void;
  handleStudents(value: StudentProps[]): void;
  handleInputErrors(errors: Errors): void;
  resetInputErrors(): void;
  getStudentsContext(search: string, page: number): Promise<StudentResponse>;
}

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
        totalStudents,
        handleStudents,
        handleInputErrors,
        resetInputErrors,
        errorsInputs,
        getStudentsContext,
        handleName,
        handleCPF,
        handleRG,
        handleEmail,
        handleBirthDate,
        handlePhone,
        handleImage
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
