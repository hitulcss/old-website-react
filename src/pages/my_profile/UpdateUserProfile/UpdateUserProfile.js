import React, { useContext, useState } from "react";
import "../MyProfile.css";
import { Button, Typography } from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { CoursesData } from "../../../context/courses/Courses";
import { useNavigate, useSearchParams } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";

const UpdateUserProfile = ({ userData, handleClose }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const ref = searchParams.get("ref");

  const navigate = useNavigate();
  const { updateUserProfile } = useContext(CoursesData);
  const [userDetails, setUserDetails] = useState({
    FullName: userData?.FullName,
    email: userData?.email,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    // setUserDetails(value)
    setUserDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    // console.log('Details', userDetails)
    updateUserProfile(userDetails);
    handleClose();
  };
  // console.log(userDetails)
  const [isEdit, setIsEdit] = useState(true);
  return (
    <div>
      <Typography
        className="login_right_title"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <span>Personal Information</span>
        <p onClick={() => setIsEdit(!isEdit)} style={{ cursor: "pointer" }}>
          <EditIcon />
        </p>
      </Typography>
      <div className="login_right_input_container">
        {/* <p>Please enter your name </p> */}
        <FormControl variant="outlined" className="email_input_conatiner">
          {isEdit ? (
            <Typography
              sx={{ display: "flex", gap: "10px", alignItems: "center" }}
            >
              <span style={{ fontSize: "20px", fontWeight: "900" }}>Name:</span>
              <span>{userData?.FullName}</span>
            </Typography>
          ) : (
            <>
              {" "}
              <InputLabel style={{ width: "4rem" }}>Name</InputLabel>
              <OutlinedInput
                className="input_email"
                type="text"
                name="FullName"
                value={userDetails?.FullName}
                onChange={(e) => handleChange(e)}
                // label="number"
              />
            </>
          )}
        </FormControl>
        <FormControl variant="outlined" className="email_input_conatiner">
          {isEdit ? (
            <Typography
              sx={{ display: "flex", gap: "10px", alignItems: "center" }}
            >
              <span style={{ fontSize: "20px", fontWeight: "900" }}>
                Email:
              </span>
              <span>{userData?.email}</span>
            </Typography>
          ) : (
            <>
              <InputLabel style={{ width: "20rem" }}>Email</InputLabel>
              <OutlinedInput
                className="input_email"
                type="email"
                name="email"
                value={userDetails?.email}
                onChange={(e) => handleChange(e)}
                // label="number"
              />
            </>
          )}
        </FormControl>
        <Typography sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <span style={{ color: "black", fontSize: "20px", fontWeight: "900" }}>
            Mobile:
          </span>
          <span>{userData?.phoneNumber}</span>
        </Typography>
      </div>

      {!isEdit && (
        <Button className="save_change_btn" onClick={handleSubmit}>
          Save Changes
        </Button>
      )}
    </div>
  );
};

export default UpdateUserProfile;
