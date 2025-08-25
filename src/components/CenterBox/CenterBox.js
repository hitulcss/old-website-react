import React from "react";
import "./CenterBox.css";
import center1 from "../../assets/center1.png";
import center2 from "../../assets/center2.png";
import { VscLocation } from "react-icons/vsc";
import { MdOutlineLocalPhone } from "react-icons/md";

const CenterBox = () => {
  const center_details = [
    {
      img: center1,
      title: "SD CAMPUS-Noida",
      location:
        "20 Yamuna Vihar Road, Yamuna Vihar, Yamuna vihar, New Delhi, Delhi, 110053",
      phone: "+91 7428186291",
      registerFee: "₹1999",
    },
    {
      img: center2,
      title: "SD CAMPUS-Noida",
      location:
        "20 Yamuna Vihar Road, Yamuna Vihar, Yamuna vihar, New Delhi, Delhi, 110053",
      phone: "+91 7428186291",
      registerFee: "₹1999",
    },
    {
      img: center1,
      title: "SD CAMPUS-Noida",
      location:
        "20 Yamuna Vihar Road, Yamuna Vihar, Yamuna vihar, New Delhi, Delhi, 110053",
      phone: "+91 7428186291",
      registerFee: "₹1999",
    },
  ];

  return (
    <>
      <div className="centerbox_wrapper">
        <div className="centerbox_container">
          {center_details.map((item, index) => (
            <div className="center_box" key={index}>
              <div className="center_box_upper">
                <img src={item.img} alt="centerPic" loading="lazy" />
                <div className="center_box_details">
                  <h2>{item.title}</h2>
                  <p>
                    <VscLocation className="center_icon" />
                    {item.location}
                  </p>
                  <p>
                    <MdOutlineLocalPhone className="center_icon" />
                    {item.phone}
                  </p>
                  <div className="register_at">
                    <p>
                      Register At :{" "}
                      <span style={{ color: "#000", fontWeight: "600" }}>
                        {item.registerFee}
                      </span>
                    </p>
                    <button>Admission Open</button>
                  </div>
                </div>
              </div>
              <p style={{ border: "1px solid #dfdfdf" }}></p>
              <div className="center_explore_btn">
                {" "}
                <button>Explore Now</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CenterBox;
