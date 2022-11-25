import { useEffect } from "react";
import Modal from "react-modal";
import { GrAdd } from "react-icons/gr";

import { Button, Card } from "../../components";
import { ContentModal } from "./components/ContentModal";
import useStudents from "./useStudents";

import * as Style from "./style";

export const Students = () => {
  const { getStudents, studentsData, modalIsOpen, closeModal, openModal } =
    useStudents();

  useEffect(() => {
    getStudents();
  }, []);

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
        <ContentModal />
      </Modal>
      <Style.Container>
        <Style.Header>
          Students enrolled
          <Button onClick={openModal} icon={<GrAdd />}>
            Student
          </Button>
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
    </>
  );
};
