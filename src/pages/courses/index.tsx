import { useEffect } from "react";

import { CardCoursesComponent } from "../../components";
import { useCoursesContext } from "../../contexts/Courses";

import * as Style from "./style";

export const Courses = () => {
  const { getCourses, courses } = useCoursesContext();

  useEffect(() => {
    getCourses();
  }, []);

  console.log(courses);

  return (
    <div>
      <Style.Content>
        {courses.map((course) => (
          <CardCoursesComponent
            key={course.id}
            photo={course.photo}
            code={course.code}
            description={course.description}
            name={course.name}
          />
        ))}
      </Style.Content>
    </div>
  );
};
