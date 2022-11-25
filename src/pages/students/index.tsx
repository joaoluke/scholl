import { useEffect, useState } from "react";
import { GrAdd } from "react-icons/gr";

import { API } from "../../services/connection";
import { Button, Card } from "../../components";
import { StudentProps } from "../../types";

import * as Style from "./style";

export const Students = () => {
  const [studentsData, setStudentsData] = useState<StudentProps[]>([]);

  useEffect(() => {
    const getStudents = async () => {
      const response = await API.get("students/");
      setStudentsData(response.data.results);
    };

    getStudents();
  }, []);

  return (
    <Style.Container>
      <Style.Header>
        Students enrolled
        <Button icon={<GrAdd />}>Student</Button>
      </Style.Header>
      <Style.Content>
        {studentsData.map((student) => (
          <Card
            key={student.id}
            photoURL={student.photo}
            name={student.name}
            birthDate={student.birth_data}
            email={student.email}
            cpf={student.cpf}
            rg={student.rg}
            phoneNumber={student.phone}
          />
        ))}
      </Style.Content>
    </Style.Container>
  );
};
