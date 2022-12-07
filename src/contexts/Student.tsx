import { createContext, useState, useContext, ReactNode } from "react";

interface Student {
  id: number;
  name: string;
  rg: string;
  cpf: string;
  email: string;
  birth_data: string;
  phone: string;
  photo: string;
}

interface Errors {
  "rg"?: String[]
  "cpf"?: String[]
  "email"?: String[]
  "photo"?: String[]
  "phone"?: String[]
  "name"?: String[]
}
interface StudentContextData {
  students: Student[];
  handleStudents: any;
  errorsInputs: Errors
  handleInputErrors(errors: Errors): void
  resetInputErrors(): void
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
  const [students, setStudents] = useState<Student[]>([]);
  const [errorsInputs, setErrorsInputs] = useState<Errors>(errorInInputs);

  const handleInputErrors = (errors: Errors) => {
    setErrorsInputs(errors);
  };

  const handleStudents = (value: Student[]) => {
    setStudents(value);
  };

  const resetInputErrors = () => {
    setErrorsInputs(errorInInputs);
  };

  return (
    <StudentContext.Provider
      value={{
        students,
        handleStudents,
        handleInputErrors,
        resetInputErrors,
        errorsInputs,
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
