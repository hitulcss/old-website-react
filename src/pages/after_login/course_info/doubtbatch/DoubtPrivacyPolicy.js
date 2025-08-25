import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { IoClose } from "react-icons/io5";
import { Divider } from "@mui/material";

import "./DoubtPrivacyPolicy.css";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 20,
  borderRadius: 3,
};

const DoubtPrivacyPolicy = ({ doubtPrivacyPolicy, setDoubtPrivacyPolicy }) => {
  const handleOpen = () => setDoubtPrivacyPolicy(true);
  const handleClose = () => setDoubtPrivacyPolicy(false);
  // const [open, setOpen] = useState(false)
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => {
  //     setOpen(false)
  // };
  return (
    <div>
      <Modal
        open={doubtPrivacyPolicy}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="ask-modal-header">
            <h1>CHAT POLICY </h1>
            <IoClose className="doubt-icon" onClick={handleClose} />
          </div>
          <Divider />
          <div className="doubt-privacy-policy-content">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.3rem",
                textAlign: "left",
              }}
            >
              <div>
                <p style={{ fontWeight: 600 }}>Purpose &amp; Scope:-</p>
                <ul
                  style={{
                    listStyleType: "disc",
                    width: "90%",
                    margin: "0 auto",
                  }}
                >
                  <li>
                    This policy outlines guidelines for chat blocking to
                    maintain a safe and conducive online learning environment.
                    It applies to all students, teachers, and admins using chat
                    features on the platform.
                  </li>
                </ul>
              </div>
              <div>
                <p style={{ fontWeight: 600 }}>Guidelines:-</p>
                <ul
                  style={{
                    listStyleType: "disc",
                    width: "90%",
                    margin: "0 auto",
                  }}
                >
                  <li>
                    <p style={{ fontWeight: 600, display: "inline" }}>
                      Respectful Communication:{" "}
                    </p>{" "}
                    Avoid hate speech, harassment, or bullying in chat messages.
                  </li>
                  <li>
                    <p style={{ fontWeight: 600, display: "inline" }}>
                      No Spam or Solicitations:{" "}
                    </p>{" "}
                    Refrain from sending spam messages or soliciting personal
                    information.
                  </li>
                  <li>
                    <p style={{ fontWeight: 600, display: "inline" }}>
                      Relevance:{" "}
                    </p>{" "}
                    Keep chat discussions focused on learning objectives.
                  </li>
                  <li>
                    <p style={{ fontWeight: 600, display: "inline" }}>
                      Safety First:{" "}
                    </p>{" "}
                    Report any cybersecurity threats like phishing links or
                    malware.
                  </li>
                  <li>
                    <p style={{ fontWeight: 600, display: "inline" }}>
                      Copyright Compliance:{" "}
                    </p>{" "}
                    Do not share unauthorized content or materials.
                  </li>
                  <li>
                    <p style={{ fontWeight: 600, display: "inline" }}>
                      Compliance Enforcement:{" "}
                    </p>{" "}
                    Repeat violations may result in temporary or permanent chat
                    restrictions.
                  </li>
                </ul>
              </div>
              <div>
                <p style={{ fontWeight: 600 }}>Procedures:-</p>
                <ul
                  style={{
                    listStyleType: "disc",
                    width: "90%",
                    margin: "0 auto",
                  }}
                >
                  <li>
                    <p style={{ fontWeight: 600, display: "inline" }}>
                      Monitoring:{" "}
                    </p>{" "}
                    Chat messages are monitored to ensure compliance.
                  </li>
                  <li>
                    <p style={{ fontWeight: 600, display: "inline" }}>
                      Appeals Process:{" "}
                    </p>{" "}
                    Students can appeal wrongful blocks through our support
                    team.
                  </li>
                </ul>
              </div>
              <div>
                <p style={{ fontWeight: 600 }}>Compliance:-</p>
                <ul
                  style={{
                    listStyleType: "disc",
                    width: "90%",
                    margin: "0 auto",
                  }}
                >
                  <li>
                    All users are expected to adhere to these guidelines.
                    Failure to comply may lead to account suspension.
                  </li>
                </ul>
              </div>
              <div>
                <p style={{ fontWeight: 600 }}>Policy Acknowledgement:-</p>
                <ul
                  style={{
                    listStyleType: "disc",
                    width: "90%",
                    margin: "0 auto",
                  }}
                >
                  <li>
                    Learners must accept this policy before using chat features,
                    indicating their agreement to follow the guidelines.
                  </li>
                </ul>
              </div>
              <div>
                <p style={{ fontWeight: 600 }}>Disclaimer:-</p>
                <ul
                  style={{
                    listStyleType: "disc",
                    width: "90%",
                    margin: "0 auto",
                  }}
                >
                  <li>
                    SD Campus reserves the right to modify this policy. Please
                    contact support for any questions or concerns.
                  </li>
                </ul>
              </div>
            </div>
            {/* <p>Privacy Policy</p>
            Last updated: May 2, 2024 This Privacy Policy describes Our policies
            and procedures on the collection, use and disclosure of Your
            information when You use the Service and tells You about Your
            privacy rights and how the law protects You. We use Your Personal
            data to provide and improve the Service. By using the Service, You
            agree to the collection and use of information in accordance with
            this Privacy Policy. Interpretation and Definitions Interpretation
            The words of which the initial letter is capitalized have meanings
            defined under the following conditions. The following definitions
            shall have the same meaning regardless of whether they appear in
            singular or in plural. Definitions For the purposes of this Privacy
            Policy: Account means a unique account created for You to access our
            Service or parts of our Service. Affiliate means an entity that
            controls, is controlled by or is under common control with a party,
            where "control" means ownership of 50% or more of the shares, equity
            interest or other securities entitled to vote for election of
            directors or other managing authority. Application refers to SD
            Campus, the software program provided by the Company.
            Company (referred to as either "the Company", "We", "Us" or "Our" in
            this Agreement) refers to SD Campus, Plot No-16, Block 7, Sector 5,
            Rajendra Nagar, Ghaziabad, Uttar Pradesh 201005. Country refers to:
            Uttar Pradesh, India Device means any device that can access the
            Service such as a computer, a cellphone or a digital tablet.
            Personal Data is any information that relates to an identified or */}
            {/* identifiable individual. Service refers to the Application. */}
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default DoubtPrivacyPolicy;
