import React, { useEffect } from "react";
import failed from "../../data/failed.png";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const OrderFailed = () => {
  const navigate = useNavigate();
  useEffect(() => {
    // getTxn()
    setTimeout(() => {
      navigate("/learning");
    }, 2000);
  }, []);
  return (
    <div
      style={{
        width: "100%",
        height: "90vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <img
        src={failed}
        alt="failed"
        style={{ height: "100px", width: "100px" }}
        loading="lazy"
      />
      <Typography variant="h5" color="error">
        Payment Failed
      </Typography>
      <Typography variant="h7" color="blue">
        Redirecting....
      </Typography>
    </div>
  );
};

export default OrderFailed;
