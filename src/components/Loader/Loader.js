import React, { useContext } from "react";
import { CoursesData } from "../../context/courses/Courses";
import logo from "../../assets/logo.png";
import "./Loader.css";

const Loader = () => {
  const { loading } = useContext(CoursesData);
  return (
    <>
      {loading && (
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "90vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          {/* <CircularProgress color="secondary" /> */}
          <img src={logo} className="loader-logo" loading="lazy" />
          <div className="loader"></div>
        </div>
      )}
    </>
  );
};

export default Loader;
