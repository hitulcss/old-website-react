import React from "react";
import "./NestedDropdown.css";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { MdOutlineArrowDropDown } from "react-icons/md";

const Dropdown_Job_Menu = () => {
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const [openJobs, setOpenJobs] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  const handleClick1 = () => {
    setOpen1(!open1);
  };

  const handleClick2 = () => {
    setOpen2(!open2);
  };
  const handleClick3 = () => {
    setOpen3(!open3);
  };

  const handleJobClick = () => {
    setOpenJobs(!openJobs);
  };

  return (
    <>
      <div>
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader
              component="div"
              id="nested-list-subheader"
              onClick={handleJobClick}
            >
              <p
                style={{
                  fontWeight: "600",
                  fontSize: "18px",
                  color: "var(--primaryColor)",
                }}
              >
                Jobs <MdOutlineArrowDropDown />
              </p>
            </ListSubheader>

            //             <ListItemButton onClick={handleClick}>
            //               <ListItemText primary="Jobs" />
            //               {open ? <ExpandLess /> : <ExpandMore />}
            //             </ListItemButton>
          }
        >
          <Collapse in={openJobs} timeout="auto" unmountOnExit>
            <ListItemButton
              onClick={handleClick}
              style={{ width: "1000%" }}
              className="list-item-button"
            >
              <ListItemText primary="Govt. Exams" />
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemText primary="SSC" />
                </ListItemButton>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemText primary="Banking" />
                </ListItemButton>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemText primary="Defence" />
                </ListItemButton>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemText primary="Railway" />
                </ListItemButton>
              </List>
            </Collapse>
            <ListItemButton onClick={handleClick1} className="list-item-button">
              <ListItemText primary="Entrance Exams" />
              {open1 ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open1} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemText primary="GATE" />
                </ListItemButton>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemText primary="MBA" />
                </ListItemButton>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemText primary="LAW" />
                </ListItemButton>
              </List>
            </Collapse>
            <ListItemButton onClick={handleClick2} className="list-item-button">
              <ListItemText primary="School" />
              {open2 ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open2} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemText primary="School" />
                </ListItemButton>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemText primary="Comerce" />
                </ListItemButton>
              </List>
            </Collapse>
            <ListItemButton onClick={handleClick3} className="list-item-button">
              <ListItemText primary="Other Exams" />
              {open3 ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open3} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemText primary="CA" />
                </ListItemButton>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemText primary="SD CAMPUS" />
                </ListItemButton>
              </List>
            </Collapse>
          </Collapse>
        </List>
      </div>
    </>
  );
};

export default Dropdown_Job_Menu;
