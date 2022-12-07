import { createContext, useState, useContext, ReactNode } from "react";

interface StudentContextData {
  students: any;
  handleStudents: any;
}

type PropsStudentProviders = {
  children: ReactNode;
};

const StudentContext = createContext({} as StudentContextData);

const StudentContextProvider = ({ children }: PropsStudentProviders) => {
  const [students, setStudents] = useState<any>([]);
  const [errorsInputs, setErrorsInputs] = useState({
    name: [],
    cpf: [],
    rg: [],
    email: [],
  });

  const handleInputErrors = (errors) => {
    setErrorsInputs(errors);
  };

  const handleStudents = (value) => {
    setStudents(value);
  };

  return (
    <StudentContext.Provider
      value={{ students, handleStudents, handleInputErrors, errorsInputs }}
    >
      {children}
    </StudentContext.Provider>
  );
};

export const useStudentContext = () => {
  return useContext(StudentContext);
};

export default StudentContextProvider;
