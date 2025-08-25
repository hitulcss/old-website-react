import { Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import { CoursesData } from "../../context/courses/Courses";

const OrderStatus = () => {
  const navigate = useNavigate();
  const { orderId, userId } = useParams();
  const { verify_ebook_payment, ebookPayment } = useContext(CoursesData);
  useEffect(() => {
    verify_ebook_payment({ orderId: orderId });
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
        src=""
        alt="failed"
        style={{ height: "100px", width: "100px" }}
        loading="lazy"
      />
      {ebookPayment == "success" ? (
        <Typography variant="h5" color="green">
          Payment Success
        </Typography>
      ) : (
        <Typography variant="h5" color="green">
          Pending
        </Typography>
      )}

      <Typography variant="h7" color="blue">
        Redirecting....
      </Typography>
    </div>
  );
};

export default OrderStatus;
