import React, { useEffect, useState } from "react";
import AccordionItem from "./AccordianItem";
import "./NewAccordian.css";

const faqs = [
  {
    question: "What courses do you offer?",
    answer: `We offer courses across competitive exams like teaching, entrance, defence, and others.`,
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

const campaign2_faq1 = [
  {
    question:
      " How many years of study does the BPSC course take at the SD Campus?",
    answer: `The duration of the course differs due to the available batches of the course selected by the student. We provide offs, and crash courses depending on your preparation needs.`,
  },
  {
    question: "Where can one get the mock tests?",
    answer: `After the registration, the students will be provided with an online account where they can solve mock tests and quizzes.
    `,
  },
  {
    question: "If I have any doubts, am I able to get personal support?",
    answer: ` Absolutely! The faculty members and the mentors are open for doubt clearing sessions and one on one counseling.`,
  },
  {
    question:
      "Is any preparation material dedicated only for the BPSC examination available in SD Campus?",
    answer: `Yes, as we mentioned earlier, all the study material that we provide is exam-oriented for the BPSC exam and includes all the subjects and topics that a student is expected to master.
    `,
  },
];

const campaign2_faq2 = [
  {
    question:
      " How many years of study does the BPSC course take at the SD Campus?",
    answer: `The duration of the course differs due to the available batches of the course selected by the student. We provide offs, and crash courses depending on your preparation needs.`,
  },
  {
    question: "Where can one get the mock tests?",
    answer: `Enrolling in a course is simple. Visit the course page, click the "Enroll Now" button, and follow the instructions to complete the enrollment process.
    `,
  },
  {
    question: "If I have any doubts, am I able to get personal support?",
    answer: `Our courses cater to different learning preferences. While some are self-paced, allowing you to learn quickly, others are instructor-led with scheduled classes. Check the course details for specific information.
    `,
  },
  {
    question:
      "Is any preparation material dedicated only for the BPSC examination available in SD Campus?",
    answer: `You will have continued access to the course materials after the course concludes. This ensures you can review the content and refer to it whenever needed.
    `,
  },
  {
    question: "What is the duration of each course?",
    answer: `The duration varies for each course. You can find specific information about the duration, including the number of weeks or months, on the course page.
    `,
  },
];
const campaign2_faq3 = [
  {
    question:
      " What is the duration of the Haryana JBT course offered at SD Campus? ",
    answer: ` Regarding the course duration, it is flexible and different depending on the batch. We provide intensive courses where lessons are delivered compacted into shorter periods, and regular-paced courses that are common.
    `,
  },
  {
    question:
      " Are there options that I can watch the recorded lectures in case I missed a live class?",
    answer: `Yes, all our live classes are recorded and one can always watch the lesson later if they missed it during the live stream.`,
  },
  {
    question: "How can I take mock tests? ",
    answer: `Our current students can log into the portal for simulated tests and sample quizzes.`,
  },
  {
    question: " Is Haryana JBT study material available at SD Campus?",
    answer: `Yes, Our study materials are also prepared in a way to cover all the syllabus of Haryana JBT.
    `,
  },
];

const NewAccordian = ({ title, data }) => {
  const [active, setActive] = useState(null);
  const [faqContent, setFaqcontent] = useState([]);

  const handleToggle = (index) => {
    if (active === index) {
      setActive(null);
    } else {
      setActive(index);
    }
  };

  useEffect(() => {
    if (title === "BPSC") {
      setFaqcontent(campaign2_faq1);
    } else if (title === "UGC") {
      setFaqcontent(campaign2_faq2);
    } else if (title === "JBT") {
      setFaqcontent(campaign2_faq3);
    } else {
      setFaqcontent(data ? data : faqs);
    }
  }, [title, data]);

  return (
    <>
      <div className="container-fluid mt-5 mb-5">
        <div className="row justify-content-center">
          <div className="col-md-8 mt-2">
            <div className="card">
              <div className="card-body" style={{ marginBottom: "2rem" }}>
                <h4 className="faq-title">
                  {title
                    ? "Have Any Questions?"
                    : "Frequently Asked Questions"}
                </h4>
                {faqContent?.map((faq, index) => {
                  return (
                    <AccordionItem
                      key={index}
                      active={active}
                      index={index}
                      handleToggle={handleToggle}
                      faq={faq}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewAccordian;
