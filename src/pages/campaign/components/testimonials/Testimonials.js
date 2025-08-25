import React from "react";
import "./Testimonials.css";
import testiImg from "../../../../assets/campaign/testi.png";
import playbtn from "../../../../assets/campaign/playbtn.png";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

const Testimonials = () => {
  const testimonials = [
    {
      descrip:
        "SD Campus has been a game-changer for me! The affordability combined with top-notch education is unmatched. The faculty is  outstanding, providing personalized attention that has truly enhanced my learning experience. I’m confident that SD Campus is paving the way for  my success in the upcoming board exams. ",
      name: "Anuj Rai",
      rank: "AIR 30",
      state: "Uttar Pardesh",
    },
    {
      descrip:
        "SD Campus has been a game-changer for me! The affordability combined with top-notch education is unmatched. The faculty is  outstanding, providing personalized attention that has truly enhanced my learning experience. I’m confident that SD Campus is paving the way for  my success in the upcoming board exams. ",
      name: "Anuj Rai",
      rank: "AIR 30",
      state: "Uttar Pardesh",
    },
    {
      descrip:
        "SD Campus has been a game-changer for me! The affordability combined with top-notch education is unmatched. The faculty is  outstanding, providing personalized attention that has truly enhanced my learning experience. I’m confident that SD Campus is paving the way for  my success in the upcoming board exams. ",
      name: "Anuj Rai",
      rank: "AIR 30",
      state: "Uttar Pardesh",
    },
  ];

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);

  return (
    <>
      <div className="camp_testi_wrapper">
        <h1>
          Student{" "}
          <span style={{ color: " rgba(228, 110, 48, 1)" }}>Testimonials</span>
        </h1>
        <div className="camp_testi_container">
          {testimonials.map((item, index) => (
            <div className="testi_box" key={index}>
              <div className="testi_box_left">
                <div className="left_img">
                  {" "}
                  <img
                    src={testiImg}
                    alt="testimonial"
                    className="testi_img"
                    loading="lazy"
                  />
                  <img
                    src={playbtn}
                    alt="playbtn"
                    className="testi_play_btn"
                    onClick={handleOpen}
                    loading="lazy"
                  />
                </div>

                <Modal
                  open={open}
                  onClose={handleOpen}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <div className="popup-video">
                      {" "}
                      <iframe src="https://www.youtube.com/embed/rnh0961GmJM"></iframe>
                    </div>
                  </Box>
                </Modal>
              </div>
              <div className="testi_box_right">
                <div className="testi-right_descrip">
                  {" "}
                  <h2>{item.descrip}</h2>
                  <p className="std_name">{item.name}</p>
                  <p>
                    {item.rank} | {item.state}
                  </p>
                  {/* <div>
                    <img
                      src={iconupper}
                      alt="iconupper"
                      className="icon_upper"
                    />
                    <img
                      src={iconlower}
                      alt="iconlower"
                      className="icon_lower"
                    />
                  </div> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Testimonials;
