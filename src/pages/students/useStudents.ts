import { useState } from "react";

import { useStudentContext } from "../../contexts/Student";
import { StudentProps } from "../../types";
import { useAlertsContext } from "../../contexts/Alerts";

export default () => {
  const {
    getStudentsContext,
    errorsInputs,
    handleStudents,
  } = useStudentContext();
  const { handleOpenAlertSuccess } = useAlertsContext();

  const [studentsData, setStudentsData] = useState<StudentProps[]>([]);

  const [totalStudents, setTotalStudents] = useState<any>("");
  const [page, setPage] = useState<any>(1);

  const getStudents = async (search = "", pageNumber = 1) => {
    setPage(pageNumber);
    const response = await getStudentsContext(search, pageNumber);
    setStudentsData(response.results);
    handleStudents(response.results);
    setTotalStudents(response.count);
  };

  return {
    studentsData,
    totalStudents,
    page,
    getStudents,
    errorsInputs,
  };
};
