import { createContext, useState, useContext, ReactNode } from "react";
import { API } from "../services/connection";
import { StudentProps, StudentResponse } from "../types";

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
  handleStudents: any;
  errorsInputs: Errors;
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
        students,
        page,
        totalStudents,
        handleStudents,
        handleInputErrors,
        resetInputErrors,
        errorsInputs,
        getStudentsContext,
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
