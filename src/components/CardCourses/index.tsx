import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { CardCoursesProps } from "../../types";

export const CardCoursesComponent = ({
  photo,
  description,
  name,
  code,
}: CardCoursesProps) => {
  console.log("course");
  return (
    <Card sx={{ width: 345, margin: 3 }}>
      <CardMedia sx={{ height: 140 }} image={photo} title="green iguana" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">{code}</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
};
