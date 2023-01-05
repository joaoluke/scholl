import { CoursesProps, CoursesResponse } from "..";

export type CoursesContextData = {
  courses: CoursesProps[];
  getCourses(): void;
};
