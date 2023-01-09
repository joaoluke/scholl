import { useState } from "react";
import { styled } from "@mui/material/styles";
import { parseISO, format } from "date-fns";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import SaveIcon from "@mui/icons-material/Save";
import LoadingButton from "@mui/lab/LoadingButton";
import DialogContentText from "@mui/material/DialogContentText";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Chip from "@mui/material/Chip";
import CakeIcon from "@mui/icons-material/Cake";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PhoneIcon from "@mui/icons-material/Phone";

import { useStudentContext } from "../../contexts/Student";
import { CardProps } from "../../types";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export const CardComponent = ({
  phoneNumber,
  photoURL,
  name,
  birthDate,
  email,
  cpf,
  rg,
  id,
}: CardProps) => {
  const {
    deleteStudent,
    loadingButton,
    openModalConfirmationDelete,
    changeModalConfirmationDelete,
  } = useStudentContext();
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <Dialog
        open={openModalConfirmationDelete === Number(id)}
        onClose={() => changeModalConfirmationDelete(-1)}
      >
        <DialogTitle>Delete Student</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to remove this student? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => changeModalConfirmationDelete(-1)}>
            Close
          </Button>
          {loadingButton ? (
            <LoadingButton
              loading
              loadingPosition="start"
              startIcon={<SaveIcon />}
              variant="outlined"
            >
              Delete
            </LoadingButton>
          ) : (
            <Button
              onClick={() => deleteStudent(id)}
              autoFocus
              variant="contained"
            >
              Delete
            </Button>
          )}
        </DialogActions>
      </Dialog>
      <Card
        sx={{
          width: 250,
          margin: 3,
          height: expanded ? "auto" : "fit-content",
        }}
      >
        <CardMedia component="img" height="250" image={photoURL} />
        <CardContent>
          <Chip
            icon={<CakeIcon color="primary" />}
            label={format(parseISO(birthDate), "MM/dd/yyyy")}
            variant="outlined"
            sx={{ marginBottom: 1 }}
          />
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>

          <Badge>
            <MailIcon color="action" sx={{ marginRight: 1 }} />
            <Typography variant="caption" display="block">
              {email}
            </Typography>
          </Badge>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton onClick={() => changeModalConfirmationDelete(Number(id))}>
            <DeleteIcon color="primary" />
          </IconButton>
          <IconButton onClick={() => changeModalConfirmationDelete(Number(id))}>
            <EditIcon color="primary" />
          </IconButton>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <List
              sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
              component="nav"
            >
              <ListItemButton>
                <ListItemIcon>
                  <PhoneIcon />
                </ListItemIcon>
                <ListItemText primary={phoneNumber} />
              </ListItemButton>
              <ListItemButton>
                <ListItemIcon>
                  <ListItemText primary="CPF" />
                </ListItemIcon>
                <ListItemText primary={cpf} />
              </ListItemButton>
              <ListItemButton>
                <ListItemIcon>
                  <ListItemText primary="RG" />
                </ListItemIcon>
                <ListItemText primary={rg} />
              </ListItemButton>
            </List>
          </CardContent>
        </Collapse>
      </Card>
    </>
  );
};
