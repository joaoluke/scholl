import { createContext, useState, useContext, ReactNode } from "react";

interface StudentContextData {
  books: string;
}

type PropsStudentProviders = {
  children: ReactNode;
};

const StudentContext = createContext({} as StudentContextData);

const StudentContextProvider = ({ children }: PropsStudentProviders) => {
  const [books, setBooks] = useState<any>([]);
  return (
    <StudentContext.Provider value={{ books }}>
      {children}
    </StudentContext.Provider>
  );
};

export const useStudent = () => {
  return useContext(StudentContext);
};

export default StudentContextProvider;
