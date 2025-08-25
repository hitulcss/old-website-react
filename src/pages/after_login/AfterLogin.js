import React, { useEffect } from "react";
import "./AfterLogin.css";
import NavBar from "./NavBar/NavBar";
import SideBar from "../../components/Sidebar/SideBar";
import { useNavigate } from "react-router-dom";

const AfterLogin = () => {
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.setItem('index', 0)
    navigate("/learning/home");
  }, []);
  return (
    <>
      <div className="after_login_wrapper">{/* <MyDrawer /> */}</div>
      <NavBar />

      <div>
        {" "}
        <SideBar />
      </div>
    </>
  );
};

export default AfterLogin;
