import React, { useState } from "react";
import "./Whatsapp.css";
import wpIcon from "../../assets/wpicon.png";
import closeIcon from "../../assets/closeicon.png";
import wpSupport from "../../assets/wpsupport.png";
import { MdOutlineRingVolume } from "react-icons/md";

const Whatsapp = () => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="wp-popup">
        {isOpen ? (
          <div className="popup">
            <div className="wp-popup-container">
              <div className="wp_popup_left">
                <h2>Talk to Us!</h2>
                <p>Confused?? Give a Call and Talk to Our Counsellor</p>
              </div>
              <div className="wp_popup_right">
                <img src={wpSupport} alt="wp" loading="lazy" />
              </div>
            </div>

            <button
              onClick={() => {
                window.open(
                  `https://api.whatsapp.com/send/?phone=+917428394519&text=Hi&type=phone_number&app_absent=0`
                );
              }}
            >
              Chat On Whatsapp
            </button>
            <p className="call-on-wp">
              Or Call us <MdOutlineRingVolume />{" "}
              <a href="tel:+917428394519">+917428394519 </a>
            </p>
            <div className="floating-icon">
              <img
                onClick={togglePopup}
                src={closeIcon}
                alt="wp_icon"
                loading="lazy"
              />
            </div>
          </div>
        ) : (
          <div className="floating-icon">
            <img
              onClick={togglePopup}
              src={wpIcon}
              alt="wp_icon"
              loading="lazy"
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Whatsapp;
