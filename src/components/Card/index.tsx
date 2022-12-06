import { useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import { parseISO, format } from "date-fns";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import SendIcon from "@mui/icons-material/Send";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Chip from "@mui/material/Chip";
import CakeIcon from "@mui/icons-material/Cake";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PhoneIcon from "@mui/icons-material/Phone";
import AccountBoxIcon from "@mui/icons-material/AccountBox";

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
}: CardProps) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Card
      sx={{ width: 250, margin: 3, height: expanded ? "auto" : "fit-content" }}
    >
      <CardMedia
        component="img"
        height="250"
        image={photoURL}
        alt="Paella dish"
      />
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

        <Badge >
          <MailIcon color="action" sx={{ marginRight: 1 }}/>
          <Typography variant="caption" display="block">
            {email}
          </Typography>
        </Badge>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton>
          <DeleteIcon color="error" />
        </IconButton>
        <IconButton>
          <EditIcon color="warning" />
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
  );
};
