import React from "react";
import "./Address.css";
const Address = () => {
  const position = { lat: 28.6783816, lng: 77.2764479 };
  return (
    <>
      <div className="address_wrapper">
        <div className="address_container">
          {" "}
          <h1>
            SD Center{" "}
            <span style={{ color: "var(--primaryColor)" }}> Address</span>
          </h1>
          <p style={{ border: "1px solid #dfdfdf" }}></p>
          <div className="map_location">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3500.3755278720455!2d77.35627437544399!3d28.678411181995767!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfb7397510b91%3A0x63e3aac142fcf376!2sSD%20CAMPUS%20Ghaziabad%20-%20Best%20Coaching%20for%20SSC%2C%20Railway%2C%20CTET%2C%20UPTET%2C%20DSSSB%2C%20UPPGT%20%26%20All%20Competitive%20Examinations!5e0!3m2!1sen!2sin!4v1716243670080!5m2!1sen!2sin"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </>
  );
};

export default Address;
