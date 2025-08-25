import React from "react";
import "./AboutJNV.css";
import jnvImg from "../../../../assets/campaign/aboutJNV.png";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Counselling from "../../../course_details/components/counselling/Counselling";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  p: 4,
};

const AboutJNV = () => {
  const modalsShown = localStorage.getItem("modalsShownForCounselling");

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);

  return (
    <>
      <div className="about_jnv_container">
        <div className="about_jnv_left">
          <h1>
            What is Sainik / JNV / RMS/ RIMC School Entrance exam preparation?
          </h1>
          <p>
            {" "}
            Sainik Schools, Jawahar Navodaya Vidyalayas (JNV), Rashtriya
            Military Schools (RMS) and Rashtriya Indian Military College (RIMC)
            are renowned institutions in India that provide quality education
            along with disciplined teaching, leadership and academic excellence.
          </p>

          <p>
            Preparing for admission to these schools requires a good approach
            due to the competitive nature of the exam.
          </p>
          <button
            // onClick={() => {
            //   // window.location.href = ""
            //   localStorage.setItem("modalsShownForCounselling", "true");
            // }}

            onClick={handleOpen}
          >
            Book Free Demo!
          </button>

          <Modal
            open={open}
            onClose={handleOpen}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <div sx={style} className="counseling-popup">
              <Counselling from="campaign" />
            </div>
          </Modal>
        </div>
        <div className="about_jnv_right">
          <img src={jnvImg} alt="" loading="lazy" />
        </div>
      </div>
    </>
  );
};

export default AboutJNV;
