import { createContext, useContext, ReactNode, useState } from "react";
import { format } from "date-fns";
import request from "axios";

import { API } from "../services/connection";
import { CoursesProps, Errors, CoursesContextData } from "../types";
import { formatCPF, formatPhone, formattedRG } from "../utils";
import { useAlertsContext } from "./Alerts";

type PropsCoursesProviders = {
  children: ReactNode;
};

const CoursesContext = createContext({} as CoursesContextData);

const CoursesContextProvider = ({ children }: PropsCoursesProviders) => {
  const [courses, setCourses] = useState<CoursesProps[]>([]);

  const getCourses = async () => {
    const response = await API.get("courses/", {
      // params: {
      //   search: search,
      //   page: pageNumber,
      // },
    });

    setCourses(response.data.results);
  };

  return (
    <CoursesContext.Provider
      value={{
        courses,
        getCourses,
      }}
    >
      {children}
    </CoursesContext.Provider>
  );
};

export const useCoursesContext = () => {
  return useContext(CoursesContext);
};

export default CoursesContextProvider;
