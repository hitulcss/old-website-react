import { Typography } from "@mui/material";
import React, { useEffect } from "react";
import success from "../../data/success.png";
import { useNavigate } from "react-router-dom";
import { pushToDataLayer } from "../../gtm/gtm";

const OrderSuccess = () => {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      localStorage.setItem("index", 1);
      navigate("/learning/my-courses");
    }, 2000);
  }, []);

  let cart = JSON.parse(localStorage.getItem("cart"));
  let orderId = localStorage.getItem("orderId");

  useEffect(() => {
    if (cart) {
      pushToDataLayer({
        ecommerce: null, // Clear the previous ecommerce object.
      });
      pushToDataLayer({
        event: "purchase",
        ecommerce: {
          transaction_id: orderId ? orderId : "",
          value: parseInt(cart?.amount),
          // tax: 3.60,
          shipping: parseInt(cart?.shippingCharges),
          currency: "INR",
          coupon: cart?.coupon,
          items: [
            {
              item_id: cart?.cart?.id,
              item_name: cart?.cart?.batchName,
              affiliation: cart?.cart?.categoryDetails.title,
              coupon: "",
              discount: cart?.cart?.discount,
              index: 0,
              item_category: cart?.cart?.categoryDetails.title,

              item_brand: "Book",
              price: parseInt(cart?.amount),
              quantity: 1,
            },
          ],
        },
      });
    }
    localStorage.removeItem("cart");
    localStorage.removeItem("orderId");
  }, [cart]);
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
        src={success}
        alt="failed"
        style={{ height: "100px", width: "100px" }}
      />
      <Typography variant="h5" color="green">
        Payment Success
      </Typography>
      <Typography variant="h7" color="blue">
        Redirecting....
      </Typography>
    </div>
  );
};

export default OrderSuccess;
