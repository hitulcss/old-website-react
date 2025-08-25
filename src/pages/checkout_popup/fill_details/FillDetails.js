import React from "react";
import "./FillDetails.css";
import poster from "../../../assets/poster1.png";

const FillDetails = () => {
  return (
    <>
      <div className="filldetails_wrapper">
        <div className="filldetails_leftside">
          <div className="yourdetails">
            <h3>Your Details</h3>
            <p style={{ border: "1px solid #eeee", marginTop: "5px" }}></p>
            <div className="input_boxes">
              <label htmlFor="name">
                <input type="text" placeholder="Full Name" />
              </label>
              <label htmlFor="number">
                <input type="number" placeholder="Phone Number" />
              </label>
              <label htmlFor="email">
                <input type="email" placeholder="Email Id" />
              </label>
              <label htmlFor="name">
                <textarea type="text" placeholder="Address" rows="6" />
              </label>
            </div>
          </div>
        </div>
        <div className="filldetails_rightside">
          <h3>Order Details</h3>
          <p style={{ border: "1px solid #eeee", marginTop: "5px" }}></p>
          <div className="order_detail">
            <div className="course_details_info">
              <img src={poster} alt="poster" />
              <span className="order_description">
                <p>SSC Foundation Mastery 2023</p>
                <p className="validity">(Validity 12 Months)</p>
                <p className="payable_price">
                  ₹2450 only{" "}
                  <span style={{ color: "#D9D9D9", fontSize: "11px" }}>
                    ₹5990
                  </span>{" "}
                  <span style={{ color: "#4CAF50", fontSize: "11px" }}>
                    55% OFF
                  </span>
                </p>
              </span>
            </div>
            <p style={{ border: "1px solid #eeee" }}></p>
            <div className="payable_amount">
              <h3>Payable Amount</h3>
              <div className="subtotal">
                <span className="subtotal_upper">
                  <div className="subtotal_left">
                    <p>Subtotal </p>
                    <p className="discount_cuopan_name">
                      Discount(Coupon WIN55)
                    </p>
                  </div>

                  <div className="subtotal_right">
                    <p> &nbsp;₹ 5990</p>
                    <p>-₹ 3540</p>
                  </div>
                </span>
                <p style={{ border: "1px solid #eeee" }}></p>
                <span className="subtotal_lower">
                  <p>To Pay</p>
                  <p>₹ 2450</p>
                </span>
              </div>
            </div>
            {/* <button className="">Continue</button> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default FillDetails;
