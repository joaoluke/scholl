import { useEffect } from "react";

import { useCoursesContext } from "../../contexts/Courses";

import * as Style from "./style";

export const Courses = () => {
  const { getCourses, courses } = useCoursesContext();

  useEffect(() => {
    getCourses();
  }, []);

  return (
    <div>
      {/* <Style.Content>
        {courses.forEach((student) => (
          <CardComponent />
        ))} */}
      {/* </Style.Content> */}
    </div>
  );
};
