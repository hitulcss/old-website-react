import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./Accordian.css";

const Accordian = ({ data, staticData }) => {
  const ques_and_ans = [
    {
      question: "What courses do you offer?",
      answer: `We offer courses across competitive exams like teaching, entrance, defence, and others`,
    },
    {
      question: "How do I enroll in a course?",
      answer: `Enrolling in a course is simple. Visit the course page, click the "Enroll Now" button, and follow the instructions to complete the enrollment process.
      `,
    },
    {
      question: "Are the courses self-paced or instructor-led?",
      answer: `Our courses cater to different learning preferences. While some are self-paced, allowing you to learn quickly, others are instructor-led with scheduled classes. Check the course details for specific information.
      `,
    },
    {
      question: "Can I access the course materials after the course ends?",
      answer: `You will have continued access to the course materials after the course concludes. This ensures you can review the content and refer to it whenever needed.
      `,
    },
    {
      question: "What is the duration of each course?",
      answer: `The duration varies for each course. You can find specific information about the duration, including the number of weeks or months, on the course page.
      `,
    },
    {
      question: "Is technical support available during the course?",
      answer: `Yes, we provide technical support to address any issues you encounter during the course. Reach out to our support team through the designated channels for prompt assistance.
      `,
    },
  ];

  return (
    <>
      {staticData
        ? ques_and_ans.map((items, index) => (
            <Accordion key={index}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                style={{ height: "60px" }}
              >
                <h3 style={{ fontWeight: "600" }} className="accordian_ques">
                  {items.question}
                </h3>
              </AccordionSummary>
              <AccordionDetails>
                <p style={{ fontWeight: "500" }} className="accordian_ans">
                  {items.answer}
                </p>
              </AccordionDetails>
            </Accordion>
          ))
        : data?.map((items, index) => (
            <Accordion key={index}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                style={{ height: "60px" }}
              >
                <h3 style={{ fontWeight: "600" }} className="accordian_ques">
                  {items.question}
                </h3>
              </AccordionSummary>
              <AccordionDetails>
                <p style={{ fontWeight: "500" }} className="accordian_ans">
                  {items.answer}
                </p>
              </AccordionDetails>
            </Accordion>
          ))}
    </>
  );
};

export default Accordian;
