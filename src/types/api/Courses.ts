export type CoursesProps = {
  code: string;
  description: string;
  id: number;
  level: string;
  name: string;
  photo: string;
};

export type CoursesResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: CoursesProps[];
};
