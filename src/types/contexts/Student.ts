import { ChangeEvent } from "react";
import { StudentProps, StudentResponse } from "../api/Student";

export interface Errors {
  rg?: String[];
  cpf?: String[];
  email?: String[];
  photo?: String[];
  phone?: String[];
  name?: String[];
}

export type StudentContextData = {
  students: StudentProps[];
  page: number;
  totalStudents: number;
  errorsInputs: Errors;
  name: string;
  cpf: string;
  rg: string;
  email: string;
  birthDate: Date;
  phone: string;
  image: any;
  loadingButton: boolean;
  openModalConfirmationDelete: number;
  handleName(event: ChangeEvent<HTMLInputElement>): void;
  handleCPF(event: ChangeEvent<HTMLInputElement>): void;
  handleRG(event: ChangeEvent<HTMLInputElement>): void;
  handleEmail(event: ChangeEvent<HTMLInputElement>): void;
  handleBirthDate(date: Date | null): void;
  handlePhone(event: ChangeEvent<HTMLInputElement>): void;
  handleImage(files: FileList): void;
  handleStudents(value: StudentProps[]): void;
  handleInputErrors(errors: Errors): void;
  resetInputErrors(): void;
  getStudentsContext(search: string, page: number): Promise<StudentResponse>;
  deleteStudent(id: string): void;
  changeModalConfirmationDelete(value: number): void;
};
