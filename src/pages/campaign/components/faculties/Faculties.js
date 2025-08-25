import React from "react";
import "./Faculties.css";
import educator from "../../../../assets/campaign/mam.png";

const Faculties = () => {
  const faculties = [
    {
      img: 'https://d1mbj426mo5twu.cloudfront.net/assets/faculty/shivani_mam.png',
      techerName: "Shivani Ma'am",
      subject: "English",
    },
    {
      img: 'https://d1mbj426mo5twu.cloudfront.net/assets/faculty/renu_mam.png',
      techerName: "Renu Ma'am",
      subject: "Maths",
    },
    {
      img: 'https://d1mbj426mo5twu.cloudfront.net/assets/faculty/deepika.png',
      techerName: "Deepika Ma’am",
      subject: "GK/GS",
    },
    {
      img: educator,
      techerName: "Deepika Ma’am",
      subject: "Mathematics",
    },
    {
      img: 'https://d1mbj426mo5twu.cloudfront.net/assets/jpeg-optimizer_Vijaykant%20Sir_1716200992.png',
      techerName: "Vijaykant Sir",
      subject: "Hindi",
    },
  ];
  return (
    <>
      <div className="faculty_wrapper">
        <div className="faculty_title">
          <h1>
            Our{" "}
            <span style={{ color: "rgba(228, 110, 48, 1)" }}>
              Star Faculties
            </span>
          </h1>
          <p>Meet Our Excellent Faculties</p>
        </div>
        <div className="faculty_container">
          {faculties.map((item, index) => (
            <div className="faculty" key={index}>
              <div className="faculty-bg">
                {" "}
                <img src={item.img} alt="faculty" />
              </div>

              <div className="faculty-desrip">
                <h2>{item.techerName}</h2>
                <p
                  style={{
                    border: "1px solid #dfdfdf",
                    margin: "10px 10px",
                  }}
                ></p>
                <p>{item.subject}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Faculties;
