import { useState } from "react";

import { API } from "../../services/connection";
import { StudentProps } from "../../types";

export default () => {
  const [studentsData, setStudentsData] = useState<StudentProps[]>([]);
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);

  const getStudents = async () => {
    const response = await API.get("students/");
    setStudentsData(response.data.results);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  return { getStudents, closeModal, openModal, studentsData, modalIsOpen };
};
