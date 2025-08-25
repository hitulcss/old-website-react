import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import "./Menu.css";
import MenuItem from "@mui/material/MenuItem";
import { BsThreeDots } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import { MdBookmark, MdOutlineContentCopy } from "react-icons/md";
import { MdReportGmailerrorred } from "react-icons/md";
import { MdOutlinePolicy } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "@mui/material";

export default function BasicMenu({
  showReport,
  setShowReport,
  data,
  shortLearningPolicy,
  setShortLearningPrivacyPolicy,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const navigate = useNavigate();
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      {/* <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      > */}
      <div
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        {" "}
        <Tooltip title="More Options" placement="right">
          <div className="micro-icon-container">
            {" "}
            <BsThreeDots className="micro-learning-icon" />
          </div>
        </Tooltip>
      </div>
      {/* </Button> */}
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        style={{ padding: "0px" }}
      >
        <div className="menu-item">
          <div className="menu-item-upper">
            <p>Options</p> <IoClose onClick={handleClose} />
          </div>
          <p style={{ border: "1px solid #efefef" }}> </p>
          <div className="menu-item-lower">
            <div
              onClick={() => {
                localStorage.setItem("index", 6);
                navigate("/learning/saved-post");
              }}
            >
              <p>View Saved</p> <MdBookmark />
            </div>
            <p style={{ border: "1px solid #efefef" }}> </p>
            <div
              onClick={() => {
                setShowReport({ show: true, type: "post", data: data });
                handleClose();
              }}
            >
              <p>Report</p> <MdReportGmailerrorred />
            </div>
            <p style={{ border: "1px solid #efefef" }}> </p>
            <div
              onClick={() =>
                setShortLearningPrivacyPolicy(!shortLearningPolicy)
              }
            >
              <p>Chat Policy</p> <MdOutlinePolicy />
            </div>
          </div>
        </div>
        {/* <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem> */}
      </Menu>
    </div>
  );
}
