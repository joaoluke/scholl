export type StudentProps = {
  photo: string;
  name: string;
  birth_data: string;
  email: string;
  cpf: string;
  rg: string;
  id: string;
  phone: string;
};

export type StudentResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: StudentProps[];
};
