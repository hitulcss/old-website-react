import React from "react";
import not_found_404 from "../../data/404 Error Page.svg";
import "./NotFound404.css";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

const NotFound404 = () => {
  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <div className="NotFound404_parent">
        <div className="NotFound404_child">
          <img
            src={not_found_404}
            style={{ height: 400 }}
            loading="lazy"
            alt="img"
          />
          <Button
            sx={{
              borderRadius: "20px",
              background: "var(--primaryColor)",
              color: "white",
              width: "200px",
            }}
            className="explore_button_404"
            onClick={() => navigate("/")}
          >
            Explore
          </Button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NotFound404;
