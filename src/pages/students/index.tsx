import { useEffect, useState } from "react";

import { API } from "../../services/connection";
import { Card } from "../../components";

export const Students = () => {
  const [studentsData, setStudentsData] = useState([]);

  useEffect(() => {
    const getStudents = async () => {
      const response = await API.get("students/");
      console.log(response);
      setStudentsData(response.data.results);
    };
    getStudents();
  }, []);

  return (
    <div>
      {studentsData.length &&
        studentsData.map((student) => (
          <Card
            key={student.id}
            photoURL={student.photo}
            name={student.name}
            birthDate={student.birth_data}
            email={student.email}
            cpf={student.cpf}
            rg={student.rg}
          />
        ))}
    </div>
  );
};
